/* global process */
import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import Tesseract from "tesseract.js";
import { mkdir, readFile, unlink } from "node:fs/promises";

await mkdir("uploads", { recursive: true });

const app = express();
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));

const normalizeAnswerIndex = (answer) => {
  if (Number.isInteger(answer)) return Math.min(Math.max(answer, 0), 3);

  const normalized = String(answer ?? "").trim().toLowerCase();
  const letterIndex = ["a", "b", "c", "d"].indexOf(normalized.replace(/[\).:-]/g, ""));
  if (letterIndex >= 0) return letterIndex;

  const numericIndex = Number.parseInt(normalized, 10);
  if (Number.isInteger(numericIndex)) {
    return Math.min(Math.max(numericIndex > 0 ? numericIndex - 1 : numericIndex, 0), 3);
  }

  return 0;
};

const normalizeGeneratedTest = (rawTest, filename) => {
  const questions = Array.isArray(rawTest.questions) ? rawTest.questions : [];

  return {
    title: rawTest.title || `AI-Generated Test: ${filename}`,
    description: rawTest.description || `Generated from ${filename}`,
    timeLimit: Number(rawTest.timeLimit) || Math.max(5, questions.length * 3),
    questions: questions
      .filter((question) => {
        return (
          typeof question.questionText === "string" &&
          Array.isArray(question.options) &&
          question.options.length >= 4
        );
      })
      .map((question) => ({
        questionText: question.questionText,
        options: question.options.slice(0, 4).map(String),
        correctAnswer: normalizeAnswerIndex(question.correctAnswer),
        explanation: question.explanation || "Review the source material for the supporting concept.",
      })),
  };
};

const extractJsonText = (geminiResponse) => {
  const text = geminiResponse?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    const reason = geminiResponse?.candidates?.[0]?.finishReason;
    throw new Error(reason ? `Gemini returned no text. Finish reason: ${reason}.` : "Gemini returned no text.");
  }

  return text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
};

const MAX_CHUNK_CHARS = 12000;
const MAX_QUESTIONS_PER_CHUNK = 15;

const splitIntoQuestionChunks = (text) => {
  const questionStartPattern = /(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*)?\d{1,3}[).:-]\s+/gi;
  const matches = [...text.matchAll(questionStartPattern)];

  if (matches.length < 2) {
    const chunks = [];
    for (let index = 0; index < text.length; index += MAX_CHUNK_CHARS) {
      chunks.push(text.slice(index, index + MAX_CHUNK_CHARS));
    }
    return chunks;
  }

  const blocks = matches.map((match, index) => {
    const start = match.index || 0;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    return text.slice(start, end).trim();
  }).filter(Boolean);

  const chunks = [];
  let current = "";
  let blockCount = 0;

  blocks.forEach((block) => {
    const wouldExceedSize = current.length + block.length + 2 > MAX_CHUNK_CHARS;
    const wouldExceedCount = blockCount >= MAX_QUESTIONS_PER_CHUNK;

    if (current && (wouldExceedSize || wouldExceedCount)) {
      chunks.push(current);
      current = "";
      blockCount = 0;
    }

    current = current ? `${current}\n\n${block}` : block;
    blockCount += 1;
  });

  if (current) chunks.push(current);
  return chunks;
};

const parseGeminiJson = (data) => {
  try {
    return JSON.parse(extractJsonText(data));
  } catch {
    throw new Error("Gemini returned invalid JSON. Please try again with a clearer document.");
  }
};

const callGemini = async (prompt) => {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini failed to generate CBT questions.");
  }

  return parseGeminiJson(data);
};

const buildExtractionPrompt = (filename, chunk, chunkNumber, totalChunks) => {
  return `Extract CBT questions from this source text chunk.

Return only valid JSON with this exact shape:
{
  "title": "string",
  "description": "string",
  "timeLimit": 30,
  "questions": [
    {
      "questionText": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0,
      "explanation": "string"
    }
  ]
}

Rules:
- Extract every complete MCQ question present in this chunk. Do not stop at 8, 10, or 12 questions.
- Do not invent questions when the chunk already contains questions.
- Preserve the original question meaning.
- Use exactly four options per question. If more than four options are present, keep the best four.
- correctAnswer must be a zero-based index from 0 to 3. If the answer key is unavailable, use 0 and explain that the source did not include the answer key.
- Avoid duplicate questions.

Source file: ${filename}
Chunk: ${chunkNumber} of ${totalChunks}

Source text:
${chunk}`;
};

const buildFallbackPrompt = (filename, extractedText) => {
  const targetQuestionCount = Number(process.env.GENERATED_QUESTION_COUNT) || 100;

  return `Convert this study material into a computer-based test.

Return only valid JSON with this exact shape:
{
  "title": "string",
  "description": "string",
  "timeLimit": 30,
  "questions": [
    {
      "questionText": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0,
      "explanation": "string"
    }
  ]
}

Rules:
- Create up to ${targetQuestionCount} useful MCQ questions from the available material.
- Use exactly four options per question.
- correctAnswer must be a zero-based index from 0 to 3.
- Avoid duplicate questions.
- Keep options plausible.

Source file: ${filename}

Source text:
${extractedText.slice(0, 60000)}`;
};

const generateCbtWithGemini = async (filename, extractedText) => {
  const chunks = splitIntoQuestionChunks(extractedText);
  const allQuestions = [];
  let title = `AI-Generated Test: ${filename}`;
  let description = `Generated from ${filename}`;
  const seenQuestions = new Set();

  for (let index = 0; index < chunks.length; index += 1) {
    const chunkTest = await callGemini(buildExtractionPrompt(filename, chunks[index], index + 1, chunks.length));
    if (chunkTest.title) title = chunkTest.title;
    if (chunkTest.description) description = chunkTest.description;

    const normalizedChunk = normalizeGeneratedTest(chunkTest, filename);
    normalizedChunk.questions.forEach((question) => {
      const key = question.questionText.toLowerCase().replace(/\s+/g, " ").trim();
      if (!seenQuestions.has(key)) {
        seenQuestions.add(key);
        allQuestions.push(question);
      }
    });
  }

  if (allQuestions.length > 0) {
    return {
      title,
      description,
      timeLimit: Math.max(5, allQuestions.length * 3),
      questions: allQuestions,
    };
  }

  return callGemini(buildFallbackPrompt(filename, extractedText));
};

const extractText = async (file) => {
  if (file.mimetype === "application/pdf") {
    const buffer = await readFile(file.path);
    const parser = new PDFParse({ data: buffer });

    try {
      const parsed = await parser.getText();
      return parsed.text;
    } finally {
      await parser.destroy();
    }
  }

  if (file.mimetype.startsWith("image/")) {
    const result = await Tesseract.recognize(file.path, "eng");
    return result.data.text;
  }

  throw new Error("Unsupported file type. Upload a PDF, JPG, JPEG, or PNG file.");
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/convert-to-cbt", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const extractedText = (await extractText(file)).trim();

    if (extractedText.length < 80) {
      return res.status(422).json({
        error: "Not enough readable text was found in this file. Try a clearer scan or a text-based PDF.",
      });
    }

    const rawTest = await generateCbtWithGemini(file.originalname, extractedText);
    const test = normalizeGeneratedTest(rawTest, file.originalname);

    if (test.questions.length === 0) {
      return res.status(422).json({ error: "The AI response did not contain usable CBT questions." });
    }

    res.json({
      extractedText,
      test,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to convert file to CBT." });
  } finally {
    await unlink(file.path).catch(() => {});
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`CBTifyAI conversion API running on http://localhost:${port}`);
});

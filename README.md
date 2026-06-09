# CBTifyAI

## 🚀 Transform Any PDF or Image into an Interactive CBT Exam

CBTifyAI is an AI-powered assessment platform that converts PDFs, scanned notes, screenshots, and question papers into fully interactive Computer-Based Tests (CBTs) within seconds.

Students can upload learning material, instantly generate practice exams, attempt tests in a real exam environment, and receive detailed analytics to improve performance.

Institutions can streamline assessment creation, student evaluation, and performance tracking through a centralized dashboard.

---

## 🎯 Problem Statement

Students and educators often spend significant time creating assessments from study material such as PDFs, handwritten notes, screenshots, and previous-year papers.

Traditional methods require manual question preparation and provide limited performance insights.

CBTifyAI automates the entire assessment lifecycle by transforming static content into intelligent, AI-generated assessments.

---

## 💡 Solution

CBTifyAI enables users to:

* Upload PDFs, images, notes, or question papers
* Automatically extract content using OCR and document parsing
* Generate structured multiple-choice questions using AI
* Launch instant CBT examinations
* Analyze performance through detailed dashboards
* Track mistakes and identify weak topics
* Manage assessments for schools and coaching institutes

---

## 🌐 Live Demo

### Deployed Application

https://cbtifyai.onrender.com/

### Demo Video

https://youtu.be/zXjD_SHqBjc

---

## ✨ Features

### 📄 PDF to CBT Conversion

Convert textbooks, lecture notes, and question papers into CBT exams instantly.

### 🖼️ Image to CBT Conversion

Upload screenshots, scanned documents, or handwritten notes and generate tests automatically.

### 🤖 AI Question Detection

Intelligently extracts questions, options, and educational content from uploaded material.

### ⚡ Instant Test Generation

Creates a complete CBT examination in seconds.

### 📊 Analytics Dashboard

Track:

* Accuracy trends
* Subject-wise performance
* Practice history
* Weak and strong topics

### 🎯 Mistake Tracking

Automatically records incorrect answers and identifies areas requiring improvement.

### 🏫 Institution Portal

Supports:

* Student roster management
* Assessment scheduling
* Performance monitoring
* Academic reporting

---

## 🔄 Workflow

1. Upload PDF or Image
2. Extract Content
3. AI Generates Questions
4. Generate CBT Exam
5. Attempt Test
6. Analyze Performance

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js

### AI & Processing

* Google Gemini API
* Tesseract.js OCR
* PDF Parsing

---

## 📂 Project Structure

```text
.
├── public/
├── server/
│   └── index.js
├── src/
│   ├── components/
│   ├── context/
│   └── pages/
├── package.json
├── .env.example
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd CBTifyAI
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GENERATED_QUESTION_COUNT=100
VITE_API_BASE_URL=http://localhost:5000
```

### Start Backend

```bash
npm run api
```

### Start Frontend

```bash
npm run dev
```


## 🚀 Future Scope

* Multi-user authentication
* Cloud database integration
* Adaptive testing
* LMS integration
* Advanced analytics
* Test sharing and publishing
* Difficulty estimation
* Institution-level reporting

---

## 🏆 Hackathon Vision

CBTifyAI bridges the gap between static learning resources and interactive assessments.

Instead of spending hours creating practice tests manually, students and institutions can upload content and instantly generate AI-powered CBT exams with analytics and performance tracking.

---

## 👥 Team

Built for Hackathon Innovation and Educational Technology Advancement.

---

## 🎯 Tagline

### Upload. Generate. Attempt. Analyze.

**Turning static study material into intelligent assessment experiences.**

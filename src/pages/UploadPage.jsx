import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UploadCloud, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Play, 
  AlertCircle,
  FileCheck,
  RotateCw
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const UploadPage = () => {
  const { uploadDocument, uploadGeneratedTest } = useApp();
  const navigate = useNavigate();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionStatus, setConversionStatus] = useState(''); // 'uploading', 'processing', 'generating', 'ready'
  const [generatedTestId, setGeneratedTestId] = useState(null);
  const [conversionError, setConversionError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    setSelectedFile({
      name: file.name,
      size: `${sizeMB} MB`
    });
    setConversionError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setConversionStatus('uploading');
      await new Promise(resolve => setTimeout(resolve, 250));

      setConversionStatus('processing');
      const response = await fetch(`${apiBaseUrl}/api/convert-to-cbt`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed.');
      }

      setConversionStatus('generating');
      const testId = uploadGeneratedTest(file.name, `${sizeMB} MB`, data.test);

      setGeneratedTestId(testId);
      setConversionStatus('ready');
    } catch (error) {
      console.error(error);
      setConversionStatus('error');
      setConversionError(error.message || 'Could not convert this file. Please try again.');
    }
  };

  // Quick Mock file select to speed up testing
  const selectMockFile = (name) => {
    setSelectedFile({
      name: name,
      size: '1.2 MB'
    });
    setConversionError('');
    uploadDocument(name, '1.2 MB', (status, testId) => {
      setConversionStatus(status);
      if (status === 'ready' && testId) {
        setGeneratedTestId(testId);
      }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-white/5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">AI Document Converter</h1>
        <p className="text-xs text-mutedGray mt-1">
          Upload PDF notes, scanning files, homework assignments or question papers and transform them into CBT exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Uploader area */}
        <div className="md:col-span-2 space-y-6">
          {!selectedFile ? (
            // Drag and drop zone
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-24px p-12 text-center transition-all duration-300 relative ${
                dragActive 
                  ? 'border-accentBlue bg-accentBlue/5 shadow-glowBlue scale-[1.01]' 
                  : 'border-white/10 bg-darkSec/20 hover:border-white/20'
              }`}
            >
              <input
                type="file"
                id="file-upload-input"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
              
              <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-mutedGray hover:text-white transition-colors">
                  <UploadCloud className="w-8 h-8 text-accentBlue animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Drag & drop your files here</h3>
                  <p className="text-xs text-mutedGray mt-1">or click to browse from directory</p>
                </div>
                <div className="text-[10px] text-mutedGray max-w-xs leading-normal">
                  Supported formats: PDF, JPG, PNG, JPEG. Maximum file size: 25MB. Scanned images are automatically OCR-resolved.
                </div>
              </label>
            </div>
          ) : (
            // Upload progress timeline
            <GlassCard glowColor="blue" className="p-8 space-y-8">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FileText className="w-6 h-6 text-accentBlue flex-shrink-0" />
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-semibold text-white truncate">{selectedFile.name}</h4>
                    <span className="text-[10px] text-mutedGray font-mono">{selectedFile.size}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold uppercase text-accentBlue font-mono">
                  {conversionStatus === 'ready' ? 'Complete' : conversionStatus === 'error' ? 'Failed' : 'Processing'}
                </div>
              </div>

              {conversionError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{conversionError}</span>
                </div>
              )}

              {/* Steps timeline vertical */}
              <div className="space-y-6 relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                
                {/* Step 1: Uploading */}
                <div className="relative">
                  <div className={`absolute -left-8 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    conversionStatus === 'uploading' ? 'bg-accentBlue/20 border-accentBlue text-accentBlue animate-pulse' :
                    'bg-green-500/20 border-green-500 text-green-400'
                  }`}>
                    {conversionStatus === 'uploading' ? <RotateCw className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Uploading Document</h5>
                    <p className="text-[10px] text-mutedGray mt-0.5">Pushing encrypted file channels to AI servers...</p>
                  </div>
                </div>

                {/* Step 2: Processing */}
                <div className="relative">
                  <div className={`absolute -left-8 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    conversionStatus === 'uploading' ? 'bg-white/5 border-white/10 text-mutedGray' :
                    conversionStatus === 'processing' ? 'bg-purpleGlow/20 border-purpleGlow text-purpleGlow animate-pulse' :
                    'bg-green-500/20 border-green-500 text-green-400'
                  }`}>
                    {conversionStatus === 'uploading' ? '2' :
                     conversionStatus === 'processing' ? <RotateCw className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${conversionStatus === 'uploading' ? 'text-mutedGray' : 'text-white'}`}>Layout Scanning & OCR</h5>
                    <p className="text-[10px] text-mutedGray mt-0.5">Extracting textual passages, question patterns and equations.</p>
                  </div>
                </div>

                {/* Step 3: Generating */}
                <div className="relative">
                  <div className={`absolute -left-8 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    (conversionStatus === 'uploading' || conversionStatus === 'processing') ? 'bg-white/5 border-white/10 text-mutedGray' :
                    conversionStatus === 'generating' ? 'bg-cyanAccent/20 border-cyanAccent text-cyanAccent animate-pulse' :
                    'bg-green-500/20 border-green-500 text-green-400'
                  }`}>
                    {(conversionStatus === 'uploading' || conversionStatus === 'processing') ? '3' :
                     conversionStatus === 'generating' ? <RotateCw className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${(conversionStatus === 'uploading' || conversionStatus === 'processing') ? 'text-mutedGray' : 'text-white'}`}>CBT Exam Structure Compilation</h5>
                    <p className="text-[10px] text-mutedGray mt-0.5">Synthesizing multiple options and creating explanations.</p>
                  </div>
                </div>

                {/* Step 4: Ready */}
                <div className="relative">
                  <div className={`absolute -left-8 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                    conversionStatus !== 'ready' ? 'bg-white/5 border-white/10 text-mutedGray' :
                    'bg-green-500/20 border-green-500 text-green-400 shadow-glowCyan'
                  }`}>
                    {conversionStatus !== 'ready' ? '4' : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${conversionStatus !== 'ready' ? 'text-mutedGray' : 'text-white'}`}>Exam Environment Ready</h5>
                    <p className="text-[10px] text-mutedGray mt-0.5">Assessment link is active and indexed in student dashboard.</p>
                  </div>
                </div>

              </div>

              {/* Call to action once ready */}
              {conversionStatus === 'ready' && (
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
                  <button
                    onClick={() => navigate(`/test/${generatedTestId}`)}
                    className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent text-white text-xs font-bold shadow-glowBlue hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Generated CBT</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setConversionStatus('');
                      setGeneratedTestId(null);
                      setConversionError('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-white transition-all"
                  >
                    Convert Another File
                  </button>
                </div>
              )}
            </GlassCard>
          )}
        </div>

        {/* Right 1 Column: Quick Mock Presets for evaluation */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purpleGlow" />
            <span>Evaluation Presets</span>
          </h2>
          <p className="text-xs text-mutedGray">
            Don't have a PDF handily available? Click one of our preseeded notes files below to run the AI test generator instantly:
          </p>
          
          <div className="space-y-3">
            {[
              { filename: 'physics_mechanics_lecture_notes.pdf', size: '1.2 MB', label: 'Physics mechanics' },
              { filename: 'ai_governance_framework_draft.pdf', size: '2.5 MB', label: 'AI ethics & governance' },
              { filename: 'web_design_general_aptitude.pdf', size: '0.8 MB', label: 'General developer aptitude' }
            ].map((mock) => (
              <button
                key={mock.filename}
                disabled={!!selectedFile}
                onClick={() => selectMockFile(mock.filename)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accentBlue hover:bg-accentBlue/[0.03] transition-all text-left flex items-start space-x-3 group disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:bg-white/5"
              >
                <FileCheck className="w-5 h-5 text-accentBlue flex-shrink-0 mt-0.5 group-hover:text-cyanAccent" />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{mock.filename}</h4>
                  <span className="text-[10px] text-mutedGray block mt-0.5">Topic: {mock.label} ({mock.size})</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default UploadPage;

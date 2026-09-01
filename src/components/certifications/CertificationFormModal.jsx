import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, FileText, Image as ImageIcon, AlertCircle, Loader2, Sparkles, Award } from 'lucide-react';
import { validateFile, optimizeImageIfNeeded } from '../../services/imageUtils';
import UnsavedChangesModal from '../common/UnsavedChangesModal';

export default function CertificationFormModal({ cert, isOpen, onClose, onSave, isSaving = false }) {
  const isEdit = Boolean(cert && cert.id);

  // Form State
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [file, setFile] = useState(null);

  // UI state
  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cert) {
      setName(cert.name || '');
      setIssuer(cert.issuer || '');
      setIssueDate(cert.issueDate || '');
      setExpiryDate(cert.expiryDate || '');
      setCredentialId(cert.credentialId || '');
      setCredentialUrl(cert.credentialUrl || '');
      setDescription(cert.description || '');
      setSkillsStr(Array.isArray(cert.skills) ? cert.skills.join(', ') : cert.skills || '');
      setFile(cert.file || null);
    } else {
      setName('');
      setIssuer('');
      setIssueDate(new Date().toISOString().split('T')[0]);
      setExpiryDate('');
      setCredentialId('');
      setCredentialUrl('');
      setDescription('');
      setSkillsStr('');
      setFile(null);
    }
    setIsDirty(false);
    setErrors({});
    setUploadError('');
  }, [cert, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || showUnsavedPrompt) return;
      if (e.key === 'Escape') handleAttemptClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDirty, showUnsavedPrompt]);

  if (!isOpen) return null;

  const markDirty = () => setIsDirty(true);

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowUnsavedPrompt(true);
    } else {
      onClose();
    }
  };

  // Upload handler for PDF or Image
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    setUploadError('');
    setIsUploading(true);

    const validation = validateFile(selectedFile, true);
    if (!validation.valid) {
      setUploadError(validation.error);
      setIsUploading(false);
      return;
    }

    try {
      const processed = await optimizeImageIfNeeded(selectedFile);
      setFile({
        name: processed.name,
        type: processed.type,
        size: processed.size,
        dataUrl: processed.dataUrl,
        isPdf: processed.isPdf,
      });
      markDirty();
    } catch (err) {
      setUploadError('Failed to process certificate file: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = () => {
    markDirty();
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Certificate Name is required.';
    if (!issuer.trim()) newErrors.issuer = 'Issuing Organization is required.';
    if (!issueDate.trim()) newErrors.issueDate = 'Issue Date is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...(cert || {}),
      name: name.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate.trim(),
      expiryDate: expiryDate.trim(),
      credentialId: credentialId.trim(),
      credentialUrl: credentialUrl.trim(),
      description: description.trim(),
      skills: skillsStr,
      file,
    };

    onSave(payload);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-lab-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        <div
          className="w-full max-w-2xl bg-lab-900 border border-lab-border rounded-2xl shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-lab-border bg-lab-950/90 shrink-0">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-cyan-glow" />
              <h2 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight">
                {isEdit ? 'EDIT CERTIFICATION' : 'ADD NEW CERTIFICATION'}
              </h2>
            </div>

            <button
              onClick={handleAttemptClose}
              className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white border border-lab-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* Certificate Name */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-cyan-glow mb-1.5">
                CERTIFICATE NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Certified SOLIDWORKS Associate (CSWA)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  markDirty();
                  if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border ${
                  errors.name ? 'border-rose-500' : 'border-lab-border focus:border-cyan-glow'
                } text-white font-sans text-sm focus:outline-none`}
              />
              {errors.name && <p className="text-xs text-rose-400 font-mono mt-1">{errors.name}</p>}
            </div>

            {/* Issuing Organization */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                ISSUING ORGANIZATION *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dassault Systèmes, ANSYS Innovation, Coursera"
                value={issuer}
                onChange={(e) => {
                  setIssuer(e.target.value);
                  markDirty();
                  if (errors.issuer) setErrors((prev) => ({ ...prev, issuer: null }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border ${
                  errors.issuer ? 'border-rose-500' : 'border-lab-border focus:border-cyan-glow'
                } text-slate-200 font-sans text-xs focus:outline-none`}
              />
              {errors.issuer && <p className="text-xs text-rose-400 font-mono mt-1">{errors.issuer}</p>}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  ISSUE DATE *
                </label>
                <input
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => {
                    setIssueDate(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  EXPIRY DATE (Optional)
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Credential ID & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  CREDENTIAL ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CSWA-892314-ID"
                  value={credentialId}
                  onChange={(e) => {
                    setCredentialId(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  VERIFICATION URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={credentialUrl}
                  onChange={(e) => {
                    setCredentialUrl(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                DESCRIPTION / SYLLABUS HIGHLIGHTS
              </label>
              <textarea
                rows={2}
                placeholder="Key competencies covered, practical assessments completed..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* Skills / Topics */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                SKILLS / TOPICS COVERED (comma-separated)
              </label>
              <input
                type="text"
                placeholder="SolidWorks, 3D CAD, FEA, Stress Analysis"
                value={skillsStr}
                onChange={(e) => {
                  setSkillsStr(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* CERTIFICATE FILE UPLOAD (PDF or IMAGE) */}
            <div className="p-4 rounded-xl bg-lab-950 border border-lab-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-cyan-glow uppercase">
                    UPLOAD CERTIFICATE FILE (PDF / IMAGE)
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Upload official certificate PDF or screenshot (PDF, JPG, PNG, WEBP).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>BROWSE FILE</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />

              {/* Upload Drop Zone or File Preview */}
              {file ? (
                <div className="p-3.5 rounded-lg bg-lab-900 border border-cyan-500/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-lab-950 border border-lab-border text-cyan-glow shrink-0">
                      {file.isPdf || file.type === 'application/pdf' ? (
                        <FileText className="w-6 h-6" />
                      ) : (
                        <ImageIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold text-white truncate max-w-xs">
                        {file.name}
                      </div>
                      <div className="font-mono text-[10px] text-cyan-glow/80 mt-0.5">
                        {file.isPdf ? 'PDF DOCUMENT' : 'IMAGE FILE'} • {(file.size / 1024).toFixed(0)} KB
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-white border border-lab-border"
                    >
                      REPLACE
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded bg-lab-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                      title="Remove File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-5 rounded-lg border-2 border-dashed text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-cyan-glow bg-cyan-500/10'
                      : 'border-lab-border hover:border-cyan-500/40 bg-lab-900/60'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2 text-cyan-glow font-mono text-xs">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>UPLOADING CERTIFICATE...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Upload className="w-6 h-6 text-cyan-glow/60" />
                      <span className="font-mono text-xs text-slate-200">
                        DRAG &amp; DROP PDF OR CERTIFICATE IMAGE HERE
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        Supported: PDF, JPG, PNG, WEBP (Max 15MB)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {uploadError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>

          </form>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handleAttemptClose}
              className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-300 font-mono text-xs font-semibold"
            >
              CANCEL
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SAVING...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isEdit ? 'SAVE CHANGES' : 'SAVE CERTIFICATION'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      <UnsavedChangesModal
        isOpen={showUnsavedPrompt}
        onKeepEditing={() => setShowUnsavedPrompt(false)}
        onConfirmDiscard={() => {
          setShowUnsavedPrompt(false);
          setIsDirty(false);
          onClose();
        }}
      />
    </>
  );
}

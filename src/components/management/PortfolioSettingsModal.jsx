import React, { useState, useEffect, useRef } from 'react';
import { X, Settings, Mail, FileText, Upload, Trash2, AlertTriangle, Sparkles, RefreshCw, Loader2, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { validateFile, readFileAsDataURL } from '../../services/imageUtils';
import { resetToFactorySamples } from '../../services/db';
import { useToast } from '../common/ToastContainer';
import UnsavedChangesModal from '../common/UnsavedChangesModal';

export default function PortfolioSettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetFactoryData,
}) {
  const { notifySuccess, notifyError, notifyWarning } = useToast();

  const [email, setEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [bioSubtitle, setBioSubtitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [customResume, setCustomResume] = useState(null); // { name, size, dataUrl }

  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const resumeInputRef = useRef(null);

  useEffect(() => {
    if (settings) {
      setEmail(settings.email || '');
      setGithubUrl(settings.githubUrl || '');
      setLinkedinUrl(settings.linkedinUrl || '');
      setBioSubtitle(settings.bioSubtitle || '');
      setHeroDescription(settings.heroDescription || '');
      setCustomResume(
        settings.customResumeDataUrl
          ? {
              name: settings.resumeFileName || 'Custom_Resume.pdf',
              dataUrl: settings.customResumeDataUrl,
            }
          : null
      );
    }
    setIsDirty(false);
  }, [settings, isOpen]);

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

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file, true);
    if (!validation.valid) {
      notifyError(validation.error);
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      setCustomResume({
        name: file.name,
        size: file.size,
        dataUrl,
      });
      markDirty();
      notifySuccess('Resume PDF attached. Click Save Settings to persist.');
    } catch (err) {
      notifyError('Failed to read resume PDF: ' + err.message);
    }
  };

  const handleRemoveResume = () => {
    setCustomResume(null);
    markDirty();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await onSaveSettings({
        email: email.trim(),
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        bioSubtitle: bioSubtitle.trim(),
        heroDescription: heroDescription.trim(),
        hasCustomResume: Boolean(customResume?.dataUrl),
        resumeFileName: customResume?.name || 'resume.pdf',
        customResumeDataUrl: customResume?.dataUrl || null,
      });
      notifySuccess('Portfolio settings updated and saved.');
      setIsDirty(false);
      onClose();
    } catch (err) {
      notifyError('Failed to save settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFactoryReset = async () => {
    const confirm1 = window.confirm(
      'WARNING: This will reset all projects and certifications back to initial factory demo data. Any custom projects you created will be replaced.\n\nDo you want to continue?'
    );
    if (!confirm1) return;

    const confirm2 = window.prompt(
      'Type "RESET" to confirm resetting portfolio database to initial factory demo content:'
    );
    if (confirm2 !== 'RESET') {
      notifyWarning('Reset cancelled: verification text did not match.');
      return;
    }

    try {
      setIsResetting(true);
      await resetToFactorySamples();
      notifySuccess('Portfolio database reset to factory demo content.');
      onResetFactoryData();
      onClose();
    } catch (err) {
      notifyError('Failed to reset database: ' + err.message);
    } finally {
      setIsResetting(false);
    }
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
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-glow">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                  PORTFOLIO CONFIGURATION SETTINGS
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Update contact URLs, customize resume PDF, and configure bio text
                </p>
              </div>
            </div>

            <button
              onClick={handleAttemptClose}
              className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white border border-lab-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 font-mono text-xs">
            
            {/* Contact Email */}
            <div>
              <label className="block text-cyan-glow font-semibold mb-1.5 uppercase flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>PRIMARY CONTACT EMAIL</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-white focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* GitHub & LinkedIn URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GITHUB PROFILE URL</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => {
                    setGithubUrl(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-white focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LINKEDIN PROFILE URL</span>
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-white focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Bio Subtitle & Hero Description */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                HERO ENGINEERING SUBTITLE
              </label>
              <input
                type="text"
                value={bioSubtitle}
                onChange={(e) => {
                  setBioSubtitle(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 focus:outline-none focus:border-cyan-glow"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                HERO PHILOSOPHY / DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => {
                  setHeroDescription(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* Custom Resume PDF Upload */}
            <div className="p-4 rounded-xl bg-lab-950 border border-lab-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-cyan-glow uppercase flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    CUSTOM RESUME PDF FILE
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Upload your customized resume PDF directly into browser storage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>UPLOAD PDF</span>
                </button>
              </div>

              <input
                type="file"
                ref={resumeInputRef}
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
              />

              {customResume ? (
                <div className="p-3 rounded-lg bg-lab-900 border border-cyan-500/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-5 h-5 text-cyan-glow shrink-0" />
                    <span className="text-white font-bold truncate max-w-xs">{customResume.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="p-1.5 rounded bg-lab-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                    title="Remove Custom Resume"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-lab-900/60 border border-lab-border text-slate-400 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  <span>Using default static file at <code className="text-cyan-glow">/public/resume.pdf</code></span>
                </div>
              )}
            </div>

            {/* Factory Reset Danger Zone */}
            <div className="pt-4 border-t border-lab-border flex items-center justify-between gap-4">
              <div>
                <div className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>RESET TO FACTORY DEMO DATA</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  Restores initial sample projects and certifications. Requires confirmation.
                </p>
              </div>

              <button
                type="button"
                disabled={isResetting}
                onClick={handleFactoryReset}
                className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isResetting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>RESET DEMO DATA</span>
              </button>
            </div>

          </form>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handleAttemptClose}
              className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-300 font-mono text-xs"
            >
              CANCEL
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>SAVE SETTINGS</span>
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

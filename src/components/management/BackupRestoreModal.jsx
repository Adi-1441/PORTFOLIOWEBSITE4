import React, { useState, useRef } from 'react';
import { X, Download, Upload, Database, AlertCircle, CheckCircle2, Loader2, HardDrive, ShieldCheck, RefreshCw } from 'lucide-react';
import { exportPortfolioBackup, validateBackupFile, restorePortfolioBackup } from '../../services/backupService';
import { useToast } from '../common/ToastContainer';

export default function BackupRestoreModal({ isOpen, onClose, onDataRestored }) {
  const { notifySuccess, notifyError, notifyInfo } = useToast();

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [parsedBackup, setParsedBackup] = useState(null);
  const [restoreMode, setRestoreMode] = useState('replace'); // 'replace' | 'merge'
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const result = await exportPortfolioBackup();
      notifySuccess(`Exported ${result.countProjects} projects and ${result.countCertifications} certifications to backup file.`);
    } catch (err) {
      notifyError('Failed to generate backup: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const validation = validateBackupFile(json);
        if (!validation.valid) {
          setErrorMessage(validation.error);
          setParsedBackup(null);
          return;
        }
        setParsedBackup({ ...json, summary: validation });
      } catch (err) {
        setErrorMessage('Failed to parse JSON file. Please ensure it is a valid portfolio backup file.');
        setParsedBackup(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = async () => {
    if (!parsedBackup) return;

    if (
      restoreMode === 'replace' &&
      !window.confirm('Are you sure you want to replace existing portfolio records with the backup file data?')
    ) {
      return;
    }

    try {
      setIsImporting(true);
      const result = await restorePortfolioBackup(parsedBackup, restoreMode);
      notifySuccess(`Restored ${result.restoredProjects} projects and ${result.restoredCertifications} certifications.`);
      onDataRestored();
      onClose();
    } catch (err) {
      notifyError('Failed to restore backup data: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
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
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                BACKUP &amp; RESTORE PORTFOLIO DATA
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Export and import complete portfolio state including projects, CAD images &amp; PDFs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white border border-lab-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* SECTION 1: EXPORT */}
          <div className="p-5 rounded-xl bg-lab-850 border border-lab-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs font-bold text-cyan-glow uppercase flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  EXPORT PORTFOLIO ARCHIVE (JSON)
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Downloads all your projects, uploaded CAD renders, certificates, and settings into a single file.
                </p>
              </div>

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>EXPORT DATA</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: IMPORT */}
          <div className="p-5 rounded-xl bg-lab-850 border border-lab-border space-y-4">
            <div>
              <div className="font-mono text-xs font-bold text-cyan-glow uppercase flex items-center gap-2">
                <Upload className="w-4 h-4" />
                RESTORE FROM BACKUP FILE
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Select a previously exported JSON backup file to import your projects and certificates.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleSelectFile}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-6 rounded-xl border-2 border-dashed border-lab-border hover:border-cyan-500/40 bg-lab-900/60 text-center cursor-pointer transition-all"
            >
              <Upload className="w-7 h-7 text-cyan-glow/60 mx-auto mb-2" />
              <div className="font-mono text-xs text-slate-200">
                CLICK TO SELECT BACKUP JSON FILE
              </div>
              <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                adithya-g-portfolio-backup-*.json
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Validated Backup Summary */}
            {parsedBackup && (
              <div className="p-4 rounded-xl bg-lab-950 border border-cyan-500/40 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BACKUP FILE VALIDATED</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                  <div>Projects: <span className="text-white font-bold">{parsedBackup.summary.projectCount}</span></div>
                  <div>Certifications: <span className="text-white font-bold">{parsedBackup.summary.certCount}</span></div>
                  <div className="col-span-2">Export Date: <span className="text-slate-400">{parsedBackup.summary.exportDate}</span></div>
                </div>

                {/* Mode Select */}
                <div className="pt-2 border-t border-lab-border">
                  <label className="block text-slate-300 font-semibold mb-1">
                    RESTORE STRATEGY:
                  </label>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="restoreMode"
                        value="replace"
                        checked={restoreMode === 'replace'}
                        onChange={() => setRestoreMode('replace')}
                        className="text-cyan-glow"
                      />
                      <span>Replace Existing Data</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="restoreMode"
                        value="merge"
                        checked={restoreMode === 'merge'}
                        onChange={() => setRestoreMode('merge')}
                        className="text-cyan-glow"
                      />
                      <span>Merge with Existing</span>
                    </label>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmRestore}
                  disabled={isImporting}
                  className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-lab-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                  <span>RESTORE PORTFOLIO DATABASE</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 font-mono text-xs"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

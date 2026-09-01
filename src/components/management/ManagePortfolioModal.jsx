import React, { useState, useEffect } from 'react';
import { X, Settings, Plus, Edit3, Trash2, Database, Award, FolderGit2, HardDrive, ShieldCheck, RefreshCw, FileText } from 'lucide-react';
import EngineeringBadge from '../common/EngineeringBadge';
import { getStorageEstimate } from '../../services/db';

export default function ManagePortfolioModal({
  isOpen,
  onClose,
  projects = [],
  certifications = [],
  onOpenAddProject,
  onEditProject,
  onDeleteProject,
  onOpenAddCertification,
  onEditCertification,
  onDeleteCertification,
  onOpenBackup,
  onOpenSettings,
}) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certifications' | 'storage'
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getStorageEstimate().then(setStorageInfo);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-lab-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-lab-900 border border-lab-border rounded-2xl shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col"
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
              <h2 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight">
                PORTFOLIO MANAGEMENT DASHBOARD
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Full CRUD control over Projects, Certifications, CAD Images, and IndexedDB Storage
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

        {/* Tab Navigation & Action Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-lab-border bg-lab-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/20 text-cyan-glow border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-lab-800'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PROJECTS ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'certifications'
                  ? 'bg-cyan-500/20 text-cyan-glow border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-lab-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>CERTIFICATIONS ({certifications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('storage')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'storage'
                  ? 'bg-cyan-500/20 text-cyan-glow border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-lab-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>STORAGE TELEMETRY</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBackup}
              className="px-3 py-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 border border-lab-border text-xs font-mono flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-cyan-glow" />
              <span>BACKUP &amp; RESTORE</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 border border-lab-border text-xs font-mono flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-glow" />
              <span>SETTINGS</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: PROJECTS TABLE */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  ALL STORED PROJECTS (Editable &amp; Deletable):
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAddProject();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ ADD NEW PROJECT</span>
                </button>
              </div>

              {projects.length > 0 ? (
                <div className="border border-lab-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-lab-950 text-slate-400 border-b border-lab-border uppercase">
                        <tr>
                          <th className="p-3">Title &amp; Category</th>
                          <th className="p-3">Images</th>
                          <th className="p-3">Year</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-lab-border bg-lab-900/60">
                        {projects.map((proj) => (
                          <tr key={proj.id} className="hover:bg-lab-850/80 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-white max-w-xs truncate" title={proj.title}>
                                {proj.title}
                              </div>
                              <div className="text-[10px] text-cyan-glow mt-0.5">
                                {proj.category} {proj.isSample && <span className="text-slate-500">[SAMPLE DEMO]</span>}
                              </div>
                            </td>
                            <td className="p-3 text-slate-300">
                              {proj.images?.length || 0} files
                            </td>
                            <td className="p-3 text-slate-300">{proj.year || '2024'}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-lab-950 border border-lab-border text-[10px] text-slate-300">
                                {proj.status || 'Completed'}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    onClose();
                                    onEditProject(proj);
                                  }}
                                  className="p-1.5 rounded bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-white"
                                  title="Edit Project"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteProject(proj)}
                                  className="p-1.5 rounded bg-lab-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-lab-950 rounded-xl border border-lab-border font-mono text-xs text-slate-400">
                  No projects in database.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CERTIFICATIONS TABLE */}
          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  ALL STORED CERTIFICATIONS:
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAddCertification();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ ADD NEW CERTIFICATION</span>
                </button>
              </div>

              {certifications.length > 0 ? (
                <div className="border border-lab-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-lab-950 text-slate-400 border-b border-lab-border uppercase">
                        <tr>
                          <th className="p-3">Certificate Name &amp; Issuer</th>
                          <th className="p-3">File Attached</th>
                          <th className="p-3">Issue Date</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-lab-border bg-lab-900/60">
                        {certifications.map((cert) => (
                          <tr key={cert.id} className="hover:bg-lab-850/80 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-white max-w-xs truncate" title={cert.name}>
                                {cert.name}
                              </div>
                              <div className="text-[10px] text-cyan-glow mt-0.5">
                                {cert.issuer} {cert.isSample && <span className="text-slate-500">[SAMPLE DEMO]</span>}
                              </div>
                            </td>
                            <td className="p-3 text-slate-300">
                              {cert.file ? (
                                <span className="text-cyan-glow">
                                  {cert.file.isPdf ? 'PDF' : 'IMAGE'} ({(cert.file.size / 1024).toFixed(0)} KB)
                                </span>
                              ) : (
                                <span className="text-slate-500">None</span>
                              )}
                            </td>
                            <td className="p-3 text-slate-300">{cert.issueDate || 'N/A'}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    onClose();
                                    onEditCertification(cert);
                                  }}
                                  className="p-1.5 rounded bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-white"
                                  title="Edit Certificate"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteCertification(cert)}
                                  className="p-1.5 rounded bg-lab-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                                  title="Delete Certificate"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-lab-950 rounded-xl border border-lab-border font-mono text-xs text-slate-400">
                  No certifications in database.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STORAGE TELEMETRY */}
          {activeTab === 'storage' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-lab-950 border border-lab-border space-y-4">
                <div className="font-mono text-xs text-cyan-glow font-bold uppercase flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  INDEXEDDB STORAGE USAGE ESTIMATE
                </div>

                {storageInfo ? (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>ESTIMATED STORAGE USED:</span>
                      <span className="text-white font-bold">{storageInfo.usageMB} MB</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>TOTAL BROWSER QUOTA:</span>
                      <span className="text-slate-400">{storageInfo.quotaMB} MB</span>
                    </div>

                    <div className="w-full bg-lab-900 rounded-full h-2.5 border border-lab-border overflow-hidden">
                      <div
                        className="bg-cyan-500 h-2.5 rounded-full"
                        style={{ width: `${Math.max(Number(storageInfo.percent), 2)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400">
                      {storageInfo.percent}% of available quota used
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-slate-400">
                    Storage telemetry estimate is loading or not exposed by browser.
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-lab-850 border border-lab-border space-y-2 text-xs font-mono">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  PERSISTENCE GUARANTEE
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  All projects, uploaded CAD screenshots, and certificate files are stored locally in your browser&apos;s IndexedDB. They persist across browser tabs, restarts, and page refreshes.
                </p>
                <p className="text-slate-400 text-[11px] font-sans">
                  To transfer data to another computer or browser, use the <strong>Backup &amp; Restore</strong> tool.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 font-mono text-xs font-semibold"
          >
            CLOSE DASHBOARD
          </button>
        </div>

      </div>
    </div>
  );
}

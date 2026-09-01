import React, { useState, useEffect } from 'react';
import { X, Calendar, User, CheckCircle2, Wrench, Edit3, Trash2, ExternalLink, Image as ImageIcon, Layers, Activity, Target, Cpu, Award } from 'lucide-react';
import EngineeringBadge from '../common/EngineeringBadge';
import ProjectGallery from './ProjectGallery';

export default function ProjectDetailsModal({ project, isOpen, onClose, onEdit, onDelete }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || galleryOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, galleryOpen, onClose]);

  if (!isOpen || !project) return null;

  const openGalleryAt = (index) => {
    setActiveGalleryIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-lab-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        <div
          className="w-full max-w-4xl bg-lab-900 border border-lab-border rounded-2xl shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-lab-border bg-lab-950/90 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
              <EngineeringBadge variant="cyan">{project.category}</EngineeringBadge>
              {project.isSample && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lab-800 text-slate-400">
                  SAMPLE DEMO
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(project)}
                className="px-3 py-1.5 rounded-lg bg-lab-800 hover:bg-lab-750 text-slate-200 hover:text-white border border-lab-border text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Edit Project"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDIT</span>
              </button>

              <button
                onClick={() => onDelete(project)}
                className="px-3 py-1.5 rounded-lg bg-lab-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-lab-border hover:border-rose-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>DELETE</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white border border-lab-border transition-colors ml-2"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-8 overflow-y-auto space-y-8 flex-1">
            
            {/* Title & Key Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-glow" />
                  YEAR: {project.year || '2024'}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-cyan-glow" />
                  ROLE: {project.role || 'Mechanical Engineer'}
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-glow" />
                  STATUS: {project.status || 'Completed'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                {project.title}
              </h2>
            </div>

            {/* CAD Image Gallery Preview Strip */}
            {project.images && project.images.length > 0 ? (
              <div className="p-4 rounded-xl bg-lab-950 border border-lab-border">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-cyan-glow font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    PROJECT CAD GALLERY ({project.images.length})
                  </span>
                  <button
                    onClick={() => openGalleryAt(0)}
                    className="text-cyan-glow hover:underline flex items-center gap-1"
                  >
                    <span>OPEN FULLSCREEN LIGHTBOX</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {project.images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => openGalleryAt(idx)}
                      className="group relative h-28 sm:h-32 rounded-lg overflow-hidden border border-lab-border hover:border-cyan-glow transition-all"
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.name || `CAD Render ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {img.isCover && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-cyan-500/90 text-lab-950 font-mono text-[9px] font-bold">
                          COVER
                        </div>
                      )}
                      <div className="absolute inset-0 bg-lab-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="font-mono text-[10px] text-white bg-lab-950/80 px-2 py-1 rounded border border-lab-border">
                          ZOOM
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-lab-950 border border-lab-border flex items-center justify-center gap-2 text-slate-500 font-mono text-xs">
                <ImageIcon className="w-4 h-4 text-cyan-glow/50" />
                <span>NO CAD IMAGES ATTACHED (Add via Edit)</span>
              </div>
            )}

            {/* Description / Summary */}
            {project.description && (
              <div>
                <h4 className="font-mono text-xs text-cyan-glow font-semibold tracking-wider uppercase mb-2">
                  // PROJECT SUMMARY
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Problem & Solution Grid */}
            {(project.objective || project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.problem && (
                  <div className="p-4 sm:p-5 rounded-xl bg-lab-850 border border-lab-border">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
                      <Target className="w-4 h-4" />
                      <span>ENGINEERING CHALLENGE / PROBLEM</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-4 sm:p-5 rounded-xl bg-lab-850 border border-lab-border">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ENGINEERING SOLUTION</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Objective & Methodology */}
            {project.objective && (
              <div className="p-4 sm:p-5 rounded-xl bg-lab-850 border border-lab-border">
                <div className="text-cyan-glow font-mono text-xs font-bold mb-2">
                  // PROJECT OBJECTIVE
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>
            )}

            {project.methodology && (
              <div>
                <h4 className="font-mono text-xs text-cyan-glow font-semibold tracking-wider uppercase mb-2">
                  // METHODOLOGY &amp; STANDARDS
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.methodology}
                </p>
              </div>
            )}

            {/* Tools & Engineering Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.tools && project.tools.length > 0 && (
                <div className="p-4 rounded-xl bg-lab-950 border border-lab-border">
                  <div className="font-mono text-xs text-cyan-glow font-semibold mb-2.5">
                    SOFTWARE &amp; TOOLS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-lab-900 border border-lab-border text-xs font-mono text-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.skills && project.skills.length > 0 && (
                <div className="p-4 rounded-xl bg-lab-950 border border-lab-border">
                  <div className="font-mono text-xs text-cyan-glow font-semibold mb-2.5">
                    ENGINEERING COMPETENCIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-lab-900 border border-lab-border text-xs font-mono text-cyan-glow"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="font-mono text-xs text-cyan-glow font-semibold tracking-wider uppercase mb-3">
                  // KEY TECHNICAL FEATURES
                </h4>
                <div className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-lab-850 border border-lab-border flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                    >
                      <span className="font-mono text-cyan-glow font-bold text-xs mt-0.5">[{idx + 1}]</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results & Outcome */}
            {(project.results || project.outcome) && (
              <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                {project.results && (
                  <div className="mb-3">
                    <div className="font-mono text-xs font-bold text-cyan-glow mb-1">
                      RESULTS &amp; VERIFICATION
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {project.results}
                    </p>
                  </div>
                )}
                {project.outcome && (
                  <div>
                    <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                      DELIVERABLE &amp; OUTCOME
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Project Links */}
            {project.links && project.links.length > 0 && (
              <div className="pt-4 border-t border-lab-border">
                <div className="font-mono text-xs text-slate-400 mb-2">PROJECT REFERENCES:</div>
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lab-850 hover:bg-lab-800 text-cyan-glow border border-lab-border text-xs font-mono transition-colors"
                    >
                      <span>{link.label || 'View Reference'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex items-center justify-between shrink-0">
            <span className="font-mono text-[11px] text-slate-500">
              ID: {project.id}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 hover:text-white border border-lab-border font-mono text-xs font-semibold transition-colors"
            >
              CLOSE
            </button>
          </div>

        </div>
      </div>

      {/* Lightbox Gallery Component */}
      <ProjectGallery
        images={project.images || []}
        initialIndex={activeGalleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        projectTitle={project.title}
      />
    </>
  );
}

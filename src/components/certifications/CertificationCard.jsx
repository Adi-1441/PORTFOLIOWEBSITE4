import React from 'react';
import { Eye, Edit3, Trash2, Calendar, Award, ExternalLink, FileText, CheckCircle2, Shield } from 'lucide-react';
import EngineeringBadge from '../common/EngineeringBadge';

export default function CertificationCard({ cert, onView, onEdit, onDelete }) {
  const isPdf = cert.file?.isPdf || cert.file?.type === 'application/pdf';

  return (
    <div className="group bg-lab-850 rounded-2xl border border-lab-border hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-cyan-950/20 glass-panel-hover">
      
      {/* Certificate Preview Header */}
      <div className="relative w-full h-40 sm:h-44 bg-lab-950 border-b border-lab-border overflow-hidden flex items-center justify-center p-3">
        {cert.file && cert.file.dataUrl ? (
          isPdf ? (
            <div className="flex flex-col items-center justify-center text-center p-4 bg-lab-900/80 rounded-xl border border-lab-border w-full h-full">
              <FileText className="w-10 h-10 text-cyan-glow mb-2" />
              <span className="font-mono text-xs font-bold text-white truncate max-w-[200px]">
                {cert.file.name || 'Certificate.pdf'}
              </span>
              <span className="font-mono text-[10px] text-cyan-glow/80 mt-1">
                [PDF DOCUMENT // CLICK TO VIEW]
              </span>
            </div>
          ) : (
            <img
              src={cert.file.dataUrl}
              alt={cert.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded"
              loading="lazy"
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-lab-900 text-slate-500 p-4">
            <Award className="w-10 h-10 mb-2 opacity-40 text-cyan-glow" />
            <span className="font-mono text-xs uppercase text-slate-400">NO CERTIFICATE ATTACHED</span>
            <span className="font-mono text-[10px] text-slate-500 mt-0.5">Upload PDF/Image via Edit</span>
          </div>
        )}

        {/* Demo stamp */}
        {cert.isSample && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 rounded bg-lab-950/90 border border-lab-border text-[10px] font-mono text-slate-400 font-bold backdrop-blur-sm">
              SAMPLE DEMO
            </span>
          </div>
        )}

        {/* CAD Corner Marks */}
        <div className="absolute top-2 left-2 text-cyan-glow/30 font-mono text-[10px] pointer-events-none">+</div>
        <div className="absolute bottom-2 right-2 text-cyan-glow/30 font-mono text-[10px] pointer-events-none">+</div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Organization & Issue Date */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-glow font-semibold truncate max-w-[180px]">
              {cert.issuer}
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {cert.issueDate || '2024'}
            </span>
          </div>

          {/* Certificate Title */}
          <h3
            onClick={() => onView(cert)}
            className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyan-glow transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {cert.name}
          </h3>

          {/* Credential ID */}
          {cert.credentialId && (
            <div className="font-mono text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
              <span className="truncate">ID: {cert.credentialId}</span>
            </div>
          )}

          {/* Description */}
          {cert.description && (
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
              {cert.description}
            </p>
          )}

          {/* Skills / Topics Badges */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-lab-900 border border-lab-border text-[10px] font-mono text-cyan-glow"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="px-1.5 py-0.5 rounded bg-lab-900 text-[10px] font-mono text-slate-400">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-4 border-t border-lab-border/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onView(cert)}
            className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-glow border border-cyan-500/30 hover:border-cyan-500/60 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW CREDENTIAL</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(cert)}
              className="p-2 rounded-lg bg-lab-900 hover:bg-lab-800 text-slate-300 hover:text-white border border-lab-border transition-colors"
              title="Edit Certificate"
              aria-label={`Edit ${cert.name}`}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete(cert)}
              className="p-2 rounded-lg bg-lab-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-lab-border hover:border-rose-500/30 transition-colors"
              title="Delete Certificate"
              aria-label={`Delete ${cert.name}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

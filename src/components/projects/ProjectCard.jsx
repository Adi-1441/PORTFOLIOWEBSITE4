import React from 'react';
import { Eye, Edit3, Trash2, Calendar, User, CheckCircle2, Image as ImageIcon, ExternalLink, Wrench } from 'lucide-react';
import EngineeringBadge from '../common/EngineeringBadge';

export default function ProjectCard({ project, onView, onEdit, onDelete }) {
  const coverImage = project.images?.find((img) => img.isCover) || project.images?.[0];

  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'CAD DESIGN': return 'cyan';
      case 'CAE / FEA': return 'amber';
      case 'CFD / FLUIDS': return 'blue';
      case 'THERMAL': return 'rose';
      case 'RESEARCH & MATERIALS': return 'emerald';
      case 'AI × ENGINEERING': return 'purple';
      case 'MANUFACTURING': return 'default';
      case 'AUTOMATION': return 'cyan';
      default: return 'default';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'emerald';
      case 'In Progress': return 'cyan';
      case 'Research Phase': return 'amber';
      default: return 'default';
    }
  };

  return (
    <div className="group bg-lab-850 rounded-2xl border border-lab-border hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-cyan-950/20 glass-panel-hover">
      
      {/* Project Cover Image Area */}
      <div className="relative w-full h-48 sm:h-52 bg-lab-950 border-b border-lab-border overflow-hidden">
        {coverImage && coverImage.dataUrl ? (
          <img
            src={coverImage.dataUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-lab-900/90 text-slate-500 p-4">
            <ImageIcon className="w-10 h-10 mb-2 opacity-40 text-cyan-glow" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
              NO PROJECT IMAGE
            </span>
            <span className="font-mono text-[10px] text-slate-500 mt-0.5">
              Upload CAD renders via Edit
            </span>
          </div>
        )}

        {/* CAD Crosshair Watermarks on Image */}
        <div className="absolute top-2 left-2 text-cyan-glow/40 font-mono text-[10px] pointer-events-none">+</div>
        <div className="absolute top-2 right-2 text-cyan-glow/40 font-mono text-[10px] pointer-events-none">+</div>

        {/* Category Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <EngineeringBadge variant={getCategoryVariant(project.category)}>
            {project.category}
          </EngineeringBadge>
        </div>

        {/* Sample Demo Indicator (if applicable) */}
        {project.isSample && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded bg-lab-950/90 border border-lab-border text-[10px] font-mono text-slate-400 font-bold backdrop-blur-sm">
              SAMPLE DEMO
            </span>
          </div>
        )}

        {/* Image count badge */}
        {project.images && project.images.length > 1 && (
          <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-lab-950/80 border border-lab-border text-[10px] font-mono text-cyan-glow backdrop-blur-sm">
            {project.images.length} CAD IMAGES
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Year & Status */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-glow" />
              {project.year || '2024'}
            </span>
            <EngineeringBadge variant={getStatusVariant(project.status)} size="xs">
              {project.status || 'Completed'}
            </EngineeringBadge>
          </div>

          {/* Project Title */}
          <h3
            onClick={() => onView(project)}
            className="text-lg font-display font-bold text-white group-hover:text-cyan-glow transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tools Badges */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tools.slice(0, 4).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-lab-900 border border-lab-border text-[10px] font-mono text-slate-300"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 4 && (
                <span className="px-1.5 py-0.5 rounded bg-lab-900 text-[10px] font-mono text-slate-400">
                  +{project.tools.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="pt-4 border-t border-lab-border/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onView(project)}
            className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-glow border border-cyan-500/30 hover:border-cyan-500/60 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW PROJECT</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(project)}
              className="p-2 rounded-lg bg-lab-900 hover:bg-lab-800 text-slate-300 hover:text-white border border-lab-border transition-colors"
              title="Edit Project"
              aria-label={`Edit ${project.title}`}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete(project)}
              className="p-2 rounded-lg bg-lab-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-lab-border hover:border-rose-500/30 transition-colors"
              title="Delete Project"
              aria-label={`Delete ${project.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

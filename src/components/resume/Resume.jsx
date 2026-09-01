import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Download, FileText, CheckCircle2, ExternalLink, ShieldCheck, Sparkles, Settings } from 'lucide-react';

export default function Resume({ settings, onDownloadResume, onOpenSettings }) {
  const resumeUrl = settings?.customResumeDataUrl || '/resume.pdf';

  const resumeHighlights = [
    {
      category: 'PRIMARY DISCIPLINE',
      items: ['Mechanical Engineering Student', 'Design for Manufacturing (DFM)', 'ASME Y14.5M GD&T Standards'],
    },
    {
      category: 'CAD & 3D MODELING',
      items: ['SolidWorks 2024 Parametric Modeling', 'Complex Assembly & Kinematics', 'Detailed 2D Fabrication Drawings'],
    },
    {
      category: 'CAE & SIMULATION',
      items: ['ANSYS Mechanical Static Structural & Modal', 'ANSYS Fluent CFD & Thermal-Fluids', 'Mesh Convergence & Roache GCI Validation'],
    },
    {
      category: 'RESEARCH & COMPUTATION',
      items: ['Natural Fiber Biocomposites Testing (ASTM)', 'Chemical Alkaline Surface Treatment', 'Python, NumPy, SciPy & ML Regression'],
    },
  ];

  return (
    <section id="resume" className="py-20 bg-lab-900/60 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-09"
          title="MECHANICAL ENGINEERING RESUME &amp; DOSSIER"
          subtitle="Comprehensive academic curriculum, CAD/CAE competencies, simulation toolchains, and research credentials."
        />

        {/* Main Resume Card */}
        <div className="bg-lab-850 p-6 sm:p-10 rounded-2xl border border-lab-border shadow-2xl relative overflow-hidden">
          {/* Corner Crosshairs */}
          <div className="absolute top-3 left-3 text-cyan-glow/30 font-mono text-xs">+</div>
          <div className="absolute top-3 right-3 text-cyan-glow/30 font-mono text-xs">+</div>
          <div className="absolute bottom-3 left-3 text-cyan-glow/30 font-mono text-xs">+</div>
          <div className="absolute bottom-3 right-3 text-cyan-glow/30 font-mono text-xs">+</div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-lab-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <EngineeringBadge variant="cyan">CURRICULUM VITAE</EngineeringBadge>
                <span className="font-mono text-xs text-slate-400">OFFICIAL RESUME DOCUMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                ADITHYA G — MECHANICAL ENGINEERING
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cyan-glow mt-1">
                CAD • CAE • CFD • THERMAL • MATERIALS RESEARCH • AUTOMATION • AI
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onDownloadResume}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </button>

              <button
                onClick={onOpenSettings}
                className="px-4 py-3 rounded-xl bg-lab-900 hover:bg-lab-800 text-slate-300 hover:text-white border border-lab-border text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Configure custom resume file in Settings"
              >
                <Settings className="w-4 h-4 text-cyan-glow" />
                <span>SETTINGS</span>
              </button>
            </div>
          </div>

          {/* Core Competencies Matrix */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeHighlights.map((col, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-lab-900 border border-lab-border">
                <div className="font-mono text-xs font-bold text-cyan-glow uppercase tracking-wider mb-3">
                  // {col.category}
                </div>
                <ul className="space-y-2">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Notice on PDF Customization */}
          <div className="mt-8 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-glow shrink-0" />
              <span>
                To replace the resume PDF: Place your <code className="text-cyan-glow bg-lab-900 px-1 py-0.5 rounded">resume.pdf</code> in the <code className="text-cyan-glow bg-lab-900 px-1 py-0.5 rounded">/public/</code> folder or upload a custom PDF via Portfolio Settings.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

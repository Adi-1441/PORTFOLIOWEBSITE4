import React from 'react';
import { Wrench, Database, FileText, Send, ChevronUp, Cpu } from 'lucide-react';

export default function Footer({ onOpenManage, onOpenBackup, onOpenSettings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-lab-950 border-t border-lab-border text-slate-400 font-sans relative overflow-hidden pt-16 pb-12">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-lab-border">
          {/* Column 1: Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded bg-lab-900 border border-cyan-500/40 flex items-center justify-center text-cyan-glow">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                ADITHYA G
              </span>
            </div>
            <p className="font-mono text-xs text-cyan-glow/90 font-medium mb-3">
              MECHANICAL ENGINEERING STUDENT
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              CAD • CAE • CFD • Thermal • Research • Automation • AI × Engineering.
              Designing, analyzing, and exploring next-generation mechanical systems.
            </p>
          </div>

          {/* Column 2: Core Engineering Pillars */}
          <div>
            <div className="font-mono text-xs text-cyan-glow uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              ENGINEERING DOMAINS
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#projects" className="hover:text-cyan-glow transition-colors">3D CAD Modeling (SolidWorks)</a></li>
              <li><a href="#cadcae" className="hover:text-cyan-glow transition-colors">Finite Element Analysis (FEA)</a></li>
              <li><a href="#cadcae" className="hover:text-cyan-glow transition-colors">Computational Fluid Dynamics (CFD)</a></li>
              <li><a href="#research" className="hover:text-cyan-glow transition-colors">Natural Fiber Composites</a></li>
              <li><a href="#ai-engineering" className="hover:text-cyan-glow transition-colors">Machine Learning in Engineering</a></li>
            </ul>
          </div>

          {/* Column 3: Lab Navigation & Telemetry */}
          <div>
            <div className="font-mono text-xs text-cyan-glow uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              PORTFOLIO SECTIONS
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a href="#about" className="hover:text-cyan-glow transition-colors">About</a>
              <a href="#skills" className="hover:text-cyan-glow transition-colors">Skills</a>
              <a href="#projects" className="hover:text-cyan-glow transition-colors">Projects</a>
              <a href="#research" className="hover:text-cyan-glow transition-colors">Research</a>
              <a href="#cadcae" className="hover:text-cyan-glow transition-colors">CAD &amp; CAE</a>
              <a href="#certifications" className="hover:text-cyan-glow transition-colors">Certifications</a>
              <a href="#articles" className="hover:text-cyan-glow transition-colors">Articles</a>
              <a href="#resume" className="hover:text-cyan-glow transition-colors">Resume</a>
            </div>
          </div>

          {/* Column 4: System & Database Management */}
          <div>
            <div className="font-mono text-xs text-cyan-glow uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              SYSTEM CONTROLS
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenManage}
                className="w-full text-left px-3 py-2 rounded bg-lab-900 hover:bg-lab-850 border border-lab-border hover:border-cyan-500/40 text-xs font-mono text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>MANAGE PORTFOLIO</span>
                <span className="text-[10px] text-cyan-glow">CRUD</span>
              </button>

              <button
                onClick={onOpenBackup}
                className="w-full text-left px-3 py-2 rounded bg-lab-900 hover:bg-lab-850 border border-lab-border hover:border-cyan-500/40 text-xs font-mono text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>BACKUP &amp; RESTORE</span>
                <Database className="w-3.5 h-3.5 text-cyan-glow" />
              </button>

              <div className="mt-2 p-2.5 rounded bg-lab-900/60 border border-lab-border text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  INDEXEDDB PERSISTENT
                </div>
                Data &amp; uploaded CAD files persist across browser reloads.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-400">
            © {new Date().getFullYear()} ADITHYA G • MECHANICAL ENGINEERING PORTFOLIO
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">// LAB-BUILD 2026.09 //</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-lab-900 border border-lab-border hover:border-cyan-500/40 text-slate-300 hover:text-cyan-glow transition-colors"
              aria-label="Scroll back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

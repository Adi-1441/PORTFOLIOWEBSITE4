import React from 'react';
import { ArrowRight, FileText, Send, Sparkles, Cpu, Layers, Disc3 } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import EngineeringBadge from '../common/EngineeringBadge';

export default function Hero({ settings, onDownloadResume }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-blueprint">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-glow/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Stamp */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-900/90 border border-cyan-500/30 text-cyan-glow text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
              <span className="tracking-widest font-semibold uppercase">
                ENGINEERING DESIGN LAB // DIGITAL PORTFOLIO
              </span>
            </div>

            {/* Intro & Name */}
            <div className="font-mono text-sm sm:text-base text-slate-400 uppercase tracking-widest mb-1">
              HELLO, I&apos;M
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-3">
              ADITHYA G
            </h1>

            {/* Student Role */}
            <div className="inline-block font-mono text-base sm:text-xl font-bold text-cyan-glow tracking-wider uppercase mb-4 text-glow-cyan">
              MECHANICAL ENGINEERING STUDENT
            </div>

            {/* Subtitle Pill / Engineering Pillars */}
            <div className="p-2.5 rounded-lg bg-lab-900/80 border border-lab-border mb-6 w-full max-w-xl">
              <p className="font-mono text-xs sm:text-sm text-cyan-accent font-semibold tracking-wider flex flex-wrap gap-x-2 gap-y-1 items-center">
                <span>CAD</span>
                <span className="text-slate-600">•</span>
                <span>CAE</span>
                <span className="text-slate-600">•</span>
                <span>CFD</span>
                <span className="text-slate-600">•</span>
                <span>THERMAL</span>
                <span className="text-slate-600">•</span>
                <span>RESEARCH</span>
                <span className="text-slate-600">•</span>
                <span>AUTOMATION</span>
              </p>
            </div>

            {/* Core Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans">
              {settings?.heroDescription ||
                'I design, model, simulate, analyze, and explore engineering solutions by combining mechanical engineering principles with CAD, CAE, computational tools, research, and AI-driven approaches.'}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-500 text-lab-950 hover:bg-cyan-400 font-mono font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDownloadResume}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-lab-900 hover:bg-lab-800 text-slate-100 hover:text-white font-mono font-medium text-sm tracking-wide border border-lab-border hover:border-slate-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-glow" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-glow font-mono font-semibold text-sm tracking-wide border border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>LET&apos;S CONNECT</span>
              </button>
            </div>

            {/* Engineering Highlights Quick Ribbon */}
            <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-xl border-t border-lab-border pt-6">
              <div className="bg-lab-900/60 p-3 rounded-lg border border-lab-border/70">
                <div className="font-mono text-xs text-slate-400">MODELING</div>
                <div className="font-display font-bold text-white text-sm sm:text-base mt-0.5">SolidWorks CAD</div>
              </div>
              <div className="bg-lab-900/60 p-3 rounded-lg border border-lab-border/70">
                <div className="font-mono text-xs text-slate-400">ANALYSIS</div>
                <div className="font-display font-bold text-cyan-glow text-sm sm:text-base mt-0.5">ANSYS FEA / CFD</div>
              </div>
              <div className="bg-lab-900/60 p-3 rounded-lg border border-lab-border/70">
                <div className="font-mono text-xs text-slate-400">RESEARCH</div>
                <div className="font-display font-bold text-emerald-400 text-sm sm:text-base mt-0.5">Biocomposites</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D CAD Mechanical Assembly */}
          <div className="lg:col-span-5 relative w-full">
            <Hero3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}

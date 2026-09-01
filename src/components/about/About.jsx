import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Compass, Box, Activity, Flame, Wind, Layers, Cpu, Wrench, ShieldCheck, Microscope } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: <Box className="w-5 h-5 text-cyan-glow" />,
      title: 'Mechanical & CAD Design',
      desc: 'Parametric 3D part and complex assembly modeling in SolidWorks, with thorough application of GD&T, tolerance stack-up analysis, and Design for Manufacturing (DFM).',
    },
    {
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      title: 'Structural CAE & FEA',
      desc: 'Finite element modeling in ANSYS Mechanical to evaluate structural stiffness, von Mises stress concentrations, factor of safety, and natural modal frequencies.',
    },
    {
      icon: <Wind className="w-5 h-5 text-sky-400" />,
      title: 'CFD & Fluid Mechanics',
      desc: 'Computational fluid dynamics simulations in ANSYS Fluent to study pressure drops, velocity streamlines, boundary layer separation, and turbulent flow dynamics.',
    },
    {
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      title: 'Thermal Analysis & Heat Transfer',
      desc: 'Conduction, convection, and radiation analysis for thermal dissipation systems, finned heat sinks, and counter-flow industrial heat exchangers.',
    },
    {
      icon: <Microscope className="w-5 h-5 text-emerald-400" />,
      title: 'Composite Materials & Research',
      desc: 'Experimental investigation of natural fiber reinforced epoxy composites (coconut peduncle, areca fibers) and mechanical characterization per ASTM standards.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: 'AI × Mechanical Engineering',
      desc: 'Leveraging machine learning, signal processing (FFT), and numerical computation in Python for predictive maintenance and CNC tool wear monitoring.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-lab-900/60 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="SEC-01"
          title="ABOUT MY ENGINEERING PURSUIT"
          subtitle="Combining classical mechanical engineering principles with computational simulation, experimental materials testing, and algorithmic intelligence."
        />

        {/* Engineering Profile Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Statement Box */}
          <div className="lg:col-span-7 bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border relative overflow-hidden flex flex-col justify-between">
            {/* Corner CAD marks */}
            <div className="absolute top-3 left-3 text-cyan-glow/20 font-mono text-xs">+</div>
            <div className="absolute top-3 right-3 text-cyan-glow/20 font-mono text-xs">+</div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <EngineeringBadge variant="cyan">ACADEMIC // PROFILE</EngineeringBadge>
                <span className="text-xs font-mono text-slate-400">STUDENT // RESEARCHER</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 leading-snug">
                Building robust mechanical solutions from first-principles to detailed CAD &amp; simulation.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                As a Mechanical Engineering student, my focus centers on the full development lifecycle of mechanical components—starting from analytical thermodynamics and mechanics of materials, transitioning to parametric 3D CAD modeling, and validating through Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD).
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Beyond virtual simulation, I actively engage in experimental research with sustainable composite materials, analyzing how natural fiber reinforcements can reduce environmental footprint while retaining structural integrity.
              </p>
            </div>

            {/* Core Values / Engineering Code */}
            <div className="mt-8 pt-6 border-t border-lab-border grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="font-mono text-xs text-slate-400">CORE FOCUS</div>
                <div className="font-display font-semibold text-white text-sm mt-0.5">Design &amp; Simulation</div>
              </div>
              <div>
                <div className="font-mono text-xs text-slate-400">METHODOLOGY</div>
                <div className="font-display font-semibold text-cyan-glow text-sm mt-0.5">First-Principles + CAE</div>
              </div>
              <div>
                <div className="font-mono text-xs text-slate-400">RESEARCH</div>
                <div className="font-display font-semibold text-emerald-400 text-sm mt-0.5">Natural Biocomposites</div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Capabilities Card */}
          <div className="lg:col-span-5 bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-cyan-glow uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-glow" />
                TECHNICAL SPECIFICATIONS // CAPABILITIES
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-lab-900 border border-lab-border">
                  <div className="text-slate-400 text-[11px]">3D CAD &amp; ASSEMBLY MODELING</div>
                  <div className="text-slate-100 font-semibold mt-0.5">SolidWorks • GD&amp;T • Parametric Assemblies</div>
                </div>

                <div className="p-3 rounded-lg bg-lab-900 border border-lab-border">
                  <div className="text-slate-400 text-[11px]">FINITE ELEMENT ANALYSIS</div>
                  <div className="text-slate-100 font-semibold mt-0.5">ANSYS Mechanical • Static Structural • Modal</div>
                </div>

                <div className="p-3 rounded-lg bg-lab-900 border border-lab-border">
                  <div className="text-slate-400 text-[11px]">COMPUTATIONAL FLUID DYNAMICS</div>
                  <div className="text-slate-100 font-semibold mt-0.5">ANSYS Fluent • Internal/External Flow • Thermal</div>
                </div>

                <div className="p-3 rounded-lg bg-lab-900 border border-lab-border">
                  <div className="text-slate-400 text-[11px]">COMPUTATION &amp; AI</div>
                  <div className="text-slate-100 font-semibold mt-0.5">Python • SciPy • Scikit-Learn • Sensor FFT</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-glow font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Rigorous verification against engineering standards &amp; ASTM specs.</span>
            </div>
          </div>

        </div>

        {/* 6 Engineering Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-lab-850/80 p-6 rounded-xl border border-lab-border hover:border-cyan-500/40 transition-all duration-200 glass-panel-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-lab-900 border border-lab-border flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h4 className="font-display font-bold text-white text-base mb-2">
                {p.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

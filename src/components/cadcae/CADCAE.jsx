import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Box, Activity, Wind, Flame, Layers, Eye, Gauge, Compass, CheckCircle2 } from 'lucide-react';

const CAD_CAE_MODULES = [
  {
    id: 'solidworks-cad',
    title: 'SolidWorks 3D Parametric & Assembly Design',
    category: 'CAD MODELING',
    icon: <Box className="w-5 h-5 text-cyan-glow" />,
    badgeVariant: 'cyan',
    summary: 'Full-cycle mechanical modeling from preliminary sketch geometry to multi-component kinematic assemblies with tight tolerancing.',
    highlights: [
      'Parametric feature trees with structured equations and global design variables',
      'Top-down and bottom-up assembly architectures with dynamic kinematic mates',
      '2D manufacturing drawings compliant with ASME Y14.5M GD&T standards',
      'Interference detection, clearance verification, and mass properties estimation',
    ],
    technicalSpec: {
      'Standards Applied': 'ASME Y14.5M GD&T',
      'Modeling Type': 'Feature-Based Parametric',
      'Tolerance Method': 'Worst-Case & RSS Stackup',
      'Primary Tool': 'SolidWorks 2024',
    }
  },
  {
    id: 'ansys-fea',
    title: 'ANSYS Mechanical Structural & Modal FEA',
    category: 'STRUCTURAL CAE',
    icon: <Activity className="w-5 h-5 text-amber-400" />,
    badgeVariant: 'amber',
    summary: 'Finite element analysis to predict elastic deformation, von Mises stress distributions, and modal resonant frequencies under dynamic operational loads.',
    highlights: [
      'Second-order solid hexahedral and tetrahedral meshing with localized stress refinement',
      'Mesh convergence verification using Grid Convergence Index (GCI < 3%)',
      'Multi-axial static structural loading (bending, torsion, internal pressure)',
      'Modal analysis to identify first 6 natural mode shapes away from engine excitation',
    ],
    technicalSpec: {
      'Solvers': 'ANSYS MAPDL / Sparse Matrix',
      'Element Formulation': 'SOLID186 / SOLID187 (Higher Order)',
      'Convergence Metric': 'Roache GCI Method',
      'Failure Theory': 'Von Mises & Tresca Yield',
    }
  },
  {
    id: 'ansys-cfd',
    title: 'ANSYS Fluent Aerodynamics & Fluid Flow',
    category: 'CFD SIMULATION',
    icon: <Wind className="w-5 h-5 text-sky-400" />,
    badgeVariant: 'blue',
    summary: 'Computational fluid dynamics modeling of external aerodynamics, pressure loss across heat exchanger passages, and internal fluid mixing.',
    highlights: [
      'C-Grid and structured prism inflation layers resolving boundary layers (y+ ≈ 1)',
      'Coupled pressure-velocity solver with second-order upwind discretization schemes',
      'Turbulence closure using k-omega SST (Shear Stress Transport) model',
      'Extraction of lift/drag coefficients (CL, CD) and turbulent kinetic energy maps',
    ],
    technicalSpec: {
      'Governing Eqns': 'Incompressible Navier-Stokes',
      'Turbulence': 'k-omega SST (Menter)',
      'Near-Wall Grid': 'y+ <= 1 (Prism Inflation)',
      'Convergence': 'Residuals <= 1e-5',
    }
  },
  {
    id: 'thermal-analysis',
    title: 'Thermal Dissipation & Heat Transfer Modeling',
    category: 'THERMAL ANALYSIS',
    icon: <Flame className="w-5 h-5 text-rose-400" />,
    badgeVariant: 'rose',
    summary: 'Coupled thermal-fluid simulations for electronic enclosure heat sinks and industrial counter-flow tube bundles.',
    highlights: [
      'Conjugate Heat Transfer (CHT) modeling solid-fluid interface heat flux',
      'Natural vs. forced convection optimization for pin-fin heat sinks',
      'LMTD and Effectiveness-NTU thermodynamic verification',
      'Thermal stress evaluation under localized temperature gradients',
    ],
    technicalSpec: {
      'Analysis Type': 'Conjugate Heat Transfer (CHT)',
      'Boundary Modes': 'Conduction, Convection, Radiation',
      'Validation': 'LMTD & Effectiveness-NTU',
      'Primary Solver': 'ANSYS Fluent & Thermal',
    }
  }
];

export default function CADCAE() {
  const [activeTab, setActiveTab] = useState(CAD_CAE_MODULES[0].id);
  const currentModule = CAD_CAE_MODULES.find((m) => m.id === activeTab) || CAD_CAE_MODULES[0];

  return (
    <section id="cadcae" className="py-20 bg-lab-950 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-05"
          title="CAD &amp; CAE ENGINEERING SHOWCASE"
          subtitle="Precision SolidWorks parametric modeling, ANSYS structural FEA stress verification, and Fluent CFD aerodynamic flow simulations."
        />

        {/* Tab Selection Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {CAD_CAE_MODULES.map((mod) => {
            const isSelected = activeTab === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-lab-850 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-lab-900/60 border-lab-border hover:bg-lab-850 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {mod.icon}
                  <EngineeringBadge variant={mod.badgeVariant} size="xs">
                    {mod.category}
                  </EngineeringBadge>
                </div>
                <div className="font-display font-bold text-white text-sm leading-snug truncate">
                  {mod.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Detailed Showcase Card */}
        <div className="bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <EngineeringBadge variant={currentModule.badgeVariant}>
                    {currentModule.category}
                  </EngineeringBadge>
                  <span className="font-mono text-xs text-slate-400">
                    ENGINEERING METHODOLOGY
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {currentModule.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentModule.summary}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-cyan-glow font-bold uppercase tracking-wider mb-3">
                  // METHODOLOGICAL HIGHLIGHTS
                </div>
                <div className="space-y-2.5">
                  {currentModule.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-lab-900/80 border border-lab-border text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Specification Matrix */}
            <div className="lg:col-span-5 bg-lab-900 p-6 rounded-xl border border-lab-border space-y-4">
              <div className="font-mono text-xs text-cyan-glow font-bold uppercase flex items-center gap-2 pb-3 border-b border-lab-border">
                <Gauge className="w-4 h-4" />
                TECHNICAL SPECIFICATIONS // PARAMETERS
              </div>

              <div className="space-y-3">
                {Object.entries(currentModule.technicalSpec).map(([key, value], idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-lab-950 border border-lab-border">
                    <div className="font-mono text-[10px] uppercase text-slate-400">
                      {key}
                    </div>
                    <div className="font-mono font-bold text-white text-xs mt-0.5">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Validated against analytical first-principles and peer-reviewed benchmark datasets.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

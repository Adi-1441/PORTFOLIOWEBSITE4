import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Box, Activity, Wind, Cog, Microscope, Code, CheckCircle2, ChevronRight } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'cad',
    label: 'CAD & MECHANICAL DESIGN',
    shortLabel: 'CAD',
    icon: <Box className="w-4 h-4 text-cyan-glow" />,
    badgeVariant: 'cyan',
    description: '3D parametric geometry modeling, kinematic assemblies, and standard 2D engineering drawings with geometric dimensioning and tolerancing (GD&T).',
    skills: [
      'SolidWorks',
      'Parametric Modeling',
      'Assembly Design',
      'Engineering Drawing (2D/3D)',
      'Mechanical Design',
      'Design for Manufacturing (DFM)',
      'Interference & Clearance Checking',
      'GD&T & Tolerance Stack-Up',
    ],
    software: ['SolidWorks 2023/2024', 'AutoCAD', 'SolidWorks Simulation'],
  },
  {
    id: 'cae',
    label: 'CAE & FINITE ELEMENT ANALYSIS (FEA)',
    shortLabel: 'CAE / FEA',
    icon: <Activity className="w-4 h-4 text-amber-400" />,
    badgeVariant: 'amber',
    description: 'Structural and dynamic simulation to predict mechanical behavior, stress concentrations, natural frequencies, and safety factors under operating loads.',
    skills: [
      'ANSYS Mechanical',
      'Finite Element Analysis (FEA)',
      'Static Structural Analysis',
      'Thermal-Structural Coupling',
      'Modal & Natural Frequency Analysis',
      'Mesh Convergence & GCI Validation',
      'Boundary Condition Formulation',
      'Post-Processing & Stress Verification',
    ],
    software: ['ANSYS Workbench', 'ANSYS Mechanical', 'SpaceClaim'],
  },
  {
    id: 'cfd',
    label: 'CFD & THERMAL-FLUID SCIENCES',
    shortLabel: 'CFD / FLUIDS',
    icon: <Wind className="w-4 h-4 text-sky-400" />,
    badgeVariant: 'blue',
    description: 'Numerical modeling of internal and external fluid flows, convective heat transfer, boundary layer development, and pressure loss across geometries.',
    skills: [
      'CFD Fundamentals',
      'Fluid Flow Simulation',
      'Heat Transfer (Conduction, Convection)',
      'Flow Visualization & Vector Mapping',
      'Turbulence Modeling (k-epsilon, k-omega SST)',
      'Near-Wall Boundary Layer (y+ Resolution)',
      'Pressure Drop & Friction Factor Estimation',
    ],
    software: ['ANSYS Fluent', 'CFD-Post', 'Engineering Equation Solver (EES)'],
  },
  {
    id: 'manufacturing',
    label: 'MANUFACTURING & FABRICATION',
    shortLabel: 'MANUFACTURING',
    icon: <Cog className="w-4 h-4 text-slate-300" />,
    badgeVariant: 'default',
    description: 'Practical knowledge of subtractive machining, modern additive manufacturing, welding fabrication, and materials processing.',
    skills: [
      'Manufacturing Processes',
      'CNC Machining & G-Code Principles',
      'Additive Manufacturing (3D Printing / FDM)',
      'Machining & Turning Operations',
      'Welding & Sheet Metal Fabrication',
      'Tooling & Fixture Design',
      'Material Selection & Heat Treatment',
    ],
    software: ['Cura', 'PrusaSlicer', 'CNC Simulator'],
  },
  {
    id: 'research',
    label: 'RESEARCH & COMPOSITE MATERIALS',
    shortLabel: 'RESEARCH',
    icon: <Microscope className="w-4 h-4 text-emerald-400" />,
    badgeVariant: 'emerald',
    description: 'Experimental investigation of natural fiber reinforced polymer matrix biocomposites, chemical surface modifications, and standard ASTM mechanical characterization.',
    skills: [
      'Composite Materials',
      'Natural Fiber Reinforcements (Coconut, Areca)',
      'Sustainable Bio-materials',
      'Chemical Surface Modification (NaOH Mercerization)',
      'Tensile & Flexural Testing (ASTM D638 / D790)',
      'Scanning Electron Microscopy (SEM) Fractography',
      'Experimental Research & Data Synthesis',
    ],
    software: ['OriginLab', 'ImageJ (Microstructure Analysis)', 'MS Excel / SciPy'],
  },
  {
    id: 'programming',
    label: 'PROGRAMMING & AI × ENGINEERING',
    shortLabel: 'PROGRAMMING / AI',
    icon: <Code className="w-4 h-4 text-purple-400" />,
    badgeVariant: 'purple',
    description: 'Computational programming for numerical engineering methods, signal processing (FFT), and machine learning applications in predictive maintenance.',
    skills: [
      'Python for Engineering',
      'Java Fundamentals',
      'Machine Learning Regressors & Classifiers',
      'AI × Engineering Integration',
      'Vibration Signal Processing (FFT, Wavelets)',
      'NumPy, SciPy & Matplotlib',
      'Numerical Differential Equation Solvers',
    ],
    software: ['Python 3.x', 'Jupyter Notebooks', 'Scikit-Learn', 'VS Code'],
  },
];

export default function Skills() {
  const [selectedTab, setSelectedTab] = useState('cad');
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === selectedTab) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-20 bg-lab-950 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="SEC-02"
          title="ENGINEERING COMPETENCIES & TOOLKIT"
          subtitle="Categorized mechanical engineering competencies, computational CAE toolchains, and experimental methodologies."
        />

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-lab-800 text-cyan-glow border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-lab-900/80 text-slate-300 hover:text-white hover:bg-lab-850 border border-lab-border'
                }`}
              >
                {cat.icon}
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Detail Card */}
        <div className="bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-lab-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <EngineeringBadge variant={activeCategory.badgeVariant}>
                  {activeCategory.shortLabel}
                </EngineeringBadge>
                <span className="font-mono text-xs text-slate-400">
                  COMPETENCY MATRIX
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {activeCategory.label}
              </h3>
            </div>

            {/* Software Environment Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-400">TOOLS:</span>
              {activeCategory.software.map((sw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-lab-900 border border-lab-border text-xs font-mono text-slate-200"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {activeCategory.description}
          </p>

          {/* Skills Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-lab-900/90 border border-lab-border hover:border-cyan-500/30 transition-all flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-1 rounded bg-cyan-500/10 text-cyan-glow group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Categories Compact Overview Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedTab(cat.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedTab === cat.id
                  ? 'bg-lab-800 border-cyan-500/40 shadow-sm'
                  : 'bg-lab-900/50 border-lab-border/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {cat.icon}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="font-mono text-xs font-bold text-white truncate">
                {cat.shortLabel}
              </div>
              <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                {cat.skills.length} competencies
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

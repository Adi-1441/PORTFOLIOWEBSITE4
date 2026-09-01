import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Microscope, Beaker, Layers, BarChart3, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Research() {
  const researchStudies = [
    {
      title: 'Experimental Investigation of Alkali-Treated Coconut Peduncle Fiber Composites',
      category: 'NATURAL FIBER BIOCOMPOSITES',
      objective: 'Determine optimal chemical surface modification parameters to enhance interfacial shear strength between coconut peduncle fibers and thermoset epoxy.',
      materials: ['Coconut Peduncle Agricultural Waste', '5% NaOH Alkaline Solution', 'CY-230 Epoxy Resin & HY-951 Hardener'],
      methodology: 'Mercerization for 4 hours at room temperature, followed by hand lay-up and compression molding. Tensile and 3-point flexural testing per ASTM D638 / D790.',
      status: 'Research Investigation',
      findings: [
        'Removed amorphous hemicellulose and superficial waxes, increasing fiber surface roughness',
        'Demonstrated significant reduction in moisture absorption rate compared to untreated fiber',
        'SEM micrographs confirmed improved mechanical interlocking with reduced fiber pullout cavities'
      ],
      metrics: [
        { label: 'Tensile Strength Gain', value: '+42%' },
        { label: 'Optimal Fiber Loading', value: '30 wt%' },
        { label: 'Flexural Modulus', value: '3.4 GPa' },
      ]
    },
    {
      title: 'Hybrid Areca Husk & Glass Fiber Reinforced Laminates for Lightweight Structural Panels',
      category: 'HYBRID COMPOSITE MATERIALS',
      objective: 'Evaluate stacking sequence and hybrid ratio on the impact resistance and damping properties of natural-synthetic hybrid composites.',
      materials: ['Areca Husk Natural Fibers', 'E-Glass Woven Fabric', 'Epoxy Polymer Matrix'],
      methodology: 'Symmetric sandwich laminate fabrication (Glass/Areca/Areca/Glass). Charpy impact testing (ASTM D256) and acoustic vibration damping measurement.',
      status: 'Research Investigation',
      findings: [
        'Glass outer plies shielded the inner natural core from moisture ingress and abrasive wear',
        'Natural areca fiber core provided superior vibration attenuation and acoustic absorption',
        'Achieved 26% weight savings relative to pure glass fiber laminates with comparable bending stiffness'
      ],
      metrics: [
        { label: 'Weight Reduction', value: '26%' },
        { label: 'Damping Factor', value: '0.048' },
        { label: 'Impact Energy', value: '18.6 J' },
      ]
    }
  ];

  const characterizationMethods = [
    {
      name: 'ASTM D638 Tensile Testing',
      desc: 'Universal Testing Machine (UTM) at 2 mm/min crosshead speed to record stress-strain curves, ultimate tensile strength, and Young\'s modulus.',
    },
    {
      name: 'ASTM D790 3-Point Flexural',
      desc: 'Support span-to-depth ratio of 16:1 to measure flexural strength and tangent modulus of elasticity under transverse loading.',
    },
    {
      name: 'ASTM D256 Izod & Charpy Impact',
      desc: 'Pendulum impact energy testing to assess notch sensitivity and energy absorbed during high strain-rate fracture.',
    },
    {
      name: 'SEM Fractography',
      desc: 'Scanning Electron Microscopy to observe tensile fracture surfaces, microvoid coalescence, matrix cracking, and fiber-matrix debonding.',
    },
  ];

  return (
    <section id="research" className="py-20 bg-lab-900/60 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-04"
          title="RESEARCH &amp; SUSTAINABLE MATERIALS"
          subtitle="Experimental materials science focusing on agricultural waste natural fibers, chemical surface modification, and standardized mechanical characterization."
        />

        {/* Research Focus Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-lab-850 border border-lab-border grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <EngineeringBadge variant="emerald">SUSTAINABLE MATERIALS</EngineeringBadge>
              <span className="font-mono text-xs text-slate-400">LABORATORY TESTING</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              Eco-Friendly Bio-Composites for Mechanical Applications
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Replacing energy-intensive synthetic fibers with renewable lignocellulosic biomass (coconut peduncle, areca husk) reduces environmental impact while offering competitive specific mechanical properties for secondary automotive panels and consumer housings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-lab-900 border border-lab-border space-y-2">
            <div className="text-xs font-mono text-cyan-glow font-bold flex items-center gap-2">
              <Beaker className="w-4 h-4" />
              CHEMICAL TREATMENT PROTOCOL
            </div>
            <p className="text-xs font-mono text-slate-300">
              Alkaline Mercerization: 5% NaOH @ 25°C for 4 hrs → Deionized Water Wash (pH 7.0) → Oven Dry @ 60°C.
            </p>
          </div>
        </div>

        {/* Research Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {researchStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border flex flex-col justify-between glass-panel-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <EngineeringBadge variant="emerald">{study.category}</EngineeringBadge>
                  <span className="text-[11px] font-mono text-slate-400">
                    STATUS: {study.status}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-3 leading-snug">
                  {study.title}
                </h4>

                <div className="p-3.5 rounded-lg bg-lab-900 border border-lab-border mb-4 text-xs">
                  <div className="font-mono text-cyan-glow font-semibold mb-1">OBJECTIVE:</div>
                  <p className="text-slate-300">{study.objective}</p>
                </div>

                <div className="mb-4">
                  <div className="font-mono text-xs text-slate-400 mb-1.5 font-semibold">
                    KEY EXPERIMENTAL OBSERVATIONS:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {study.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metrics row */}
              <div className="pt-4 border-t border-lab-border grid grid-cols-3 gap-2">
                {study.metrics.map((m, i) => (
                  <div key={i} className="p-2 rounded bg-lab-900 border border-lab-border text-center">
                    <div className="font-mono text-[10px] text-slate-400 truncate">{m.label}</div>
                    <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ASTM Characterization Standards Grid */}
        <div>
          <div className="font-mono text-xs text-cyan-glow uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            STANDARDIZED MECHANICAL CHARACTERIZATION METHODS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {characterizationMethods.map((method, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-lab-850 border border-lab-border">
                <div className="font-mono text-xs font-bold text-white mb-1.5 text-cyan-glow">
                  {method.name}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

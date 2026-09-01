import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Cpu, Activity, Zap, Wind, AlertTriangle, CheckCircle2, Sliders, LineChart } from 'lucide-react';

export default function AIEngineering() {
  const aiApplications = [
    {
      title: 'CNC End-Milling Tool Wear ($VB_{max}$) Prediction',
      icon: <Activity className="w-5 h-5 text-purple-400" />,
      domain: 'SMART MANUFACTURING',
      problem: 'Tool flank wear progression during high-speed machining can cause unexpected tool breakage and surface finish degradation.',
      approach: 'Extracting time-frequency statistical features (RMS, Kurtosis, FFT Spectral Power) from 50 kHz tri-axial accelerometer vibration telemetry to train Gradient Boosting and Random Forest regression models.',
      engineeringInput: 'Vibration Signal Telemetry • Spindle Motor Current • Cut Depth & Feed Rate',
      outputMetric: 'Flank Wear Width (VB) Estimation • Proactive Tool Replacement Threshold',
    },
    {
      title: 'EV Lithium-Ion Battery State of Health (SOH) Estimation',
      icon: <Zap className="w-5 h-5 text-cyan-glow" />,
      domain: 'ELECTRO-THERMAL DYNAMICS',
      problem: 'Non-linear capacity degradation in lithium-ion battery packs depends strongly on operational temperature gradients and charge-discharge cycling rates.',
      approach: 'Leveraging incremental capacity analysis (ICA) peak tracking and neural network regression to estimate battery degradation without intrusive destructive testing.',
      engineeringInput: 'Voltage-Current Time Series • Surface Thermocouple Telemetry • Coulombic Efficiency',
      outputMetric: 'Remaining Useful Life (RUL) • Capacity Fade Trajectory (%)',
    },
    {
      title: 'Wind Turbine Drive Train Anomaly & Fault Diagnosis',
      icon: <Wind className="w-5 h-5 text-sky-400" />,
      domain: 'ROTATING MACHINERY',
      problem: 'Early-stage bearing spalling and gear tooth pitting in remote offshore wind turbines lead to high downtime costs if not detected ahead of catastrophic failure.',
      approach: 'Envelope demodulation and Wavelet Transform filtering on vibration signals combined with Support Vector Machines (SVM) for early fault classification.',
      engineeringInput: 'High-Frequency Vibration Sensors • SCADA Shaft RPM • Oil Temperature',
      outputMetric: 'Bearing Outer/Inner Race Fault Detection • Anomaly Severity Index',
    },
    {
      title: 'Industrial Hydraulic Predictive Maintenance & Cavitation Detection',
      icon: <Sliders className="w-5 h-5 text-amber-400" />,
      domain: 'FLUID POWER SYSTEMS',
      problem: 'Cavitation erosion in high-pressure hydraulic positive-displacement pumps reduces volumetric efficiency and degrades seal integrity.',
      approach: 'Acoustic emission sensor processing and unsupervised anomaly detection (Isolation Forests) to recognize cavitation noise signatures under fluctuating pump loads.',
      engineeringInput: 'Acoustic Emission (AE) Signals • Pressure Transducer Telemetry • Fluid Viscosity',
      outputMetric: 'Cavitation Severity Alert • Preventive Fluid Conditioning Schedule',
    }
  ];

  return (
    <section id="ai-engineering" className="py-20 bg-lab-900/60 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <SectionHeading
          code="SEC-07"
          title="AI × MECHANICAL ENGINEERING"
          subtitle="Applying machine learning, signal processing (FFT), and numerical computing to physical sensor telemetry and predictive maintenance."
        />

        {/* Philosophy Intro */}
        <div className="p-6 rounded-2xl bg-lab-850 border border-lab-border mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <EngineeringBadge variant="purple">PHYSICS-INFORMED COMPUTATION</EngineeringBadge>
              <span className="font-mono text-xs text-slate-400">ANALYTICS // SENSORS</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Machine Learning as an Engineering Tool, Rooted in Mechanics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Rather than treating models as black boxes, our focus is physics-informed feature engineering: mapping accelerometer vibrations to mechanical tooth passing frequencies, heat transfer equations to thermal dissipation gradients, and stress cycles to fatigue life.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-lab-900 border border-lab-border font-mono text-xs text-cyan-glow shrink-0 space-y-1">
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              <span>FFT FREQUENCY DOMAIN</span>
            </div>
            <div className="text-[11px] text-slate-400">
              f_tp = (N · z) / 60 | RMS, Kurtosis, Crest Factor
            </div>
          </div>
        </div>

        {/* 4 Application Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiApplications.map((app, idx) => (
            <div
              key={idx}
              className="bg-lab-850 p-6 rounded-2xl border border-lab-border hover:border-purple-500/40 transition-all flex flex-col justify-between glass-panel-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-lab-900 border border-lab-border">
                      {app.icon}
                    </div>
                    <EngineeringBadge variant="purple" size="xs">
                      {app.domain}
                    </EngineeringBadge>
                  </div>
                </div>

                <h4 className="text-lg font-display font-bold text-white mb-3">
                  {app.title}
                </h4>

                <div className="space-y-3 mb-4 text-xs">
                  <div className="p-3 rounded-lg bg-lab-900/90 border border-lab-border">
                    <div className="font-mono text-amber-400 font-bold mb-1">
                      MECHANICAL PROBLEM:
                    </div>
                    <p className="text-slate-300 leading-relaxed">{app.problem}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-lab-900/90 border border-lab-border">
                    <div className="font-mono text-cyan-glow font-bold mb-1">
                      COMPUTATIONAL APPROACH:
                    </div>
                    <p className="text-slate-300 leading-relaxed">{app.approach}</p>
                  </div>
                </div>
              </div>

              {/* Input / Output Tags */}
              <div className="pt-4 border-t border-lab-border space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-500">INPUT:</span>
                  <span className="text-slate-200 truncate">{app.engineeringInput}</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-glow">
                  <span className="text-slate-500">OUTPUT:</span>
                  <span className="text-cyan-accent truncate">{app.outputMetric}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

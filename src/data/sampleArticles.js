/**
 * Sample Technical Engineering Articles
 * Clearly identified technical discussions on CAD, FEA, CFD, Materials, and AI.
 */

export const sampleArticles = [
  {
    id: 'art-01',
    title: 'Understanding Mesh Convergence in Structural FEA: GCI and Richardson Extrapolation',
    category: 'CAE / FEA',
    date: '2024-04-12',
    readTime: '6 min read',
    summary: 'A structured breakdown of why element refinement matters and how to mathematically prove that your Finite Element simulation is independent of mesh density.',
    tags: ['FEA', 'Mesh Convergence', 'ANSYS', 'Verification & Validation'],
    content: `When conducting Finite Element Analysis (FEA), the accuracy of stress and displacement results depends directly on mesh resolution. However, arbitrarily refining the mesh across the entire geometry leads to unnecessary computational overhead without guaranteed convergence.

Key Engineering Principles:
1. **Stress Singularity vs. Stress Concentration**: Distinguishing between re-entrant sharp corners (which exhibit artificial infinite stress with mesh refinement) and physical fillets with real stress peaks.
2. **Grid Convergence Index (GCI)**: Applying Roache's GCI method across three systematically refined mesh levels ($r = h_2/h_1 \\approx 1.3$) to evaluate the asymptotic range of convergence.
3. **Element Quality Metrics**: Maintaining Jacobian ratio > 0.6, skewness < 0.7, and aspect ratios within acceptable bounds for critical load-bearing regions.`
  },
  {
    id: 'art-02',
    title: 'Surface Modification of Natural Fibers: Alkaline Treatment for Enhanced Biocomposites',
    category: 'MATERIALS & RESEARCH',
    date: '2024-08-19',
    readTime: '8 min read',
    summary: 'Examining the chemical mechanisms of NaOH mercerization on coconut peduncle and areca husk fibers to improve interfacial bonding with epoxy resin matrices.',
    tags: ['Natural Fibers', 'Composite Materials', 'Mercerization', 'SEM Fractography'],
    content: `Natural fibers derived from agricultural biomass offer high specific strength, low density, and biodegradability. However, raw lignocellulosic fibers contain waxes, pectin, and amorphous hemicellulose that hinder adhesion with synthetic thermoset resins.

Experimental Observations:
1. **Chemical Treatment**: Immersion in a 5% NaOH solution for 4 hours dissolves amorphous components, exposing crystalline cellulose microfibrils.
2. **Surface Roughness**: SEM imaging reveals enhanced surface topography, enabling superior mechanical interlocking with the surrounding polymer matrix.
3. **Tensile & Flexural Gains**: Composite laminates fabricated with optimized 30 wt% treated fibers show over 40% increase in ultimate tensile strength compared to untreated fiber counterparts.`
  },
  {
    id: 'art-03',
    title: 'Near-Wall Modeling in CFD: Resolving vs. Wall Functions ($y^+$ Selection)',
    category: 'CFD / FLUIDS',
    date: '2024-10-05',
    readTime: '7 min read',
    summary: 'A practical guide to calculating first layer height and selecting between standard wall functions and resolving the viscous sublayer ($y^+ < 1$) in turbulent flow.',
    tags: ['CFD', 'Turbulence', 'Boundary Layer', 'ANSYS Fluent'],
    content: `In wall-bounded turbulent flows, accurate prediction of boundary layer separation and skin friction drag hinges on near-wall mesh resolution.

Key Guidelines:
1. **The Viscous Sublayer ($y^+ < 5$)**: In flows with adverse pressure gradients, heat transfer prediction, or aerodynamic stall, the laminar sublayer must be resolved using $y^+ \\approx 1$ and prism inflation layers with gentle growth ratios ($1.15 - 1.2$).
2. **Log-Law Region ($30 < y^+ < 300$)**: For high Reynolds number industrial pipes or standard bluff-body flows where separation points are fixed by sharp edges, standard wall functions offer reliable results at a fraction of cell count.
3. **Turbulence Model Coupling**: Pairing $y^+ < 1$ with the $k\text{-}\omega$ SST model provides automatic blending from near-wall to freestream flow.`
  },
  {
    id: 'art-04',
    title: 'Integrating Vibration Telemetry with Machine Learning for CNC Tool Wear Prediction',
    category: 'AI × ENGINEERING',
    date: '2024-11-28',
    readTime: '9 min read',
    summary: 'How frequency-domain feature engineering from high-speed accelerometers enables predictive maintenance and prevents workpiece scrap in automated manufacturing.',
    tags: ['AI × Engineering', 'Predictive Maintenance', 'Vibration FFT', 'CNC Milling'],
    content: `Tool wear in machining operations directly influences surface roughness, dimensional tolerance, and spindle power consumption. 

Methodology:
1. **Sensor Fusion**: Mounting tri-axial piezoelectric accelerometers on the milling spindle housing to capture transient cutting impact dynamics at 50 kHz.
2. **Feature Extraction**: Computing statistical metrics (RMS, Kurtosis, Skewness) along with Fast Fourier Transform (FFT) spectral energy bands corresponding to tooth passing frequencies ($f_{tp} = N \\cdot z / 60$).
3. **Predictive Modeling**: Training Gradient Boosting and Random Forest regressors to estimate flank wear width ($VB_{max}$), providing proactive warnings before catastrophic tool failure occurs.`
  }
];

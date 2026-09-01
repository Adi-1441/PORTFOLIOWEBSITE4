/**
 * Initial Sample Engineering Projects
 * These are realistic Mechanical Engineering projects provided as initial demonstration.
 * They are seeded ONCE into IndexedDB and can be fully edited, deleted, or replaced.
 */

// Helper to create high-tech CAD SVG blueprint graphics for initial projects
function createCadSvgDataUrl(title, subtitle, type = 'cad') {
  const isCfd = type === 'cfd';
  const isFea = type === 'fea';
  const isMaterial = type === 'material';
  const isAi = type === 'ai';

  let accentColor = '#00F0FF';
  let badgeColor = '#2563EB';
  if (isCfd) { accentColor = '#38BDF8'; badgeColor = '#0284C7'; }
  if (isFea) { accentColor = '#F59E0B'; badgeColor = '#D97706'; }
  if (isMaterial) { accentColor = '#10B981'; badgeColor = '#059669'; }
  if (isAi) { accentColor = '#A855F7'; badgeColor = '#7C3AED'; }

  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070C18"/>
      <stop offset="100%" stop-color="#0F1A30"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-width="0.75" stroke-opacity="0.15"/>
      <circle cx="0" cy="0" r="1.5" fill="${accentColor}" fill-opacity="0.3"/>
    </pattern>
    <linearGradient id="contour" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="30%" stop-color="#06B6D4"/>
      <stop offset="60%" stop-color="#10B981"/>
      <stop offset="85%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect width="800" height="500" fill="url(#grid)"/>
  
  <!-- Outer CAD border -->
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-opacity="0.4"/>
  <rect x="28" y="28" width="744" height="444" fill="none" stroke="${accentColor}" stroke-width="0.5" stroke-dasharray="4 4" stroke-opacity="0.3"/>
  
  <!-- Corner Crosshairs -->
  <path d="M 12 20 L 28 20 M 20 12 L 20 28" stroke="${accentColor}" stroke-width="2"/>
  <path d="M 772 20 L 788 20 M 780 12 L 780 28" stroke="${accentColor}" stroke-width="2"/>
  <path d="M 12 480 L 28 480 M 20 472 L 20 488" stroke="${accentColor}" stroke-width="2"/>
  <path d="M 772 480 L 788 480 M 780 472 L 780 488" stroke="${accentColor}" stroke-width="2"/>

  <!-- Technical drawing geometry -->
  ${isFea ? `
    <!-- FEA Stress Contour Map -->
    <path d="M 150 160 Q 300 120 450 170 T 650 150 L 620 320 Q 420 360 280 310 Z" fill="url(#contour)" opacity="0.85"/>
    <path d="M 150 160 L 650 150 L 620 320 L 170 320 Z" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="8 4"/>
    <text x="640" y="220" fill="#EF4444" font-family="monospace" font-size="12">Max: 312.4 MPa</text>
    <text x="140" y="340" fill="#3B82F6" font-family="monospace" font-size="12">Min: 18.2 MPa</text>
  ` : isCfd ? `
    <!-- CFD Flow streamlines -->
    <path d="M 100 200 C 250 140, 450 140, 700 210" stroke="#00F0FF" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 100 240 C 260 210, 420 200, 700 240" stroke="#38BDF8" stroke-width="2.5" fill="none"/>
    <path d="M 100 270 C 280 300, 440 290, 700 270" stroke="#0284C7" stroke-width="2" fill="none"/>
    <ellipse cx="360" cy="240" rx="140" ry="40" fill="#16233F" stroke="#00F0FF" stroke-width="2"/>
    <text x="400" y="130" fill="#38BDF8" font-family="monospace" font-size="12">Velocity Vectors (v = 45 m/s)</text>
  ` : isMaterial ? `
    <!-- Fiber Composite Microstructure -->
    <rect x="200" y="130" width="400" height="220" rx="8" fill="#0B1324" stroke="#10B981" stroke-width="2"/>
    <line x1="230" y1="170" x2="570" y2="170" stroke="#10B981" stroke-width="6" stroke-dasharray="30 15" stroke-linecap="round"/>
    <line x1="230" y1="210" x2="570" y2="210" stroke="#34D399" stroke-width="8" stroke-dasharray="45 20" stroke-linecap="round"/>
    <line x1="230" y1="250" x2="570" y2="250" stroke="#059669" stroke-width="5" stroke-dasharray="25 10" stroke-linecap="round"/>
    <line x1="230" y1="290" x2="570" y2="290" stroke="#10B981" stroke-width="7" stroke-dasharray="35 15" stroke-linecap="round"/>
    <text x="240" y="330" fill="#34D399" font-family="monospace" font-size="12">ASTM D638 Tensile Specimen Cross-Section</text>
  ` : isAi ? `
    <!-- AI Vibration & Tool Wear Neural Waveform -->
    <path d="M 120 250 Q 180 120 240 250 T 360 250 T 480 250 T 600 250 T 680 250" fill="none" stroke="#A855F7" stroke-width="3"/>
    <path d="M 120 250 Q 150 180 180 250 T 240 250 T 300 250 T 360 250 T 420 250 T 480 250 T 540 250 T 600 250 T 660 250" fill="none" stroke="#00F0FF" stroke-width="1.5" opacity="0.6"/>
    <circle cx="240" cy="250" r="6" fill="#A855F7"/>
    <circle cx="360" cy="250" r="6" fill="#A855F7"/>
    <circle cx="480" cy="250" r="6" fill="#A855F7"/>
    <circle cx="600" cy="250" r="6" fill="#A855F7"/>
    <text x="300" y="130" fill="#C084FC" font-family="monospace" font-size="12">FFT Frequency Spectrum &amp; Degradation Regression</text>
  ` : `
    <!-- CAD Gear & Shaft Isometric Geometry -->
    <circle cx="400" cy="235" r="100" fill="none" stroke="#00F0FF" stroke-width="2.5" stroke-dasharray="6 3"/>
    <circle cx="400" cy="235" r="50" fill="#16233F" stroke="#38BDF8" stroke-width="2"/>
    <circle cx="400" cy="235" r="22" fill="#070C18" stroke="#00F0FF" stroke-width="1.5"/>
    <line x1="280" y1="235" x2="520" y2="235" stroke="#00F0FF" stroke-width="1" stroke-dasharray="8 4"/>
    <line x1="400" y1="115" x2="400" y2="355" stroke="#00F0FF" stroke-width="1" stroke-dasharray="8 4"/>
    <text x="410" y="160" fill="#00F0FF" font-family="monospace" font-size="11">R100 PCD</text>
  `}

  <!-- Header & Meta Overlay -->
  <rect x="40" y="38" width="120" height="24" rx="4" fill="${badgeColor}" fill-opacity="0.3" stroke="${accentColor}" stroke-width="1"/>
  <text x="50" y="54" fill="${accentColor}" font-family="monospace" font-weight="bold" font-size="11">CAD // MODEL</text>

  <text x="40" y="425" fill="#F8FAFC" font-family="sans-serif" font-weight="bold" font-size="22">${title}</text>
  <text x="40" y="450" fill="#94A3B8" font-family="monospace" font-size="13">${subtitle}</text>

  <!-- Technical watermark -->
  <text x="590" y="55" fill="#475569" font-family="monospace" font-size="11">ENG-SPEC // REV 3.2</text>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const sampleProjects = [
  {
    id: 'proj-sample-01',
    isSample: true,
    title: 'Shell and Tube Heat Exchanger Thermal & Mechanical Design',
    category: 'CAD DESIGN',
    year: '2024',
    role: 'Lead CAD & Thermal Modeler',
    status: 'Completed',
    description: 'Complete 3D parametric CAD modeling and thermal-hydraulic design of a BEM-type shell and tube heat exchanger compliant with TEMA and ASME Section VIII standards.',
    objective: 'Design a highly efficient counter-flow industrial heat exchanger to cool oil from 110°C to 55°C using treated cooling water, minimizing pressure drop across baffles.',
    problem: 'Excessive thermal gradients in the tube sheet caused localized thermal stresses exceeding material yield limits, and flow recirculation occurred near inlet nozzles.',
    solution: 'Engineered a staggered 30° triangular pitch tube arrangement with segmented 25% cut segmental baffles and added impingement baffle plates to dissipate kinetic energy at the shell inlet.',
    methodology: 'Iterative thermodynamic calculations using LMTD and NTU methods, followed by full 3D CAD modeling in SolidWorks and boundary verification.',
    tools: ['SolidWorks', 'TEMA Standards', 'ASME Sec VIII', 'Engineering Equation Solver (EES)'],
    skills: ['CAD Modeling', 'Thermal Design', 'ASME Standards', 'DFM', 'Pressure Vessel Design'],
    features: [
      'Parametric tube sheet layout with 144 seamless carbon steel tubes (19.05 mm OD)',
      'Segmental baffle plates with optimized 200 mm pitch for enhanced turbulent mixing',
      'Removable channel cover with bolted flange connections for easy tube-side cleaning',
      'ASME Section VIII Div 1 weld joint and shell thickness verification'
    ],
    results: 'Achieved overall heat transfer coefficient (U) of 620 W/m²·K with shell-side pressure drop strictly under 38 kPa, meeting industrial thermal duty requirements.',
    outcome: 'Produced a fully detailed fabrication drawing package with BOM and manufacturing tolerances ready for CNC drilling of tube sheets.',
    links: [
      { label: 'Technical Report Overview', url: '#' }
    ],
    images: [
      {
        id: 'img-he-01',
        name: 'heat-exchanger-isometric-cad.svg',
        dataUrl: createCadSvgDataUrl('Shell & Tube Heat Exchanger', 'SolidWorks CAD Assembly // TEMA Class R', 'cad'),
        isCover: true,
      },
      {
        id: 'img-he-02',
        name: 'baffle-tube-bundle-detail.svg',
        dataUrl: createCadSvgDataUrl('Baffle & Tube Bundle Subassembly', 'Segmental Baffle Spacing // Pitch 200mm', 'cad'),
        isCover: false,
      }
    ],
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date('2024-03-15').toISOString(),
  },
  {
    id: 'proj-sample-02',
    isSample: true,
    title: 'Two-Stage Epicyclic Planetary Gearbox Assembly',
    category: 'CAD DESIGN',
    year: '2024',
    role: 'Mechanical CAD Designer',
    status: 'Completed',
    description: 'High-torque density 2-stage planetary gear train designed in SolidWorks with AGMA standard tooth profile generation, splined shafts, and tapered roller bearings.',
    objective: 'Create a compact, high-reduction mechanical transmission (reduction ratio 25:1) capable of transmitting 15 kW input power with minimal backlash.',
    problem: 'Standard spur gears in conventional gearboxes produced excessive volume and unbalanced radial shaft loads for the target industrial envelope.',
    solution: 'Adopted an epicyclic layout with 3 planet gears per stage sharing tangential loads symmetrically, incorporating 20° pressure angle involute profiles with profile shift.',
    methodology: 'Computed AGMA bending and contact stress equations, modeled parametric spur and ring gears with interference detection, and simulated kinematic motion.',
    tools: ['SolidWorks', 'AGMA Standards', 'KISSsoft', 'Motion Simulation'],
    skills: ['Kinematic Assembly', 'Gear Geometry', 'Interference Checking', 'GD&T', 'Bearing Selection'],
    features: [
      'Stage 1 Sun gear (20 teeth) meshing with 3 Planet gears (40 teeth) and internal Ring gear',
      'Integrated splined output carrier for direct high-torque coupling',
      'Housing designed with labyrinth seals and oil splash lubrication channels',
      'Full tolerance stack-up analysis ensuring zero mechanical binding under thermal expansion'
    ],
    results: 'Reduced overall transmission weight by 38% compared to equivalent multistage helical systems while maintaining gear safety factor > 1.6.',
    outcome: 'Complete 3D SolidWorks assembly with dynamic kinematic motion analysis and detailed exploded assembly views.',
    links: [],
    images: [
      {
        id: 'img-gear-01',
        name: 'planetary-gearbox-cad.svg',
        dataUrl: createCadSvgDataUrl('Planetary Gearbox Assembly', 'SolidWorks 3D Assembly // 25:1 Reduction Ratio', 'cad'),
        isCover: true,
      }
    ],
    createdAt: new Date('2024-05-10').toISOString(),
    updatedAt: new Date('2024-05-10').toISOString(),
  },
  {
    id: 'proj-sample-03',
    isSample: true,
    title: 'Static Structural & Modal FEA of FSAE Suspension Upright',
    category: 'CAE / FEA',
    year: '2024',
    role: 'FEA & Simulation Analyst',
    status: 'Completed',
    description: 'Finite Element Analysis and topological lightweighting of an aircraft-grade Aluminum 7075-T6 front wheel upright under combined cornering and braking load cases.',
    objective: 'Optimize suspension upright stiffness-to-weight ratio while ensuring von Mises stresses remain well below material yield under 3G bump and 2G cornering loads.',
    problem: 'Initial billet upright design had excess mass (920g) with localized stress concentrations around upper control arm spherical bearing mounts.',
    solution: 'Applied topology optimization to remove non-load bearing material, followed by refined hexahedral meshing in ANSYS Mechanical with bonded contact definitions.',
    methodology: 'Constructed combined multi-axial load matrices from vehicle dynamics simulations. Performed static structural FEA followed by modal analysis (first 6 modes).',
    tools: ['ANSYS Mechanical', 'SolidWorks', 'SpaceClaim', 'FEA Post-Processing'],
    skills: ['FEA', 'Structural Analysis', 'Mesh Convergence', 'Topology Optimization', 'Modal Dynamics'],
    features: [
      'Multi-body load case: 3G Bump + 2.0G Lateral Cornering + 1.5G Braking',
      'Second-order solid tetrahedral and hex-dominant mesh with local edge refinement',
      'Mesh convergence validation (Grid Convergence Index < 3%)',
      'Natural frequency analysis ensuring first resonant mode > 180 Hz away from engine excitation'
    ],
    results: 'Reduced component mass from 920g to 540g (41% mass reduction) with maximum von Mises stress of 248 MPa (Safety Factor 1.98 against 7075-T6 yield).',
    outcome: 'Validated CAD model approved for 5-axis CNC machining with verified fatigue life exceeding race season requirements.',
    links: [],
    images: [
      {
        id: 'img-fea-01',
        name: 'suspension-upright-fea.svg',
        dataUrl: createCadSvgDataUrl('FSAE Upright FEA Stress Map', 'ANSYS Mechanical // Von Mises Stress 248 MPa', 'fea'),
        isCover: true,
      }
    ],
    createdAt: new Date('2024-07-22').toISOString(),
    updatedAt: new Date('2024-07-22').toISOString(),
  },
  {
    id: 'proj-sample-04',
    isSample: true,
    title: 'Aerodynamic Flow & Vortex Shedding Over NACA 0012 Airfoil',
    category: 'CFD / FLUIDS',
    year: '2024',
    role: 'CFD Simulation Modeler',
    status: 'Completed',
    description: '2D/3D computational fluid dynamics simulation analyzing boundary layer transition, pressure distribution, and stall characteristics across angles of attack from 0° to 18°.',
    objective: 'Investigate aerodynamic lift and drag coefficients ($C_L$, $C_D$) and capture unsteady trailing-edge vortex shedding in post-stall regimes.',
    problem: 'Predicting laminar separation bubbles and stall onset angle accurately requires fine near-wall boundary layer resolution and appropriate turbulence modeling.',
    solution: 'Constructed a C-grid domain with structured inflation layers achieving $y^+ < 1$ and employed the $k\text{-}\omega$ SST (Shear Stress Transport) turbulence model in ANSYS Fluent.',
    methodology: 'Generated structured mesh in ICEM/Fluent Meshing. Ran steady-state RANS simulations followed by transient DES (Detached Eddy Simulation) at stall.',
    tools: ['ANSYS Fluent', 'CFD Post', 'ICEM CFD', 'Python Plotting'],
    skills: ['CFD', 'Turbulence Modeling', 'Boundary Layer Theory', 'Mesh Generation', 'Fluid Mechanics'],
    features: [
      'C-type computational domain extending 20 chord lengths downstream',
      'Prism inflation layers with 1.15 growth ratio for resolving laminar sublayer',
      'Angle of attack sweep from $\\alpha = 0^\\circ$ to $\\alpha = 18^\\circ$ at $\\text{Re} = 3 \\times 10^6$',
      'Comparison of computed pressure coefficient $C_p$ against NASA wind tunnel validation data'
    ],
    results: 'Predicted stall angle at $\\alpha = 15.2^\\circ$ with $C_{L,max} = 1.54$, closely matching NASA experimental wind tunnel benchmark within 2.8% error.',
    outcome: 'Detailed flow visualization maps displaying pressure contours, velocity streamlines, and turbulent kinetic energy distribution.',
    links: [],
    images: [
      {
        id: 'img-cfd-01',
        name: 'airfoil-cfd-streamlines.svg',
        dataUrl: createCadSvgDataUrl('NACA 0012 CFD Simulation', 'ANSYS Fluent // Velocity Streamlines & Vortex Shedding', 'cfd'),
        isCover: true,
      }
    ],
    createdAt: new Date('2024-09-05').toISOString(),
    updatedAt: new Date('2024-09-05').toISOString(),
  },
  {
    id: 'proj-sample-05',
    isSample: true,
    title: 'Mechanical Characterization of Coconut Peduncle & Areca Natural Fiber Composites',
    category: 'RESEARCH & MATERIALS',
    year: '2024',
    role: 'Materials Research Investigator',
    status: 'In Progress',
    description: 'Experimental study on the mechanical, flexural, and water absorption characteristics of alkali-treated natural fiber reinforced epoxy biocomposites.',
    objective: 'Evaluate the feasibility of using agricultural waste fibers (coconut peduncle and areca husk) as eco-friendly reinforcements for lightweight automotive panels.',
    problem: 'Untreated natural fibers have hydrophilic surfaces with waxes and pectin that cause poor interfacial adhesion with hydrophobic epoxy matrices, leading to premature delamination.',
    solution: 'Subjected raw fibers to 5% NaOH chemical alkaline treatment to remove hemicellulose and increase surface roughness for superior mechanical interlocking.',
    methodology: 'Fabricated composite laminates using compression molding with varying fiber volume fractions (15%, 25%, 35% wt). Conducted tensile, flexural, and impact tests according to ASTM standards.',
    tools: ['Universal Testing Machine (UTM)', 'Izod Impact Tester', 'SEM Microscopy', 'ASTM D638 / D790'],
    skills: ['Composite Materials', 'Natural Fibers', 'Mechanical Testing', 'Material Characterization', 'Experimental Research'],
    features: [
      'Alkaline (5% NaOH) chemical surface modification of coconut peduncle fibers',
      'Compression molding fabrication at 70°C with controlled curing cycle',
      'Tensile testing per ASTM D638 and 3-point flexural testing per ASTM D790',
      'Scanning Electron Microscopy (SEM) fractography to analyze fiber pullout and matrix failure'
    ],
    results: 'Treated 30 wt% fiber composites demonstrated 44% improvement in tensile strength and 38% increase in flexural modulus over untreated specimens.',
    outcome: 'Established baseline mechanical property database identifying optimal fiber loading for sustainable engineering applications.',
    links: [],
    images: [
      {
        id: 'img-mat-01',
        name: 'composite-tensile-specimen.svg',
        dataUrl: createCadSvgDataUrl('Natural Fiber Composite Research', 'ASTM D638 Tensile & Flexural Characterization', 'material'),
        isCover: true,
      }
    ],
    createdAt: new Date('2024-11-12').toISOString(),
    updatedAt: new Date('2024-11-12').toISOString(),
  },
  {
    id: 'proj-sample-06',
    isSample: true,
    title: 'AI-Based Tool Wear & Flank Degradation Prediction in CNC Milling',
    category: 'AI × ENGINEERING',
    year: '2024',
    role: 'Engineering AI Researcher',
    status: 'Completed',
    description: 'Machine learning framework utilizing high-frequency accelerometer vibration data and spindle current signals to predict cutting tool flank wear ($VB_{max}$) in real time.',
    objective: 'Develop an intelligent predictive maintenance system to forecast end-mill tool wear and prevent catastrophic tool breakage during high-speed machining.',
    problem: 'Conventional schedule-based tool replacement causes premature tool disposal (increasing costs by 20%) or delayed replacement resulting in damaged workpieces.',
    solution: 'Extracted time-domain, frequency-domain (FFT), and wavelet packet features from tri-axial vibration signals and trained a Gradient Boosting Regressor.',
    methodology: 'Acquired vibration signals during CNC milling of hardened alloy steel. Extracted statistical features (RMS, Kurtosis, Crest Factor) and trained predictive models.',
    tools: ['Python', 'Scikit-Learn', 'NumPy & SciPy', 'Signal Processing (FFT)', 'Matplotlib'],
    skills: ['AI × Engineering', 'Predictive Maintenance', 'Vibration Analysis', 'Signal Processing', 'Feature Engineering'],
    features: [
      'Feature extraction pipeline processing 50 kHz accelerometer telemetry',
      'Time-frequency domain analysis using Fast Fourier Transform and Power Spectral Density',
      'Ensemble machine learning model (XGBoost / Random Forest) with cross-validation',
      'Threshold alert system for proactive tool replacement recommendations'
    ],
    results: 'Achieved Mean Absolute Error (MAE) under $12.4\\,\\mu\\text{m}$ in predicting tool flank wear width $VB$, with $R^2 = 0.94$ across variable cutting speeds.',
    outcome: 'Demonstrated an end-to-end framework integrating mechanical sensor telemetry with computational ML for smart manufacturing.',
    links: [],
    images: [
      {
        id: 'img-ai-01',
        name: 'tool-wear-ai-prediction.svg',
        dataUrl: createCadSvgDataUrl('AI Tool Wear Prediction', 'Vibration FFT & Machine Learning Regression', 'ai'),
        isCover: true,
      }
    ],
    createdAt: new Date('2024-12-01').toISOString(),
    updatedAt: new Date('2024-12-01').toISOString(),
  }
];

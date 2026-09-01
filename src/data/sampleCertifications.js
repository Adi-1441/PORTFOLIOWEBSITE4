/**
 * Initial Sample Certifications & Credentials
 * These are clearly marked DEMO / SAMPLE items so the section is populated initially.
 * They are stored in IndexedDB and can be fully EDITED, REPLACED, or DELETED.
 * Once deleted, they will NEVER return upon refresh.
 */

function createCertSvgDataUrl(title, issuer, date) {
  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
  <defs>
    <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070C18"/>
      <stop offset="50%" stop-color="#0B1324"/>
      <stop offset="100%" stop-color="#0F1A30"/>
    </linearGradient>
    <pattern id="certGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00F0FF" stroke-width="0.5" stroke-opacity="0.1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="560" fill="url(#certBg)"/>
  <rect width="800" height="560" fill="url(#certGrid)"/>

  <!-- Ornate Technical Borders -->
  <rect x="25" y="25" width="750" height="510" fill="none" stroke="#1B2C4E" stroke-width="2"/>
  <rect x="35" y="35" width="730" height="490" fill="none" stroke="#00F0FF" stroke-width="1.2" stroke-opacity="0.4"/>
  <rect x="42" y="42" width="716" height="476" fill="none" stroke="#2563EB" stroke-width="0.6" stroke-dasharray="4 4" stroke-opacity="0.5"/>

  <!-- Header Seal -->
  <circle cx="400" cy="110" r="36" fill="#16233F" stroke="#00F0FF" stroke-width="2"/>
  <circle cx="400" cy="110" r="28" fill="none" stroke="#38BDF8" stroke-width="1" stroke-dasharray="3 2"/>
  <path d="M390 115 L400 95 L410 115 Z" fill="#00F0FF"/>
  <circle cx="400" cy="118" r="3" fill="#FFFFFF"/>

  <!-- Demo Notice Stamp -->
  <rect x="580" y="45" width="160" height="28" rx="4" fill="#EF4444" fill-opacity="0.2" stroke="#EF4444" stroke-width="1"/>
  <text x="660" y="64" fill="#EF4444" font-family="monospace" font-weight="bold" font-size="11" text-anchor="middle">SAMPLE DEMO CERTIFICATE</text>

  <!-- Certificate Content -->
  <text x="400" y="180" fill="#94A3B8" font-family="monospace" font-size="13" letter-spacing="4" text-anchor="middle">TECHNICAL CREDENTIAL // VERIFIED RECORD</text>
  <text x="400" y="225" fill="#F8FAFC" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">${title}</text>
  
  <text x="400" y="270" fill="#CBD5E1" font-family="sans-serif" font-size="15" text-anchor="middle">Awarded by</text>
  <text x="400" y="305" fill="#00F0FF" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">${issuer}</text>

  <line x1="200" y1="340" x2="600" y2="340" stroke="#1E3054" stroke-width="1.5"/>

  <text x="400" y="375" fill="#94A3B8" font-family="monospace" font-size="13" text-anchor="middle">Issue Date: ${date} • Digital Verification ID: #DEMO-CERT-VERIFIED</text>
  
  <!-- Technical Security Watermark -->
  <rect x="250" y="420" width="300" height="45" rx="6" fill="#0B1324" stroke="#2A4374" stroke-width="1"/>
  <text x="400" y="448" fill="#38BDF8" font-family="monospace" font-size="11" text-anchor="middle">STATUS: SAMPLE DEMO // EDIT OR REPLACE VIA PORTFOLIO</text>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const sampleCertifications = [
  {
    id: 'cert-sample-01',
    isSample: true,
    name: 'CSWA – Certified SOLIDWORKS Associate (Mechanical Design) [SAMPLE DEMO]',
    issuer: 'Dassault Systèmes [Demo Credential]',
    issueDate: '2024-02-10',
    expiryDate: '',
    credentialId: 'CSWA-DEMO-9823471',
    credentialUrl: 'https://www.solidworks.com',
    description: 'Demonstrated fundamental proficiency in 3D parametric part modeling, assembly creation, engineering drawing standards, and basic stress analysis in SolidWorks.',
    skills: ['SolidWorks', '3D CAD', 'Parametric Modeling', 'Engineering Drawing', 'Assembly Design'],
    file: {
      name: 'cswa-solidworks-demo-cert.svg',
      type: 'image/svg+xml',
      dataUrl: createCertSvgDataUrl('Certified SOLIDWORKS Associate (CSWA)', 'Dassault Systèmes', 'February 2024'),
      isPdf: false,
    },
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'cert-sample-02',
    isSample: true,
    name: 'ANSYS Mechanical FEA Certificate of Completion [SAMPLE DEMO]',
    issuer: 'ANSYS Innovation Courses [Demo Credential]',
    issueDate: '2024-06-18',
    expiryDate: '',
    credentialId: 'ANSYS-FEA-DEMO-4102',
    credentialUrl: 'https://innovationspace.ansys.com',
    description: 'Specialized training in structural finite element analysis, boundary condition formulation, mesh convergence strategies, and modal harmonic response modeling.',
    skills: ['ANSYS Mechanical', 'Finite Element Analysis (FEA)', 'Static Structural', 'Modal Analysis', 'Meshing'],
    file: {
      name: 'ansys-fea-demo-cert.svg',
      type: 'image/svg+xml',
      dataUrl: createCertSvgDataUrl('ANSYS Mechanical Structural FEA', 'ANSYS Innovation Space', 'June 2024'),
      isPdf: false,
    },
    createdAt: new Date('2024-06-18').toISOString(),
    updatedAt: new Date('2024-06-18').toISOString(),
  },
  {
    id: 'cert-sample-03',
    isSample: true,
    name: 'Computational Fluid Dynamics (CFD) Fundamentals [SAMPLE DEMO]',
    issuer: 'Engineering Simulation Academy [Demo Credential]',
    issueDate: '2024-08-25',
    expiryDate: '',
    credentialId: 'CFD-FUND-DEMO-7731',
    credentialUrl: '',
    description: 'Comprehensive study of Navier-Stokes governing equations, turbulence modeling (k-epsilon, k-omega SST), boundary layer resolution, and pressure-velocity coupling.',
    skills: ['CFD', 'Fluid Mechanics', 'ANSYS Fluent', 'Boundary Layer Theory', 'Turbulence Modeling'],
    file: {
      name: 'cfd-fundamentals-demo-cert.svg',
      type: 'image/svg+xml',
      dataUrl: createCertSvgDataUrl('Computational Fluid Dynamics Fundamentals', 'Simulation Academy', 'August 2024'),
      isPdf: false,
    },
    createdAt: new Date('2024-08-25').toISOString(),
    updatedAt: new Date('2024-08-25').toISOString(),
  },
  {
    id: 'cert-sample-04',
    isSample: true,
    name: 'Python for Engineering Computations & Data Analysis [SAMPLE DEMO]',
    issuer: 'Engineering Computing Institute [Demo Credential]',
    issueDate: '2024-10-14',
    expiryDate: '',
    credentialId: 'PY-MECH-DEMO-2094',
    credentialUrl: '',
    description: 'Applied Python programming for numerical methods, differential equations in heat transfer, finite difference simulations, and sensor telemetry analysis.',
    skills: ['Python', 'NumPy', 'SciPy', 'Matplotlib', 'Numerical Modeling'],
    file: {
      name: 'python-engineering-demo-cert.svg',
      type: 'image/svg+xml',
      dataUrl: createCertSvgDataUrl('Python for Engineering Computations', 'Computing Institute', 'October 2024'),
      isPdf: false,
    },
    createdAt: new Date('2024-10-14').toISOString(),
    updatedAt: new Date('2024-10-14').toISOString(),
  }
];

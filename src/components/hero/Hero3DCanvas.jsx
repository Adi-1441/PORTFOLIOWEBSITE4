import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, RotateCw, Layers, Sliders, Info, Zap } from 'lucide-react';
import ModelFallback from './ModelFallback';

// Check if WebGL is supported
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

// Procedural 3D Spur / Planetary Gear Component
function Gear3D({
  radius = 1,
  teeth = 16,
  thickness = 0.35,
  holeRadius = 0.3,
  color = '#00F0FF',
  metalness = 0.85,
  roughness = 0.25,
  wireframe = false,
  rotationSpeed = 0,
  position = [0, 0, 0],
}) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current && rotationSpeed !== 0) {
      groupRef.current.rotation.z += rotationSpeed * delta;
    }
  });

  // Generate teeth geometries
  const toothWidth = (Math.PI * 2 * radius) / (teeth * 2.2);
  const toothDepth = radius * 0.18;

  return (
    <group ref={groupRef} position={position}>
      {/* Main Gear Disc */}
      <mesh>
        <cylinderGeometry args={[radius, radius, thickness, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Gear Hub / Boss */}
      <mesh position={[0, thickness * 0.4, 0]}>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, thickness * 0.8, 24]} />
        <meshStandardMaterial
          color="#38BDF8"
          metalness={0.9}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Central Bore */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[holeRadius, holeRadius, thickness * 1.5, 24]} />
        <meshStandardMaterial color="#070C18" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Teeth Array */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i * Math.PI * 2) / teeth;
        const x = Math.cos(angle) * (radius + toothDepth * 0.4);
        const y = Math.sin(angle) * (radius + toothDepth * 0.4);

        return (
          <mesh
            key={i}
            position={[x, 0, y]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[toothWidth, thickness * 0.95, toothDepth]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
              wireframe={wireframe}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Planetary Assembly Group
function PlanetaryAssembly({ wireframe, speedFactor, exploded }) {
  const assemblyRef = useRef();
  const carrierRef = useRef();

  const zExplode = exploded ? 0.8 : 0;

  useFrame((_, delta) => {
    if (carrierRef.current) {
      carrierRef.current.rotation.y += 0.3 * speedFactor * delta;
    }
  });

  const sunRadius = 0.6;
  const planetRadius = 0.55;
  const orbitRadius = 1.25;
  const ringRadius = 1.95;

  return (
    <group ref={assemblyRef} rotation={[0.4, -0.3, 0]}>
      {/* Central Shaft */}
      <mesh position={[0, 0, -zExplode * 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2.8, 24]} />
        <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.15} wireframe={wireframe} />
      </mesh>

      {/* Sun Gear */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Gear3D
          radius={sunRadius}
          teeth={12}
          thickness={0.3}
          holeRadius={0.22}
          color="#00F0FF"
          rotationSpeed={-1.8 * speedFactor}
          wireframe={wireframe}
        />
      </group>

      {/* 3 Planetary Gears & Carrier */}
      <group ref={carrierRef} position={[0, 0, zExplode * 0.5]}>
        {[0, 1, 2].map((idx) => {
          const orbitAngle = (idx * Math.PI * 2) / 3;
          const px = Math.cos(orbitAngle) * orbitRadius;
          const py = Math.sin(orbitAngle) * orbitRadius;

          return (
            <group key={idx} position={[px, py, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <Gear3D
                radius={planetRadius}
                teeth={14}
                thickness={0.28}
                holeRadius={0.15}
                color="#38BDF8"
                rotationSpeed={1.2 * speedFactor}
                wireframe={wireframe}
              />
              {/* Planet Pin */}
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          );
        })}

        {/* Carrier Plate */}
        <mesh position={[0, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[orbitRadius * 1.15, orbitRadius * 1.15, 0.08, 3]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.4} wireframe={wireframe} />
        </mesh>
      </group>

      {/* Outer Ring Housing & Internal Teeth */}
      <group position={[0, 0, -zExplode * 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Ring Rim */}
        <mesh>
          <torusGeometry args={[ringRadius, 0.16, 16, 48]} />
          <meshStandardMaterial color="#1E3054" metalness={0.8} roughness={0.3} wireframe={wireframe} />
        </mesh>

        {/* Mounting Lugs */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * (ringRadius + 0.25), 0, Math.sin(rad) * (ringRadius + 0.25)]}>
              <boxGeometry args={[0.3, 0.2, 0.25]} />
              <meshStandardMaterial color="#00F0FF" metalness={0.8} roughness={0.2} wireframe={wireframe} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Error Boundary Wrapper for 3D Canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Hero3D WebGL context error, falling back to 2D Schematic:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Hero3DCanvas() {
  const [isSupported, setIsSupported] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('3d'); // '3d' | '2d'

  useEffect(() => {
    setIsSupported(isWebGLAvailable());
  }, []);

  if (!isSupported || activeTab === '2d') {
    return (
      <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px]">
        <ModelFallback isWireframe={wireframe} />
        {isSupported && (
          <button
            onClick={() => setActiveTab('3d')}
            className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 bg-lab-800 hover:bg-lab-700 text-cyan-glow border border-lab-border rounded flex items-center gap-1.5 transition-colors z-20"
          >
            <Zap className="w-3 h-3" /> SWITCH TO 3D RENDER
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] bg-lab-900/60 rounded-2xl border border-lab-border overflow-hidden glass-panel">
      {/* HUD Telemetry Overlay */}
      <div className="absolute top-3 left-4 z-10 font-mono text-[10px] text-cyan-glow/80 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
          <span className="font-bold tracking-wider">3D CAD ASSEMBLY // EPICYCLIC TRAIN</span>
        </div>
        <div className="text-slate-400 text-[9px]">
          RATIO: 3.5:1 • TORQUE DENSITY: 42 Nm/kg • AGMA Q10
        </div>
      </div>

      {/* Control Panel */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-lab-950/80 p-1.5 rounded-lg border border-lab-border backdrop-blur-md">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-2 py-1 text-[10px] font-mono rounded flex items-center gap-1 transition-all ${
            wireframe ? 'bg-cyan-500/20 text-cyan-glow border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title="Toggle Wireframe CAD Mode"
        >
          <Layers className="w-3 h-3" />
          <span>{wireframe ? 'SOLID' : 'WIREFRAME'}</span>
        </button>

        <button
          onClick={() => setExploded(!exploded)}
          className={`px-2 py-1 text-[10px] font-mono rounded flex items-center gap-1 transition-all ${
            exploded ? 'bg-cyan-500/20 text-cyan-glow border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title="Toggle Exploded CAD View"
        >
          <Sliders className="w-3 h-3" />
          <span>{exploded ? 'ASSEMBLED' : 'EXPLODED'}</span>
        </button>

        <button
          onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 0.5 : 1)}
          className="px-2 py-1 text-[10px] font-mono rounded text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          title="Cycle Rotation Speed"
        >
          <RotateCw className="w-3 h-3" />
          <span>{speed}x</span>
        </button>

        <button
          onClick={() => setActiveTab('2d')}
          className="px-2 py-1 text-[10px] font-mono rounded text-slate-400 hover:text-cyan-glow flex items-center gap-1 transition-colors"
          title="Switch to 2D Blueprint Schematic"
        >
          <Eye className="w-3 h-3" />
          <span>2D</span>
        </button>
      </div>

      {/* R3F 3D Canvas */}
      <CanvasErrorBoundary fallback={<ModelFallback isWireframe={wireframe} />}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-5, -5, 2]} intensity={0.8} color="#00F0FF" />
          <pointLight position={[3, 3, -3]} intensity={0.5} color="#3B82F6" />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <Center>
                <PlanetaryAssembly
                  wireframe={wireframe}
                  speedFactor={speed}
                  exploded={exploded}
                />
              </Center>
            </Float>
          </Suspense>

          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={8}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </CanvasErrorBoundary>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] text-slate-400/80 bg-lab-950/70 px-3 py-1 rounded-full border border-lab-border pointer-events-none backdrop-blur-sm">
        [CLICK &amp; DRAG TO ROTATE // SCROLL TO ZOOM]
      </div>
    </div>
  );
}

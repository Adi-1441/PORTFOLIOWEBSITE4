import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, Eye } from 'lucide-react';

/**
 * 2D Canvas & SVG Interactive Blueprint Animation
 * Used as a zero-error fallback if WebGL is unavailable, fails to initialize,
 * or when the user prefers reduced motion.
 */
export default function ModelFallback({ isWireframe = false }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentAngle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw blueprint coordinate grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Crosshair
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx, cy + 30);
      ctx.stroke();

      // Outer Ring Gear (Annulus)
      const ringRadius = 140;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius + 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ring Gear internal teeth
      const ringTeeth = 36;
      for (let i = 0; i < ringTeeth; i++) {
        const theta = (i * 2 * Math.PI) / ringTeeth;
        const x1 = cx + Math.cos(theta) * ringRadius;
        const y1 = cy + Math.sin(theta) * ringRadius;
        const x2 = cx + Math.cos(theta) * (ringRadius - 10);
        const y2 = cy + Math.sin(theta) * (ringRadius - 10);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Sun Gear (Center)
      const sunRadius = 45;
      const sunTeeth = 12;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-currentAngle * 2.5);

      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = isWireframe ? 'rgba(7, 12, 24, 0.5)' : '#0b1324';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Sun teeth
      for (let i = 0; i < sunTeeth; i++) {
        const theta = (i * 2 * Math.PI) / sunTeeth;
        ctx.beginPath();
        ctx.moveTo(Math.cos(theta) * sunRadius, Math.sin(theta) * sunRadius);
        ctx.lineTo(Math.cos(theta) * (sunRadius + 8), Math.sin(theta) * (sunRadius + 8));
        ctx.stroke();
      }

      // Sun center bore & keyway
      ctx.fillStyle = '#070c18';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 3 Planet Gears
      const orbitRadius = 92;
      const planetRadius = 40;
      const planetTeeth = 12;
      const numPlanets = 3;

      for (let p = 0; p < numPlanets; p++) {
        const planetOrbitAngle = currentAngle + (p * 2 * Math.PI) / numPlanets;
        const px = cx + Math.cos(planetOrbitAngle) * orbitRadius;
        const py = cy + Math.sin(planetOrbitAngle) * orbitRadius;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(planetOrbitAngle * 1.5);

        ctx.strokeStyle = '#00f0ff';
        ctx.fillStyle = isWireframe ? 'transparent' : 'rgba(15, 26, 48, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Teeth
        for (let t = 0; t < planetTeeth; t++) {
          const theta = (t * 2 * Math.PI) / planetTeeth;
          ctx.beginPath();
          ctx.moveTo(Math.cos(theta) * planetRadius, Math.sin(theta) * planetRadius);
          ctx.lineTo(Math.cos(theta) * (planetRadius + 6), Math.sin(theta) * (planetRadius + 6));
          ctx.stroke();
        }

        // Bearing center
        ctx.fillStyle = '#070c18';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      // Carrier Lines connecting planets
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      for (let p = 0; p < numPlanets; p++) {
        const planetOrbitAngle = currentAngle + (p * 2 * Math.PI) / numPlanets;
        const px = cx + Math.cos(planetOrbitAngle) * orbitRadius;
        const py = cy + Math.sin(planetOrbitAngle) * orbitRadius;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      if (isPlaying) {
        currentAngle += 0.01;
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, isWireframe]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-lab-900/60 rounded-2xl border border-lab-border overflow-hidden">
      {/* HUD Watermark */}
      <div className="absolute top-3 left-4 font-mono text-[10px] text-cyan-glow/70 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
        <span>2D CAD BLUEPRINT // SCHEMATIC MODE</span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-400">
        RATIO: 3.5:1 • PCD: 280mm
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={380}
        className="max-w-full h-auto cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
        title="Click to pause/resume schematic animation"
      />

      {/* Control Bar */}
      <div className="absolute bottom-3 flex items-center gap-2 bg-lab-950/80 px-3 py-1.5 rounded-lg border border-lab-border backdrop-blur-sm">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs font-mono text-cyan-glow hover:text-white flex items-center gap-1 transition-colors"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isPlaying ? 'PAUSE' : 'ANIMATE'}</span>
        </button>
        <span className="text-slate-600">|</span>
        <span className="text-[10px] font-mono text-slate-400">PLANETARY MECHANISM</span>
      </div>
    </div>
  );
}

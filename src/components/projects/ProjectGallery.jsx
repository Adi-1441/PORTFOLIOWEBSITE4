import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, Image as ImageIcon, RotateCw } from 'lucide-react';

export default function ProjectGallery({ images = [], initialIndex = 0, isOpen, onClose, projectTitle = '' }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.3, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.3, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-lab-950/95 backdrop-blur-xl animate-in fade-in duration-200 ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-6'
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 px-2 border-b border-lab-border/80 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
          <span className="text-cyan-glow font-bold uppercase tracking-wider">
            CAD GALLERY // {projectTitle}
          </span>
          <span className="text-slate-500">
            [{currentIndex + 1} / {images.length}]
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded bg-lab-900 border border-lab-border text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-400 w-10 text-center font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded bg-lab-900 border border-lab-border text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded bg-lab-900 border border-lab-border text-slate-300 hover:text-white"
            title="Reset Zoom (100%)"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded bg-lab-900 border border-lab-border text-slate-300 hover:text-white"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-lab-800 hover:bg-rose-900/60 border border-lab-border text-slate-200 hover:text-white transition-colors"
            title="Close Gallery (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display Viewport */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 z-20 p-3 rounded-full bg-lab-900/80 hover:bg-lab-800 border border-cyan-500/30 text-cyan-glow hover:text-white transition-all backdrop-blur-sm"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 z-20 p-3 rounded-full bg-lab-900/80 hover:bg-lab-800 border border-cyan-500/30 text-cyan-glow hover:text-white transition-all backdrop-blur-sm"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Current CAD Image */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={currentImage.dataUrl}
            alt={currentImage.name || 'CAD Drawing'}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-150 select-none"
          />
        </div>

        {/* Image Caption / Filename */}
        {currentImage.name && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded bg-lab-950/80 border border-lab-border text-xs font-mono text-slate-300 backdrop-blur-sm">
            {currentImage.name} {currentImage.isCover && <span className="text-cyan-glow ml-1.5">[COVER]</span>}
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="pt-2 border-t border-lab-border/80 flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-full">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => {
                setZoomLevel(1);
                setCurrentIndex(idx);
              }}
              className={`relative h-14 w-20 rounded-lg overflow-hidden border transition-all shrink-0 ${
                currentIndex === idx
                  ? 'border-cyan-glow shadow-[0_0_10px_rgba(0,240,255,0.4)] scale-105'
                  : 'border-lab-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.dataUrl} alt={img.name || `Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

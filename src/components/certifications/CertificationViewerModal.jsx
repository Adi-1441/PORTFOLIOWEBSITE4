import React, { useState, useEffect } from 'react';
import { X, Download, Maximize2, ExternalLink, FileText, Award, ZoomIn, ZoomOut, RotateCw, AlertCircle } from 'lucide-react';
import EngineeringBadge from '../common/EngineeringBadge';

export default function CertificationViewerModal({ cert, isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setZoomLevel(1);
  }, [isOpen, cert]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !cert) return null;

  const isPdf = cert.file?.isPdf || cert.file?.type === 'application/pdf';

  const handleDownload = () => {
    if (!cert.file?.dataUrl) return;
    const a = document.createElement('a');
    a.href = cert.file.dataUrl;
    a.download = cert.file.name || `${cert.name.replace(/\s+/g, '_')}_Certificate${isPdf ? '.pdf' : '.png'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-lab-950/90 backdrop-blur-md animate-in fade-in duration-200 ${
        isFullscreen ? 'p-0' : 'p-3 sm:p-6'
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-lab-900 border border-lab-border rounded-2xl shadow-2xl flex flex-col overflow-hidden relative ${
          isFullscreen ? 'w-full h-full rounded-none border-none' : 'w-full max-w-4xl max-h-[92vh]'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-lab-border bg-lab-950/90 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse shrink-0"></span>
            <span className="text-cyan-glow font-bold uppercase truncate">
              CREDENTIAL // {cert.name}
            </span>
            {cert.isSample && (
              <span className="px-2 py-0.5 rounded bg-lab-800 text-slate-400 shrink-0">
                SAMPLE DEMO
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {cert.file?.dataUrl && !isPdf && (
              <>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.5))}
                  className="p-1.5 rounded bg-lab-800 text-slate-300 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                  className="p-1.5 rounded bg-lab-800 text-slate-300 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </>
            )}

            {cert.file?.dataUrl && (
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download Certificate File"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD</span>
              </button>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded bg-lab-800 text-slate-300 hover:text-white"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-lab-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] bg-lab-950">
          {cert.file && cert.file.dataUrl ? (
            isPdf ? (
              /* PDF Viewer */
              <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center">
                <iframe
                  src={cert.file.dataUrl}
                  title={cert.name}
                  className="w-full h-full min-h-[480px] rounded-lg border border-lab-border bg-white"
                />
              </div>
            ) : (
              /* Image Viewer */
              <div className="relative w-full h-full flex items-center justify-center p-2 overflow-auto">
                <img
                  src={cert.file.dataUrl}
                  alt={cert.name}
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-150"
                />
              </div>
            )
          ) : (
            /* No file fallback */
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Award className="w-12 h-12 text-cyan-glow/50 mb-3" />
              <h4 className="font-display font-bold text-white text-base">NO CERTIFICATE FILE UPLOADED</h4>
              <p className="text-xs font-mono text-slate-400 mt-1 max-w-sm">
                You can upload your PDF or image credentials by clicking Edit on this certification card.
              </p>
            </div>
          )}
        </div>

        {/* Footer Details Strip */}
        <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div>
            <div className="text-white font-bold">{cert.issuer}</div>
            <div className="text-slate-400 text-[11px] mt-0.5">
              Issue Date: {cert.issueDate || 'N/A'} {cert.credentialId && `• Credential ID: ${cert.credentialId}`}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-glow hover:underline flex items-center gap-1"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-lab-800 hover:bg-lab-700 text-slate-200"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

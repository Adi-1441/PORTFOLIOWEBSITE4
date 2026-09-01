import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function UnsavedChangesModal({ isOpen, onConfirmDiscard, onKeepEditing }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onKeepEditing();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onKeepEditing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lab-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-lab-900 border border-amber-500/40 rounded-xl shadow-2xl p-6 relative"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="font-mono text-xs font-semibold uppercase text-amber-400 tracking-wider">
              [UNSAVED CHANGES DETECTED]
            </div>
            <h3 className="text-lg font-display font-bold text-white mt-1">
              Discard Changes?
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              You have unsaved changes in this form. If you close now, your edits will not be saved.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-lab-border pt-4">
          <button
            type="button"
            onClick={onKeepEditing}
            className="px-4 py-2 text-xs font-mono font-medium rounded-lg text-slate-200 hover:text-white bg-lab-800 hover:bg-lab-700 border border-lab-border transition-colors"
          >
            KEEP EDITING
          </button>
          <button
            type="button"
            onClick={onConfirmDiscard}
            className="px-4 py-2 text-xs font-mono font-bold rounded-lg text-white bg-amber-600 hover:bg-amber-500 transition-colors shadow-lg shadow-amber-950"
          >
            DISCARD CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}

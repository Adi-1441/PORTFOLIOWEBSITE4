import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  title = 'Delete Item',
  itemName = '',
  itemType = 'project',
  isDeleting = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isDeleting) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lab-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-lab-900 border border-rose-500/30 rounded-xl shadow-2xl p-6 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Background CAD crosshairs */}
        <div className="absolute top-2 left-2 text-rose-500/20 font-mono text-xs">+</div>
        <div className="absolute top-2 right-2 text-rose-500/20 font-mono text-xs">+</div>
        <div className="absolute bottom-2 left-2 text-rose-500/20 font-mono text-xs">+</div>
        <div className="absolute bottom-2 right-2 text-rose-500/20 font-mono text-xs">+</div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="font-mono text-xs font-semibold uppercase text-rose-400 tracking-wider">
              [DESTRUCTIVE ACTION // CONFIRM DELETION]
            </div>
            <h3 className="text-lg font-display font-bold text-white mt-1">
              {title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Are you sure you want to permanently delete this {itemType}?
            </p>
            {itemName && (
              <div className="mt-2.5 p-2.5 rounded bg-lab-950 border border-lab-border text-xs font-mono text-cyan-glow break-words">
                &ldquo;{itemName}&rdquo;
              </div>
            )}
            <p className="text-xs text-rose-400/80 mt-2">
              This action cannot be undone and will be removed from your browser storage.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-lab-border pt-4">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="px-4 py-2 text-xs font-mono font-medium rounded-lg text-slate-300 hover:text-white bg-lab-800 hover:bg-lab-700 border border-lab-border transition-colors disabled:opacity-50"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-mono font-bold rounded-lg text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-950 flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                DELETING...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                DELETE {itemType.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

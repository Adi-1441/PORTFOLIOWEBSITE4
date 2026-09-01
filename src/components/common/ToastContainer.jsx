import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ message, type = 'info', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateToast = (id, newProps) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newProps } : t))
    );
  };

  const notifySuccess = (msg) => addToast({ message: msg, type: 'success' });
  const notifyError = (msg) => addToast({ message: msg, type: 'error', duration: 6000 });
  const notifyWarning = (msg) => addToast({ message: msg, type: 'warning' });
  const notifyInfo = (msg) => addToast({ message: msg, type: 'info' });
  const notifyLoading = (msg) => addToast({ message: msg, type: 'loading', duration: 0 });

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, updateToast, notifySuccess, notifyError, notifyWarning, notifyInfo, notifyLoading }}
    >
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      border: 'border-emerald-500/40',
      bg: 'bg-lab-900/95 shadow-emerald-950/40',
      badge: 'SUCCESS',
      badgeColor: 'text-emerald-400',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
      border: 'border-rose-500/40',
      bg: 'bg-lab-900/95 shadow-rose-950/40',
      badge: 'ALERT',
      badgeColor: 'text-rose-400',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      border: 'border-amber-500/40',
      bg: 'bg-lab-900/95 shadow-amber-950/40',
      badge: 'WARNING',
      badgeColor: 'text-amber-400',
    },
    info: {
      icon: <Info className="w-5 h-5 text-cyan-glow shrink-0" />,
      border: 'border-cyan-500/40',
      bg: 'bg-lab-900/95 shadow-cyan-950/40',
      badge: 'INFO',
      badgeColor: 'text-cyan-glow',
    },
    loading: {
      icon: <Loader2 className="w-5 h-5 text-cyan-glow animate-spin shrink-0" />,
      border: 'border-cyan-500/40',
      bg: 'bg-lab-900/95 shadow-cyan-950/40',
      badge: 'PROCESSING',
      badgeColor: 'text-cyan-glow',
    },
  };

  const current = typeConfig[toast.type] || typeConfig.info;

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border backdrop-blur-md shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 ${current.bg} ${current.border}`}
    >
      {current.icon}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] font-bold tracking-wider uppercase ${current.badgeColor}`}>
            [{current.badge}]
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-snug break-words">
          {toast.message}
        </p>
      </div>
      {toast.type !== 'loading' && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

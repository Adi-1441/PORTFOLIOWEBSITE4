import React from 'react';

export default function EngineeringBadge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variantStyles = {
    default: 'bg-lab-800 text-slate-300 border-lab-border',
    cyan: 'bg-cyan-500/10 text-cyan-glow border-cyan-500/30',
    blue: 'bg-blue-600/15 text-blue-400 border-blue-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wider',
    sm: 'text-xs px-2.5 py-1 tracking-wide',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded border uppercase ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.sm} ${className}`}
    >
      {children}
    </span>
  );
}

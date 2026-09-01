import React from 'react';

export default function SectionHeading({ code = 'SEC-00', title, subtitle, alignment = 'center' }) {
  const alignClasses = alignment === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={`flex flex-col ${alignClasses} mb-12 sm:mb-16 relative`}>
      {/* Technical Code Stamp */}
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse"></span>
        <span className="font-mono text-xs tracking-widest text-cyan-glow uppercase font-semibold">
          // {code} //
        </span>
        <span className="h-[1px] w-8 bg-cyan-glow/30"></span>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Blueprint decorative underline */}
      <div className="mt-4 flex items-center gap-1.5 opacity-60">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
        <div className="w-2 h-2 rotate-45 border border-cyan-400"></div>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { sampleArticles } from '../../data/sampleArticles';
import { BookOpen, Calendar, Clock, ArrowRight, X, Layers, ExternalLink } from 'lucide-react';

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    if (selectedArticle) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  return (
    <section id="articles" className="py-20 bg-lab-950 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-08"
          title="ENGINEERING ARTICLES &amp; TECHNICAL NOTES"
          subtitle="Technical discussions covering mesh verification in FEA, natural fiber surface modification, near-wall CFD modeling, and vibration feature extraction."
        />

        {/* Notice Stamp */}
        <div className="mb-8 p-3 rounded-lg bg-lab-900/80 border border-lab-border flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
            <span>SAMPLE TECHNICAL INSIGHTS // MECHANICAL ENGINEERING KNOWLEDGE BASE</span>
          </div>
          <span className="hidden sm:inline text-slate-500">{sampleArticles.length} ARTICLES AVAILABLE</span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-lab-850 p-6 rounded-2xl border border-lab-border hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer glass-panel-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-slate-400">
                  <EngineeringBadge variant="cyan" size="xs">
                    {article.category}
                  </EngineeringBadge>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-glow transition-colors mb-2.5 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-lab-900 border border-lab-border text-[10px] font-mono text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-lab-border flex items-center justify-between text-xs font-mono text-cyan-glow group-hover:text-cyan-accent font-semibold">
                <span>READ TECHNICAL NOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-lab-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div
            className="w-full max-w-3xl bg-lab-900 border border-lab-border rounded-2xl shadow-2xl overflow-hidden my-auto relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-lab-border bg-lab-950/90 shrink-0">
              <div className="flex items-center gap-2">
                <EngineeringBadge variant="cyan">{selectedArticle.category}</EngineeringBadge>
                <span className="text-xs font-mono text-slate-400">
                  {selectedArticle.readTime}
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-white border border-lab-border transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-300">
              <div>
                <div className="text-xs font-mono text-cyan-glow mb-1">
                  PUBLISHED: {selectedArticle.date}
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-lab-950 border border-lab-border font-sans text-sm text-cyan-glow/90 italic">
                &ldquo;{selectedArticle.summary}&rdquo;
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <div className="pt-4 border-t border-lab-border">
                <div className="font-mono text-xs text-slate-400 mb-2">TOPICS:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-lab-950 border border-lab-border text-xs font-mono text-cyan-glow"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-lab-border bg-lab-950/90 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-200 font-mono text-xs"
              >
                CLOSE NOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

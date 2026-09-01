import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, FileText, Send, Wrench, Shield, Database } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'cadcae', label: 'CAD & CAE' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'ai-engineering', label: 'AI × ENGINEERING' },
  { id: 'articles', label: 'ARTICLES' },
  { id: 'resume', label: 'RESUME' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ onOpenManage, onOpenSettings, onOpenBackup }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll Spy
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-lab-950/90 backdrop-blur-md border-b border-lab-border shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand Stamp */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-lab-900 border border-cyan-500/40 flex items-center justify-center text-cyan-glow group-hover:border-cyan-glow group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
            <Wrench className="w-4 h-4 text-cyan-glow" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-base tracking-tight leading-none group-hover:text-cyan-glow transition-colors">
              ADITHYA G
            </div>
            <div className="font-mono text-[9px] text-cyan-glow/80 tracking-widest uppercase mt-0.5">
              MECH // ENG LAB
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-lab-900/60 p-1 rounded-full border border-lab-border/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-glow border border-cyan-500/40 font-semibold shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-lab-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Management Trigger */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Quick Manage Dropdown / Trigger */}
          <button
            onClick={onOpenManage}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-lab-900 hover:bg-lab-800 text-slate-300 hover:text-cyan-glow border border-lab-border hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
            title="Manage Projects, Certifications & Database"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>MANAGE</span>
          </button>

          <button
            onClick={() => scrollToSection('resume')}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-lab-850 hover:bg-lab-700 text-slate-200 border border-lab-border hover:border-slate-500 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-glow" />
            <span>RESUME</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/50 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONNECT</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={onOpenManage}
            className="p-2 rounded-lg bg-lab-900 border border-lab-border text-slate-300 hover:text-cyan-glow"
            aria-label="Manage Portfolio"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-lab-900 border border-lab-border text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-glow" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-lab-950/95 border-b border-lab-border backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-glow border border-cyan-500/40 font-bold'
                      : 'text-slate-300 hover:bg-lab-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-lab-border">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenManage();
                }}
                className="w-full py-2 px-3 rounded-lg bg-lab-900 border border-lab-border text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-cyan-glow" />
                <span>MANAGE DATA</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBackup();
                }}
                className="w-full py-2 px-3 rounded-lg bg-lab-900 border border-lab-border text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-cyan-glow" />
                <span>BACKUP / EXPORT</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => scrollToSection('resume')}
                className="w-full py-2 px-3 rounded-lg bg-lab-850 border border-lab-border text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-glow" />
                <span>RESUME</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-glow font-bold flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>CONNECT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

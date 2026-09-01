import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import EngineeringBadge from '../common/EngineeringBadge';
import { Mail, Send, Copy, Check, Settings, MessageSquare, Terminal, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { useToast } from '../common/ToastContainer';

export default function Contact({ settings, onOpenSettings }) {
  const { notifySuccess, notifyInfo } = useToast();

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'CAD & Mechanical Design',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const emailAddress = settings?.email || 'adithya.g.mechanical@gmail.com';
  const githubUrl = settings?.githubUrl || 'https://github.com/adithyag-mech';
  const linkedinUrl = settings?.linkedinUrl || 'https://linkedin.com/in/adithya-g-mechanical';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    notifySuccess('Email address copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct mailto link
    const subject = encodeURIComponent(`[Engineering Inquiry] ${formData.domain} - from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nEngineering Domain: ${formData.domain}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setIsSent(true);
    notifyInfo('Opening your email client to dispatch the message...');
  };

  return (
    <section id="contact" className="py-20 bg-lab-950 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-10"
          title="GET IN TOUCH // ENGINEERING COLLABORATION"
          subtitle="Open to discussions on mechanical design projects, CAD modeling, FEA/CFD simulation, materials research, and engineering academic collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <EngineeringBadge variant="cyan">DIRECT CHANNELS</EngineeringBadge>
                <span className="font-mono text-xs text-slate-400">TELEMETRY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                Let&apos;s build and analyze together.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Whether you have a mechanical CAD modeling challenge, a simulation question in FEA/CFD, or want to discuss natural fiber composite research, feel free to reach out.
              </p>

              {/* Direct Links */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-lab-900 border border-lab-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-glow shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400">EMAIL ADDRESS</div>
                      <div className="text-white font-semibold truncate mt-0.5" title={emailAddress}>
                        {emailAddress}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-cyan-glow transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub Item */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-lab-900 border border-lab-border hover:border-cyan-500/40 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-lab-950 text-slate-300 group-hover:text-cyan-glow shrink-0">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400">GITHUB REPOSITORY</div>
                      <div className="text-slate-200 group-hover:text-white font-semibold truncate mt-0.5">
                        {githubUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-400 group-hover:text-cyan-glow" />
                </a>

                {/* LinkedIn Item */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-lab-900 border border-lab-border hover:border-cyan-500/40 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-cyan-glow shrink-0">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400">LINKEDIN PROFILE</div>
                      <div className="text-slate-200 group-hover:text-white font-semibold truncate mt-0.5">
                        {linkedinUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-400 group-hover:text-cyan-glow" />
                </a>

              </div>
            </div>

            {/* Quick Settings Shortcut */}
            <div className="mt-6 pt-4 border-t border-lab-border flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Need to update URLs?</span>
              <button
                onClick={onOpenSettings}
                className="text-cyan-glow hover:underline flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>EDIT IN SETTINGS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Technical Message Dispatch Form */}
          <div className="lg:col-span-7 bg-lab-850 p-6 sm:p-8 rounded-2xl border border-lab-border shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-lab-border mb-6">
              <div className="font-mono text-xs font-bold text-cyan-glow uppercase flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                ENGINEERING INQUIRY FORM
              </div>
              <span className="text-[10px] font-mono text-slate-400">DISPATCH VIA EMAIL CLIENT</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Dr. Engineer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-white text-xs font-sans focus:outline-none focus:border-cyan-glow"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-white text-xs font-sans focus:outline-none focus:border-cyan-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                  ENGINEERING DOMAIN / TOPIC
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 text-xs focus:outline-none focus:border-cyan-glow"
                >
                  <option value="CAD & Mechanical Design">CAD &amp; 3D SolidWorks Modeling</option>
                  <option value="CAE & Structural FEA">CAE &amp; Finite Element Analysis (FEA)</option>
                  <option value="CFD & Thermal Analysis">CFD &amp; Thermal Simulation</option>
                  <option value="Natural Fiber Composite Research">Natural Fiber Composites Research</option>
                  <option value="AI in Engineering">AI × Engineering / Predictive Maintenance</option>
                  <option value="Academic Collaboration">Academic / Project Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase">
                  MESSAGE / SPECIFICATION DETAILS *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your inquiry, technical challenge, or project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 text-xs font-sans focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-sans">
                  Direct message opens your default email client.
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH MESSAGE</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

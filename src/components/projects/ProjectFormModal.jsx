import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Plus, AlertCircle, Loader2, Star, Link as LinkIcon, Sparkles } from 'lucide-react';
import { PROJECT_CATEGORIES, STATUS_OPTIONS, checkDuplicateProject } from '../../services/projectService';
import { validateFile, optimizeImageIfNeeded } from '../../services/imageUtils';
import UnsavedChangesModal from '../common/UnsavedChangesModal';

export default function ProjectFormModal({ project, isOpen, onClose, onSave, isSaving = false }) {
  const isEdit = Boolean(project && project.id);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(PROJECT_CATEGORIES[1]); // 'CAD DESIGN'
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [role, setRole] = useState('Mechanical Engineer');
  const [status, setStatus] = useState('Completed');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [methodology, setMethodology] = useState('');
  const [toolsStr, setToolsStr] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [featuresStr, setFeaturesStr] = useState('');
  const [results, setResults] = useState('');
  const [outcome, setOutcome] = useState('');
  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]);

  // UI state
  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Initialize or populate form
  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setCategory(project.category || PROJECT_CATEGORIES[1]);
      setYear(project.year || new Date().getFullYear().toString());
      setRole(project.role || 'Mechanical Engineer');
      setStatus(project.status || 'Completed');
      setDescription(project.description || '');
      setObjective(project.objective || '');
      setProblem(project.problem || '');
      setSolution(project.solution || '');
      setMethodology(project.methodology || '');
      setToolsStr(Array.isArray(project.tools) ? project.tools.join(', ') : project.tools || '');
      setSkillsStr(Array.isArray(project.skills) ? project.skills.join(', ') : project.skills || '');
      setFeaturesStr(Array.isArray(project.features) ? project.features.join('\n') : project.features || '');
      setResults(project.results || '');
      setOutcome(project.outcome || '');
      setLinks(Array.isArray(project.links) ? [...project.links] : []);
      setImages(Array.isArray(project.images) ? [...project.images] : []);
    } else {
      // Clean form for add
      setTitle('');
      setCategory(PROJECT_CATEGORIES[1]);
      setYear(new Date().getFullYear().toString());
      setRole('Mechanical Engineer');
      setStatus('Completed');
      setDescription('');
      setObjective('');
      setProblem('');
      setSolution('');
      setMethodology('');
      setToolsStr('SolidWorks, CAD');
      setSkillsStr('3D Modeling, Mechanical Design');
      setFeaturesStr('');
      setResults('');
      setOutcome('');
      setLinks([]);
      setImages([]);
    }
    setIsDirty(false);
    setErrors({});
    setUploadError('');
  }, [project, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || showUnsavedPrompt) return;
      if (e.key === 'Escape') {
        handleAttemptClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDirty, showUnsavedPrompt]);

  if (!isOpen) return null;

  const markDirty = () => setIsDirty(true);

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowUnsavedPrompt(true);
    } else {
      onClose();
    }
  };

  // Image Upload Handling
  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError('');
    setIsUploading(true);

    const newImages = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validation = validateFile(file, false);
      if (!validation.valid) {
        setUploadError(validation.error);
        setIsUploading(false);
        return;
      }

      try {
        const optimized = await optimizeImageIfNeeded(file);
        newImages.push({
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          name: optimized.name,
          dataUrl: optimized.dataUrl,
          type: optimized.type,
          size: optimized.size,
          isCover: images.length === 0 && newImages.length === 0, // make first image cover by default
        });
      } catch (err) {
        setUploadError('Failed to process image: ' + err.message);
        setIsUploading(false);
        return;
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    markDirty();
    setIsUploading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (index) => {
    markDirty();
    setImages((prev) => {
      const updated = prev.filter((_, idx) => idx !== index);
      // If we removed the cover image, assign cover to first remaining
      if (updated.length > 0 && !updated.some((img) => img.isCover)) {
        updated[0].isCover = true;
      }
      return updated;
    });
  };

  const handleSetCover = (index) => {
    markDirty();
    setImages((prev) =>
      prev.map((img, idx) => ({
        ...img,
        isCover: idx === index,
      }))
    );
  };

  const handleMoveImage = (index, direction) => {
    markDirty();
    setImages((prev) => {
      const copy = [...prev];
      const targetIdx = index + direction;
      if (targetIdx < 0 || targetIdx >= copy.length) return prev;
      const [item] = copy.splice(index, 1);
      copy.splice(targetIdx, 0, item);
      return copy;
    });
  };

  // Links handling
  const handleAddLink = () => {
    markDirty();
    setLinks((prev) => [...prev, { label: 'Project Reference', url: '' }]);
  };

  const handleUpdateLink = (index, field, value) => {
    markDirty();
    setLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  };

  const handleRemoveLink = (index) => {
    markDirty();
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit Validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Project Title is required.';
    }
    if (!category) {
      newErrors.category = 'Category is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check duplicate warning if title changed or new
    const isDup = await checkDuplicateProject(title, project?.id);
    if (isDup && !window.confirm(`A project titled "${title}" already exists. Do you want to proceed with saving?`)) {
      return;
    }

    const payload = {
      ...(project || {}),
      title: title.trim(),
      category,
      year: year.trim() || new Date().getFullYear().toString(),
      role: role.trim() || 'Mechanical Engineer',
      status,
      description: description.trim(),
      objective: objective.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      methodology: methodology.trim(),
      tools: toolsStr,
      skills: skillsStr,
      features: featuresStr,
      results: results.trim(),
      outcome: outcome.trim(),
      links,
      images,
    };

    onSave(payload);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-lab-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        <div
          className="w-full max-w-4xl bg-lab-900 border border-lab-border rounded-2xl shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-lab-border bg-lab-950/90 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse"></div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight">
                {isEdit ? 'EDIT MECHANICAL ENGINEERING PROJECT' : 'ADD NEW ENGINEERING PROJECT'}
              </h2>
            </div>

            <button
              onClick={handleAttemptClose}
              className="p-1.5 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white border border-lab-border transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            
            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Project Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-semibold uppercase text-cyan-glow mb-1.5">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shell and Tube Heat Exchanger Thermal & CAD Design"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    markDirty();
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border ${
                    errors.title ? 'border-rose-500' : 'border-lab-border focus:border-cyan-glow'
                  } text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow transition-all`}
                />
                {errors.title && <p className="text-xs text-rose-400 font-mono mt-1">{errors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  ENGINEERING CATEGORY *
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                >
                  {PROJECT_CATEGORIES.filter((c) => c !== 'ALL WORK').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  PROJECT YEAR
                </label>
                <input
                  type="text"
                  placeholder="2024"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  YOUR ROLE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead CAD Modeler, FEA Analyst, Researcher"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  STATUS
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                >
                  {STATUS_OPTIONS.filter((s) => s !== 'All Statuses').map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-cyan-glow mb-1.5">
                PROJECT OVERVIEW &amp; DESCRIPTION
              </label>
              <textarea
                rows={3}
                placeholder="Comprehensive description of the mechanical design, analytical basis, or simulation setup..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs sm:text-sm focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-amber-400 mb-1.5">
                  ENGINEERING PROBLEM / CHALLENGE
                </label>
                <textarea
                  rows={3}
                  placeholder="What was the core mechanical constraint, failure mode, or thermal issue?"
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-emerald-400 mb-1.5">
                  ENGINEERING SOLUTION
                </label>
                <textarea
                  rows={3}
                  placeholder="How did you resolve it through CAD, FEA optimization, or material selection?"
                  value={solution}
                  onChange={(e) => {
                    setSolution(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Objective & Methodology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  PROJECT OBJECTIVE
                </label>
                <textarea
                  rows={2}
                  placeholder="Primary design goal and functional requirements..."
                  value={objective}
                  onChange={(e) => {
                    setObjective(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  METHODOLOGY &amp; STANDARDS
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. ASME Sec VIII, ASTM D638, LMTD calculation, k-omega SST CFD..."
                  value={methodology}
                  onChange={(e) => {
                    setMethodology(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Tools & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  TOOLS &amp; SOFTWARE (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="SolidWorks, ANSYS Mechanical, MATLAB, Python"
                  value={toolsStr}
                  onChange={(e) => {
                    setToolsStr(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  ENGINEERING SKILLS (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="CAD, FEA, DFM, Thermal Modeling, GD&T"
                  value={skillsStr}
                  onChange={(e) => {
                    setSkillsStr(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* Features (Multiline) */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                KEY TECHNICAL FEATURES (One per line)
              </label>
              <textarea
                rows={3}
                placeholder="144 seamless tubes with 19.05 mm OD&#10;Segmental baffles with 200 mm pitch&#10;FEA stress validation under 3G bump load"
                value={featuresStr}
                onChange={(e) => {
                  setFeaturesStr(e.target.value);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
              />
            </div>

            {/* Results & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  RESULTS &amp; PERFORMANCE METRICS
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Max stress 248 MPa (SF 1.98), pressure drop 38 kPa..."
                  value={results}
                  onChange={(e) => {
                    setResults(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  DELIVERABLE / OUTCOME
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 2D manufacturing drawing package with GD&T and BOM..."
                  value={outcome}
                  onChange={(e) => {
                    setOutcome(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-lab-950 border border-lab-border text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-glow"
                />
              </div>
            </div>

            {/* CAD PROJECT IMAGE UPLOAD ZONE (CRITICAL REQUIREMENT) */}
            <div className="p-4 sm:p-6 rounded-xl bg-lab-950 border border-lab-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-cyan-glow uppercase flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    UPLOAD CAD IMAGES &amp; RENDERS
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload SolidWorks renders, CFD plots, FEA stress maps, or photos (JPG, PNG, WEBP).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>BROWSE FILES</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-cyan-glow bg-cyan-500/10 scale-[0.99]'
                    : 'border-lab-border hover:border-cyan-500/40 bg-lab-900/60'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-cyan-glow font-mono text-xs">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>PROCESSING &amp; STORING CAD IMAGES...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-cyan-glow/60" />
                    <span className="font-mono text-xs text-slate-200">
                      DRAG &amp; DROP CAD IMAGES HERE OR CLICK TO BROWSE
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Supported: JPG, PNG, WEBP (Max 15MB per image • Stored in IndexedDB)
                    </span>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Uploaded Images List / Reordering Grid */}
              {images.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="font-mono text-xs text-slate-400 font-semibold">
                    ATTACHED CAD IMAGES ({images.length}) — Click Star to set Cover Image:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className={`p-2.5 rounded-lg border flex items-center gap-3 transition-all ${
                          img.isCover
                            ? 'bg-lab-900 border-cyan-glow shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                            : 'bg-lab-900/80 border-lab-border'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded overflow-hidden bg-lab-950 border border-lab-border shrink-0">
                          <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs text-slate-200 truncate" title={img.name}>
                            {img.name || `CAD Image ${idx + 1}`}
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                            {img.isCover ? (
                              <span className="text-cyan-glow font-bold flex items-center gap-1">
                                <Star className="w-3 h-3 fill-cyan-glow text-cyan-glow" />
                                COVER IMAGE
                              </span>
                            ) : (
                              <span>Position #{idx + 1}</span>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1">
                          {!img.isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(idx)}
                              className="p-1.5 rounded bg-lab-800 hover:bg-cyan-950/60 text-slate-400 hover:text-cyan-glow text-xs"
                              title="Set as Cover Image"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveImage(idx, -1)}
                            className="p-1.5 rounded bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={idx === images.length - 1}
                            onClick={() => handleMoveImage(idx, 1)}
                            className="p-1.5 rounded bg-lab-800 hover:bg-lab-700 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1.5 rounded bg-lab-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                            title="Remove Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project References & Links */}
            <div className="p-4 rounded-xl bg-lab-950 border border-lab-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-300">
                  PROJECT LINKS &amp; REFERENCES (Optional)
                </span>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-xs font-mono text-cyan-glow hover:text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD LINK</span>
                </button>
              </div>

              {links.map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Link Label (e.g. Technical Report PDF)"
                    value={link.label}
                    onChange={(e) => handleUpdateLink(idx, 'label', e.target.value)}
                    className="w-1/3 px-3 py-2 rounded bg-lab-900 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleUpdateLink(idx, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-lab-900 border border-lab-border text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-glow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    className="p-2 rounded bg-lab-900 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </form>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-lab-border bg-lab-950/90 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handleAttemptClose}
              className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-slate-300 hover:text-white border border-lab-border font-mono text-xs font-semibold transition-colors"
            >
              CANCEL
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SAVING PROJECT...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isEdit ? 'SAVE CHANGES' : 'SAVE PROJECT'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesModal
        isOpen={showUnsavedPrompt}
        onKeepEditing={() => setShowUnsavedPrompt(false)}
        onConfirmDiscard={() => {
          setShowUnsavedPrompt(false);
          setIsDirty(false);
          onClose();
        }}
      />
    </>
  );
}

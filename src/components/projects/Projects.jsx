import React, { useState, useMemo } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import ProjectFormModal from './ProjectFormModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import { PROJECT_CATEGORIES, SORT_OPTIONS, STATUS_OPTIONS, filterAndSortProjects } from '../../services/projectService';
import { Plus, Search, SlidersHorizontal, Settings, RefreshCw, FolderX, Sparkles, Filter } from 'lucide-react';

export default function Projects({
  projects = [],
  onSaveProject,
  onDeleteProject,
  onOpenManage,
  isSaving = false,
  isDeleting = false,
}) {
  // Filtering & Sorting State
  const [activeCategory, setActiveCategory] = useState('ALL WORK');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Modals State
  const [selectedProject, setSelectedProject] = useState(null); // for View Details
  const [editingProject, setEditingProject] = useState(null); // null when adding new, object when editing
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filtered & Sorted Projects computation
  const filteredProjects = useMemo(() => {
    return filterAndSortProjects(projects, {
      query: searchQuery,
      category: activeCategory,
      sort: sortBy,
      status: statusFilter,
    });
  }, [projects, searchQuery, activeCategory, sortBy, statusFilter]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (proj) => {
    setDeletingProject(proj);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProject) return;
    const success = await onDeleteProject(deletingProject.id);
    if (success) {
      setIsDeleteModalOpen(false);
      setDeletingProject(null);
      if (selectedProject?.id === deletingProject.id) {
        setSelectedProject(null);
      }
    }
  };

  const handleFormSave = async (projectData) => {
    const saved = await onSaveProject(projectData);
    if (saved) {
      setIsFormOpen(false);
      setEditingProject(null);
      if (selectedProject?.id === saved.id) {
        setSelectedProject(saved);
      }
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('ALL WORK');
    setSearchQuery('');
    setSortBy('newest');
    setStatusFilter('All Statuses');
  };

  return (
    <section id="projects" className="py-20 bg-lab-900/60 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          code="SEC-03"
          title="ENGINEERING PROJECTS &amp; CAD PORTFOLIO"
          subtitle="Parametric 3D CAD modeling, structural FEA simulations, fluid dynamics studies, natural fiber materials research, and AI-driven predictive systems."
        />

        {/* Top Control Bar: Search, Category Filters, Sort, and Add Project */}
        <div className="space-y-4 mb-8">
          
          {/* Action Row: Category Pills & Add Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Filter Pills (Scrollable on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-lab-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'bg-lab-850 hover:bg-lab-800 text-slate-300 hover:text-white border border-lab-border'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Management & Add CTA Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenManage}
                className="px-3 py-2 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-300 hover:text-cyan-glow border border-lab-border text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Manage All Projects"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>MANAGE</span>
              </button>

              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/50 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD PROJECT</span>
              </button>
            </div>

          </div>

          {/* Search, Status, and Sort Secondary Toolbar */}
          <div className="p-3 rounded-xl bg-lab-850 border border-lab-border grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by title, description, tools (e.g. SolidWorks, FEA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-lab-950 border border-lab-border text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-glow"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-lab-950 border border-lab-border text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-glow"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-lab-950 border border-lab-border text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-glow"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Dynamic Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={(p) => setSelectedProject(p)}
                onEdit={(p) => handleOpenEdit(p)}
                onDelete={(p) => handleOpenDelete(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty States */
          <div className="py-16 px-4 text-center rounded-2xl bg-lab-850/80 border border-lab-border flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-lab-900 border border-lab-border flex items-center justify-center text-cyan-glow mb-4">
              <FolderX className="w-8 h-8 opacity-60" />
            </div>

            {projects.length === 0 ? (
              <>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                  NO PROJECTS IN REPOSITORY YET
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 font-mono">
                  Your project repository is currently empty. Add your CAD models, simulation reports, or research data.
                </p>
                <button
                  onClick={handleOpenAdd}
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD YOUR FIRST PROJECT</span>
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                  NO PROJECTS FOUND MATCHING FILTERS
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 font-mono">
                  No projects matched your search query &ldquo;{searchQuery}&rdquo; or selected category &ldquo;{activeCategory}&rdquo;.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-cyan-glow border border-lab-border font-mono text-xs transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESET SEARCH &amp; FILTERS</span>
                </button>
              </>
            )}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onEdit={(p) => {
          setSelectedProject(null);
          handleOpenEdit(p);
        }}
        onDelete={(p) => {
          setSelectedProject(null);
          handleOpenDelete(p);
        }}
      />

      {/* Project Add / Edit Form Modal */}
      <ProjectFormModal
        project={editingProject}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        onSave={handleFormSave}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Engineering Project"
        itemName={deletingProject?.title}
        itemType="project"
        isDeleting={isDeleting}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeletingProject(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}

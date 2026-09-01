/**
 * Project Management Service
 * Full CRUD, dynamic search, multi-criteria filtering, sorting, and duplicate validation.
 */

import { STORES, getAllFromStore, getFromStore, putToStore, deleteFromStore } from './db';

export const PROJECT_CATEGORIES = [
  'ALL WORK',
  'CAD DESIGN',
  'CAE / FEA',
  'CFD / FLUIDS',
  'THERMAL',
  'RESEARCH & MATERIALS',
  'MANUFACTURING',
  'AUTOMATION',
  'AI × ENGINEERING',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title (A - Z)' },
  { value: 'title-desc', label: 'Title (Z - A)' },
  { value: 'category', label: 'Category' },
];

export const STATUS_OPTIONS = ['All Statuses', 'Completed', 'In Progress', 'Research Phase', 'Prototyping'];

/**
 * Fetch all projects from persistent IndexedDB
 */
export async function getProjects() {
  const list = await getAllFromStore(STORES.PROJECTS);
  // Default sort by createdAt descending
  return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

/**
 * Fetch single project by ID
 */
export async function getProjectById(id) {
  return await getFromStore(STORES.PROJECTS, id);
}

/**
 * Save (create or update) a project
 */
export async function saveProject(projectData) {
  if (!projectData.title || !projectData.title.trim()) {
    throw new Error('Project Title is required.');
  }
  if (!projectData.category) {
    throw new Error('Project Category is required.');
  }

  const now = new Date().toISOString();
  const isNew = !projectData.id;
  const id = projectData.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  // Ensure cover image consistency
  let images = Array.isArray(projectData.images) ? [...projectData.images] : [];
  if (images.length > 0) {
    const hasCover = images.some((img) => img.isCover);
    if (!hasCover) {
      images[0].isCover = true;
    }
  }

  const cleanProject = {
    ...projectData,
    id,
    title: projectData.title.trim(),
    category: projectData.category,
    year: projectData.year || new Date().getFullYear().toString(),
    role: projectData.role || 'Mechanical Engineer',
    status: projectData.status || 'Completed',
    description: projectData.description || '',
    objective: projectData.objective || '',
    problem: projectData.problem || '',
    solution: projectData.solution || '',
    methodology: projectData.methodology || '',
    tools: Array.isArray(projectData.tools) ? projectData.tools : (projectData.tools || '').split(',').map((t) => t.trim()).filter(Boolean),
    skills: Array.isArray(projectData.skills) ? projectData.skills : (projectData.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
    features: Array.isArray(projectData.features) ? projectData.features : (projectData.features || '').split('\n').map((f) => f.trim()).filter(Boolean),
    results: projectData.results || '',
    outcome: projectData.outcome || '',
    links: Array.isArray(projectData.links) ? projectData.links : [],
    images,
    isSample: Boolean(projectData.isSample),
    createdAt: projectData.createdAt || now,
    updatedAt: now,
  };

  await putToStore(STORES.PROJECTS, cleanProject);
  return cleanProject;
}

/**
 * Delete a project by ID permanently
 */
export async function deleteProject(id) {
  if (!id) throw new Error('Project ID required for deletion.');
  await deleteFromStore(STORES.PROJECTS, id);
  return true;
}

/**
 * Check if a similar project title already exists (duplicate detection)
 */
export async function checkDuplicateProject(title, excludeId = null) {
  if (!title || !title.trim()) return false;
  const projects = await getProjects();
  const normalized = title.trim().toLowerCase();
  return projects.some((p) => p.id !== excludeId && p.title.toLowerCase() === normalized);
}

/**
 * Dynamic filter and sort helper
 */
export function filterAndSortProjects(projects, { query = '', category = 'ALL WORK', sort = 'newest', status = 'All Statuses' }) {
  if (!Array.isArray(projects)) return [];

  return projects
    .filter((project) => {
      // Category Filter
      if (category !== 'ALL WORK' && project.category !== category) {
        return false;
      }

      // Status Filter
      if (status !== 'All Statuses' && project.status !== status) {
        return false;
      }

      // Search Query (matches title, description, tools, skills, category)
      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        const inTitle = (project.title || '').toLowerCase().includes(q);
        const inDesc = (project.description || '').toLowerCase().includes(q);
        const inCat = (project.category || '').toLowerCase().includes(q);
        const inTools = (project.tools || []).some((t) => (t || '').toLowerCase().includes(q));
        const inSkills = (project.skills || []).some((s) => (s || '').toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inCat && !inTools && !inSkills) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
}

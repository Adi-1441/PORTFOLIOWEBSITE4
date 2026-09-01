/**
 * Portfolio Settings Service
 * Manages customizable contact links, resume configuration, and bio settings.
 */

import { STORES, getFromStore, putToStore } from './db';

const SETTINGS_KEY = 'portfolio_settings';

export const DEFAULT_SETTINGS = {
  name: 'Adithya G',
  field: 'Mechanical Engineering',
  role: 'Mechanical Engineering Student',
  email: 'adithya.g.mechanical@gmail.com',
  githubUrl: 'https://github.com/adithyag-mech',
  linkedinUrl: 'https://linkedin.com/in/adithya-g-mechanical',
  bioSubtitle: 'CAD • CAE • CFD • THERMAL • RESEARCH • AUTOMATION',
  heroDescription: 'I design, model, simulate, analyze, and explore engineering solutions by combining mechanical engineering principles with CAD, CAE, computational tools, research, and AI-driven approaches.',
  hasCustomResume: false,
  resumeFileName: 'resume.pdf',
  customResumeDataUrl: null,
};

export async function getSettings() {
  const saved = await getFromStore(STORES.SETTINGS, SETTINGS_KEY);
  if (saved && saved.value) {
    return { ...DEFAULT_SETTINGS, ...saved.value };
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(newSettings) {
  const current = await getSettings();
  const merged = { ...current, ...newSettings };
  await putToStore(STORES.SETTINGS, {
    key: SETTINGS_KEY,
    value: merged,
    updatedAt: new Date().toISOString(),
  });
  return merged;
}

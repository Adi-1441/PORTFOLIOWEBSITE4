/**
 * Backup and Restore Service
 * Exports and imports the complete portfolio state (Projects, Certifications, CAD Images, PDFs, Settings)
 * into a portable JSON package.
 */

import { getDB, STORES, getAllFromStore, putToStore } from './db';
import { getSettings } from './settingsService';

export const BACKUP_SCHEMA_VERSION = '1.0.0';

/**
 * Export entire portfolio to a downloadable JSON file
 */
export async function exportPortfolioBackup() {
  const projects = await getAllFromStore(STORES.PROJECTS);
  const certifications = await getAllFromStore(STORES.CERTIFICATIONS);
  const settings = await getSettings();

  const payload = {
    schemaVersion: BACKUP_SCHEMA_VERSION,
    exportDate: new Date().toISOString(),
    generator: 'Adithya G Mechanical Engineering Portfolio Lab',
    counts: {
      projects: projects.length,
      certifications: certifications.length,
    },
    data: {
      projects,
      certifications,
      settings,
    }
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  a.download = `adithya-g-portfolio-backup-${timestamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return { success: true, countProjects: projects.length, countCertifications: certifications.length };
}

/**
 * Validate backup file schema
 */
export function validateBackupFile(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid backup file structure: root must be an object.' };
  }

  if (!data.data || !Array.isArray(data.data.projects) || !Array.isArray(data.data.certifications)) {
    return { valid: false, error: 'Invalid backup file: missing project or certification datasets.' };
  }

  return {
    valid: true,
    projectCount: data.data.projects.length,
    certCount: data.data.certifications.length,
    exportDate: data.exportDate || 'Unknown',
  };
}

/**
 * Restore portfolio from backup data
 * @param {Object} backupData - Parsed backup JSON
 * @param {string} mode - 'replace' (clears current items and inserts backup) or 'merge' (adds to existing)
 */
export async function restorePortfolioBackup(backupData, mode = 'replace') {
  const validation = validateBackupFile(backupData);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([STORES.PROJECTS, STORES.CERTIFICATIONS, STORES.SETTINGS, STORES.SYSTEM_META], 'readwrite');

      const projectStore = tx.objectStore(STORES.PROJECTS);
      const certStore = tx.objectStore(STORES.CERTIFICATIONS);
      const settingsStore = tx.objectStore(STORES.SETTINGS);

      if (mode === 'replace') {
        projectStore.clear();
        certStore.clear();
      }

      // Restore projects
      for (const proj of backupData.data.projects) {
        projectStore.put(proj);
      }

      // Restore certifications
      for (const cert of backupData.data.certifications) {
        certStore.put(cert);
      }

      // Restore settings if present
      if (backupData.data.settings) {
        settingsStore.put({
          key: 'portfolio_settings',
          value: backupData.data.settings,
          updatedAt: new Date().toISOString(),
        });
      }

      tx.oncomplete = () => {
        resolve({
          success: true,
          restoredProjects: backupData.data.projects.length,
          restoredCertifications: backupData.data.certifications.length,
        });
      };

      tx.onerror = () => {
        reject(tx.error || new Error('Failed to restore backup data transaction.'));
      };
    } catch (err) {
      reject(err);
    }
  });
}

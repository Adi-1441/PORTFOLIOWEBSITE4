/**
 * IndexedDB Database Service for Adithya G Mechanical Engineering Portfolio
 * Provides persistent, transaction-safe storage for Projects, Certifications,
 * CAD images, Certificate files, and Portfolio Settings.
 *
 * CRITICAL RULE: Sample data is initialized ONCE. Once deleted by the user,
 * deleted sample items NEVER regenerate on refresh.
 */

import { sampleProjects } from '../data/sampleProjects';
import { sampleCertifications } from '../data/sampleCertifications';

const DB_NAME = 'AdithyaMechPortfolioDB_v1';
const DB_VERSION = 1;

export const STORES = {
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  SETTINGS: 'settings',
  SYSTEM_META: 'system_meta',
};

let dbPromise = null;

export function getDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported by your browser environment.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object stores if not existing
      if (!db.objectStoreNames.contains(STORES.PROJECTS)) {
        db.createObjectStore(STORES.PROJECTS, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(STORES.CERTIFICATIONS)) {
        db.createObjectStore(STORES.CERTIFICATIONS, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }

      if (!db.objectStoreNames.contains(STORES.SYSTEM_META)) {
        db.createObjectStore(STORES.SYSTEM_META, { keyPath: 'key' });
      }
    };

    request.onsuccess = async (event) => {
      const db = event.target.result;
      try {
        await initSampleDataIfNeeded(db);
        resolve(db);
      } catch (err) {
        console.error('Error during sample data initialization:', err);
        resolve(db); // Still resolve so app functions
      }
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(new Error('Failed to open local storage database: ' + event.target.error?.message));
    };
  });

  return dbPromise;
}

/**
 * Initialize sample data only on fresh first run.
 * If already initialized, do NOT insert or recreate deleted items.
 */
async function initSampleDataIfNeeded(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORES.SYSTEM_META, STORES.PROJECTS, STORES.CERTIFICATIONS, STORES.SETTINGS], 'readwrite');
    const metaStore = tx.objectStore(STORES.SYSTEM_META);
    const checkReq = metaStore.get('sample_data_initialized');

    checkReq.onsuccess = () => {
      const meta = checkReq.result;
      if (meta && meta.value === true) {
        // Already initialized previously — preserve all user data, never recreate deleted items
        resolve();
        return;
      }

      // First run: Seed initial sample data
      const projectStore = tx.objectStore(STORES.PROJECTS);
      for (const proj of sampleProjects) {
        projectStore.put(proj);
      }

      const certStore = tx.objectStore(STORES.CERTIFICATIONS);
      for (const cert of sampleCertifications) {
        certStore.put(cert);
      }

      const settingsStore = tx.objectStore(STORES.SETTINGS);
      settingsStore.put({
        key: 'portfolio_settings',
        value: {
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
        }
      });

      // Mark initialized
      metaStore.put({ key: 'sample_data_initialized', value: true, timestamp: new Date().toISOString() });
    };

    checkReq.onerror = () => {
      reject(checkReq.error);
    };

    tx.oncomplete = () => {
      resolve();
    };

    tx.onerror = () => {
      reject(tx.error);
    };
  });
}

/**
 * Generic Read All from a store
 */
export async function getAllFromStore(storeName) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generic Read One by ID
 */
export async function getFromStore(storeName, key) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(key);

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generic Put / Save item to store
 */
export async function putToStore(storeName, item) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);

      req.onsuccess = () => resolve(item);
      req.onerror = (e) => {
        if (e.target.error && e.target.error.name === 'QuotaExceededError') {
          reject(new Error('Storage quota exceeded. Please delete unused large files or export a backup.'));
        } else {
          reject(req.error || new Error('Failed to save to database.'));
        }
      };
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generic Delete item from store
 */
export async function deleteFromStore(storeName, key) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Explicit Factory Reset: Only invoked if user explicitly clicks "Reset to Default Demo Data"
 */
export async function resetToFactorySamples() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORES.PROJECTS, STORES.CERTIFICATIONS, STORES.SYSTEM_META], 'readwrite');

    // Clear stores
    tx.objectStore(STORES.PROJECTS).clear();
    tx.objectStore(STORES.CERTIFICATIONS).clear();

    // Re-insert samples
    const projectStore = tx.objectStore(STORES.PROJECTS);
    for (const proj of sampleProjects) {
      projectStore.put(proj);
    }

    const certStore = tx.objectStore(STORES.CERTIFICATIONS);
    for (const cert of sampleCertifications) {
      certStore.put(cert);
    }

    const metaStore = tx.objectStore(STORES.SYSTEM_META);
    metaStore.put({ key: 'sample_data_initialized', value: true, timestamp: new Date().toISOString() });

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Storage estimate helper
 */
export async function getStorageEstimate() {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
        percent: estimate.quota ? ((estimate.usage / estimate.quota) * 100).toFixed(1) : 0,
        usageMB: ((estimate.usage || 0) / (1024 * 1024)).toFixed(1),
        quotaMB: ((estimate.quota || 0) / (1024 * 1024)).toFixed(0),
      };
    } catch {
      return null;
    }
  }
  return null;
}

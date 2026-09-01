/**
 * Certification Management Service
 * Full CRUD, dynamic search, sorting, PDF and Image file persistence.
 */

import { STORES, getAllFromStore, getFromStore, putToStore, deleteFromStore } from './db';

export const CERT_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Issue Date' },
  { value: 'oldest', label: 'Oldest Issue Date' },
  { value: 'name-asc', label: 'Name (A - Z)' },
  { value: 'issuer-asc', label: 'Issuing Org (A - Z)' },
];

/**
 * Fetch all certifications from persistent IndexedDB
 */
export async function getCertifications() {
  const list = await getAllFromStore(STORES.CERTIFICATIONS);
  return list.sort((a, b) => new Date(b.issueDate || b.createdAt || 0) - new Date(a.issueDate || a.createdAt || 0));
}

/**
 * Fetch single certification by ID
 */
export async function getCertificationById(id) {
  return await getFromStore(STORES.CERTIFICATIONS, id);
}

/**
 * Save (create or update) a certification
 */
export async function saveCertification(certData) {
  if (!certData.name || !certData.name.trim()) {
    throw new Error('Certificate Name is required.');
  }
  if (!certData.issuer || !certData.issuer.trim()) {
    throw new Error('Issuing Organization is required.');
  }

  const now = new Date().toISOString();
  const id = certData.id || `cert-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  const cleanCert = {
    ...certData,
    id,
    name: certData.name.trim(),
    issuer: certData.issuer.trim(),
    issueDate: certData.issueDate || new Date().toISOString().split('T')[0],
    expiryDate: certData.expiryDate || '',
    credentialId: certData.credentialId || '',
    credentialUrl: certData.credentialUrl || '',
    description: certData.description || '',
    skills: Array.isArray(certData.skills) ? certData.skills : (certData.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
    file: certData.file || null,
    isSample: Boolean(certData.isSample),
    createdAt: certData.createdAt || now,
    updatedAt: now,
  };

  await putToStore(STORES.CERTIFICATIONS, cleanCert);
  return cleanCert;
}

/**
 * Delete a certification permanently
 */
export async function deleteCertification(id) {
  if (!id) throw new Error('Certification ID required for deletion.');
  await deleteFromStore(STORES.CERTIFICATIONS, id);
  return true;
}

/**
 * Dynamic filter and sort helper for certifications
 */
export function filterAndSortCertifications(certifications, { query = '', sort = 'newest' }) {
  if (!Array.isArray(certifications)) return [];

  return certifications
    .filter((cert) => {
      if (!query || !query.trim()) return true;
      const q = query.trim().toLowerCase();
      const inName = (cert.name || '').toLowerCase().includes(q);
      const inIssuer = (cert.issuer || '').toLowerCase().includes(q);
      const inId = (cert.credentialId || '').toLowerCase().includes(q);
      const inSkills = (cert.skills || []).some((s) => (s || '').toLowerCase().includes(q));
      return inName || inIssuer || inId || inSkills;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.issueDate || a.createdAt || 0) - new Date(b.issueDate || b.createdAt || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'issuer-asc':
          return (a.issuer || '').localeCompare(b.issuer || '');
        case 'newest':
        default:
          return new Date(b.issueDate || b.createdAt || 0) - new Date(a.issueDate || a.createdAt || 0);
      }
    });
}

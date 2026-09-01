import React, { useState, useMemo } from 'react';
import SectionHeading from '../common/SectionHeading';
import CertificationCard from './CertificationCard';
import CertificationViewerModal from './CertificationViewerModal';
import CertificationFormModal from './CertificationFormModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import { CERT_SORT_OPTIONS, filterAndSortCertifications } from '../../services/certificationService';
import { Plus, Search, Award, RefreshCw, FolderX, ShieldCheck } from 'lucide-react';

export default function Certifications({
  certifications = [],
  onSaveCertification,
  onDeleteCertification,
  isSaving = false,
  isDeleting = false,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [viewingCert, setViewingCert] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingCert, setDeletingCert] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filtered & Sorted
  const filteredCerts = useMemo(() => {
    return filterAndSortCertifications(certifications, {
      query: searchQuery,
      sort: sortBy,
    });
  }, [certifications, searchQuery, sortBy]);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (cert) => {
    setDeletingCert(cert);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCert) return;
    const success = await onDeleteCertification(deletingCert.id);
    if (success) {
      setIsDeleteModalOpen(false);
      setDeletingCert(null);
      if (viewingCert?.id === deletingCert.id) {
        setViewingCert(null);
      }
    }
  };

  const handleFormSave = async (certData) => {
    const saved = await onSaveCertification(certData);
    if (saved) {
      setIsFormOpen(false);
      setEditingCert(null);
      if (viewingCert?.id === saved.id) {
        setViewingCert(saved);
      }
    }
  };

  return (
    <section id="certifications" className="py-20 bg-lab-950 border-t border-lab-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <SectionHeading
          code="SEC-06"
          title="CERTIFICATIONS &amp; CREDENTIALS"
          subtitle="Verified training in SolidWorks CAD modeling, ANSYS Finite Element Analysis, Computational Fluid Dynamics, and engineering computing."
        />

        {/* Control Toolbar */}
        <div className="p-4 rounded-xl bg-lab-850 border border-lab-border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, issuer, skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-lab-950 border border-lab-border text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-glow"
            />
          </div>

          {/* Sort & Add CTA */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-lab-950 border border-lab-border text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-glow"
            >
              {CERT_SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-glow border border-cyan-500/50 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD CERTIFICATION</span>
            </button>
          </div>

        </div>

        {/* Certifications Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCerts.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                onView={(c) => setViewingCert(c)}
                onEdit={(c) => handleOpenEdit(c)}
                onDelete={(c) => handleOpenDelete(c)}
              />
            ))}
          </div>
        ) : (
          /* Empty States */
          <div className="py-16 px-4 text-center rounded-2xl bg-lab-850/80 border border-lab-border flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-lab-900 border border-lab-border flex items-center justify-center text-cyan-glow mb-4">
              <FolderX className="w-8 h-8 opacity-60" />
            </div>

            {certifications.length === 0 ? (
              <>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                  NO CERTIFICATIONS YET
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 font-mono">
                  Your credentials section is empty. Upload your SolidWorks, ANSYS, or technical certification PDFs/images.
                </p>
                <button
                  onClick={handleOpenAdd}
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-lab-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD YOUR FIRST CERTIFICATION</span>
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                  NO CERTIFICATIONS MATCHED SEARCH
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 font-mono">
                  No certifications matched &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-lg bg-lab-800 hover:bg-lab-700 text-cyan-glow border border-lab-border font-mono text-xs transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>CLEAR SEARCH</span>
                </button>
              </>
            )}
          </div>
        )}

      </div>

      {/* Viewer Modal */}
      <CertificationViewerModal
        cert={viewingCert}
        isOpen={Boolean(viewingCert)}
        onClose={() => setViewingCert(null)}
      />

      {/* Add / Edit Form Modal */}
      <CertificationFormModal
        cert={editingCert}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCert(null);
        }}
        onSave={handleFormSave}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Certification"
        itemName={deletingCert?.name}
        itemType="certification"
        isDeleting={isDeleting}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeletingCert(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}

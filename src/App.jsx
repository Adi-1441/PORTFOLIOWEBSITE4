import React, { useState, useEffect, useCallback } from 'react';
import { ToastProvider, useToast } from './components/common/ToastContainer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Research from './components/research/Research';
import CADCAE from './components/cadcae/CADCAE';
import Certifications from './components/certifications/Certifications';
import AIEngineering from './components/aiengineering/AIEngineering';
import Articles from './components/articles/Articles';
import Resume from './components/resume/Resume';
import Contact from './components/contact/Contact';

import ManagePortfolioModal from './components/management/ManagePortfolioModal';
import BackupRestoreModal from './components/management/BackupRestoreModal';
import PortfolioSettingsModal from './components/management/PortfolioSettingsModal';

import { getProjects, saveProject, deleteProject } from './services/projectService';
import { getCertifications, saveCertification, deleteCertification } from './services/certificationService';
import { getSettings, saveSettings } from './services/settingsService';

function PortfolioApp() {
  const { notifySuccess, notifyError, notifyInfo } = useToast();

  // Primary Data State
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [settings, setSettings] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Operation Loading States
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [isSavingCert, setIsSavingCert] = useState(false);
  const [isDeletingCert, setIsDeletingCert] = useState(false);

  // Central Management Modals
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load all initial data from IndexedDB
  const loadAllData = useCallback(async () => {
    try {
      setIsLoadingData(true);
      const [projList, certList, settingsData] = await Promise.all([
        getProjects(),
        getCertifications(),
        getSettings(),
      ]);
      setProjects(projList);
      setCertifications(certList);
      setSettings(settingsData);
    } catch (err) {
      console.error('Failed to load portfolio database:', err);
      notifyError('Failed to load database: ' + err.message);
    } finally {
      setIsLoadingData(false);
    }
  }, [notifyError]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Project CRUD Handlers
  const handleSaveProject = async (projectData) => {
    try {
      setIsSavingProject(true);
      const isNew = !projectData.id;
      const saved = await saveProject(projectData);
      setProjects((prev) => {
        const index = prev.findIndex((p) => p.id === saved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = saved;
          return updated;
        }
        return [saved, ...prev];
      });
      notifySuccess(isNew ? 'New project added successfully!' : 'Project updated successfully!');
      return saved;
    } catch (err) {
      notifyError('Unable to save project: ' + err.message);
      return null;
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      setIsDeletingProject(true);
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      notifySuccess('Project deleted successfully.');
      return true;
    } catch (err) {
      notifyError('Unable to delete project: ' + err.message);
      return false;
    } finally {
      setIsDeletingProject(false);
    }
  };

  // Certification CRUD Handlers
  const handleSaveCertification = async (certData) => {
    try {
      setIsSavingCert(true);
      const isNew = !certData.id;
      const saved = await saveCertification(certData);
      setCertifications((prev) => {
        const index = prev.findIndex((c) => c.id === saved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = saved;
          return updated;
        }
        return [saved, ...prev];
      });
      notifySuccess(isNew ? 'New certification added successfully!' : 'Certification updated successfully!');
      return saved;
    } catch (err) {
      notifyError('Unable to save certification: ' + err.message);
      return null;
    } finally {
      setIsSavingCert(false);
    }
  };

  const handleDeleteCertification = async (id) => {
    try {
      setIsDeletingCert(true);
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((c) => c.id !== id));
      notifySuccess('Certification deleted successfully.');
      return true;
    } catch (err) {
      notifyError('Unable to delete certification: ' + err.message);
      return false;
    } finally {
      setIsDeletingCert(false);
    }
  };

  // Settings Handlers
  const handleSaveSettings = async (newSettings) => {
    const updated = await saveSettings(newSettings);
    setSettings(updated);
    return updated;
  };

  // Resume Download Handler
  const handleDownloadResume = () => {
    if (settings?.customResumeDataUrl) {
      const a = document.createElement('a');
      a.href = settings.customResumeDataUrl;
      a.download = settings.resumeFileName || 'Adithya_G_Mechanical_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      notifySuccess('Downloading custom resume PDF...');
    } else {
      const a = document.createElement('a');
      a.href = '/resume.pdf';
      a.download = 'Adithya_G_Mechanical_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      notifyInfo('Downloading resume PDF (/public/resume.pdf)...');
    }
  };

  return (
    <div className="min-h-screen bg-lab-950 text-slate-100 flex flex-col selection:bg-cyan-glow/20 selection:text-cyan-glow">
      {/* Sticky Navigation */}
      <Navbar
        onOpenManage={() => setIsManageModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <Hero
          settings={settings}
          onDownloadResume={handleDownloadResume}
        />

        {/* ABOUT SECTION */}
        <About />

        {/* SKILLS SECTION */}
        <Skills />

        {/* PROJECTS SECTION */}
        <Projects
          projects={projects}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
          onOpenManage={() => setIsManageModalOpen(true)}
          isSaving={isSavingProject}
          isDeleting={isDeletingProject}
        />

        {/* RESEARCH & MATERIALS SECTION */}
        <Research />

        {/* CAD & CAE SECTION */}
        <CADCAE />

        {/* CERTIFICATIONS SECTION */}
        <Certifications
          certifications={certifications}
          onSaveCertification={handleSaveCertification}
          onDeleteCertification={handleDeleteCertification}
          isSaving={isSavingCert}
          isDeleting={isDeletingCert}
        />

        {/* AI × ENGINEERING SECTION */}
        <AIEngineering />

        {/* ARTICLES SECTION */}
        <Articles />

        {/* RESUME SECTION */}
        <Resume
          settings={settings}
          onDownloadResume={handleDownloadResume}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />

        {/* CONTACT SECTION */}
        <Contact
          settings={settings}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenManage={() => setIsManageModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Central Management Modals */}
      <ManagePortfolioModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        projects={projects}
        certifications={certifications}
        onOpenAddProject={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onEditProject={(proj) => {
          // Handled via Projects component
        }}
        onDeleteProject={async (proj) => {
          if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
            await handleDeleteProject(proj.id);
          }
        }}
        onOpenAddCertification={() => {
          const el = document.getElementById('certifications');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onEditCertification={(cert) => {
          // Handled via Certifications component
        }}
        onDeleteCertification={async (cert) => {
          if (window.confirm(`Are you sure you want to delete "${cert.name}"?`)) {
            await handleDeleteCertification(cert.id);
          }
        }}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataRestored={loadAllData}
      />

      <PortfolioSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onResetFactoryData={loadAllData}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioApp />
    </ToastProvider>
  );
}

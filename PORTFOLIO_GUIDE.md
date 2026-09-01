# Mechanical Engineering Portfolio Guide (Adithya G)

This guide provides complete operational instructions for managing your portfolio website, uploading CAD models and certifications, preserving data safety, and configuring settings.

---

## Table of Contents
1. [Adding a New Mechanical Engineering Project](#1-adding-a-new-mechanical-engineering-project)
2. [Uploading CAD Renders and Technical Drawings](#2-uploading-cad-renders-and-technical-drawings)
3. [Editing Existing Projects & Sample Projects](#3-editing-existing-projects--sample-projects)
4. [Deleting Projects & Sample Content Persistence Guarantee](#4-deleting-projects--sample-content-persistence-guarantee)
5. [Managing Certifications (PDF & Image Uploads)](#5-managing-certifications-pdf--image-uploads)
6. [Configuring Resume & Contact Information](#6-configuring-resume--contact-information)
7. [Backup & Restore System](#7-backup--restore-system)
8. [How Browser Storage (IndexedDB) Works](#8-how-browser-storage-indexeddb-works)
9. [Supported File Types & Size Limits](#9-supported-file-types--size-limits)
10. [WebGL Resilience & 2D Schematic Fallback](#10-webgl-resilience--2d-schematic-fallback)

---

## 1. Adding a New Mechanical Engineering Project

1. Open the portfolio in your browser and scroll to the **Projects** section (or click **+ ADD PROJECT** in the top navigation / management bar).
2. The **Add Project Modal** will open with the following fields:
   - **Project Title** *(Required)*: e.g. `Centrifugal Pump Impeller Fluid Flow Simulation`
   - **Category** *(Required)*: Choose from `CAD DESIGN`, `CAE / FEA`, `CFD / FLUIDS`, `THERMAL`, `RESEARCH & MATERIALS`, `MANUFACTURING`, `AUTOMATION`, `AI × ENGINEERING`.
   - **Project Year & Role**: e.g. `2024`, `Lead CAD Modeler`
   - **Status**: `Completed`, `In Progress`, `Research Phase`, or `Prototyping`.
   - **Description**: High-level overview of the engineering project.
   - **Engineering Problem & Solution**: Outline the challenge (e.g. cavitation, stress concentration) and how you solved it.
   - **Objective & Methodology**: Standards applied (e.g. `ASME Section VIII`, `ASTM D638`, `TEMA R`).
   - **Tools / Software**: Comma-separated list (e.g. `SolidWorks, ANSYS Fluent, MATLAB`).
   - **Engineering Skills**: Comma-separated list (e.g. `3D CAD, Turbomachinery, Mesh Generation`).
   - **Key Features**: Multi-line list of technical specifications (one per line).
   - **Results & Outcome**: Quantitative metrics (e.g. `Max stress 210 MPa (SF 2.1), Pressure drop 32 kPa`).
   - **Project Links**: Optional external documentation or GitHub repository links.
3. Upload your CAD renders (see Section 2).
4. Click **SAVE PROJECT**. The project will immediately appear in your portfolio.

---

## 2. Uploading CAD Renders and Technical Drawings

You can upload your actual SolidWorks screenshots, ANSYS FEA stress contours, CFD streamline plots, or prototype photos directly:

1. In the Add/Edit Project form, locate the **UPLOAD CAD IMAGES & RENDERS** section.
2. Drag and drop your image files into the dashed drop zone, or click **BROWSE FILES**.
3. **Supported Formats**: `JPG`, `JPEG`, `PNG`, `WEBP`.
4. **Multiple Images**: You can upload multiple views (Isometric, Front, Section View, Exploded View).
5. **Cover Image Selection**: Click the **Star icon** on any uploaded image to set it as the primary card cover thumbnail.
6. **Reordering**: Use the **Up/Down arrow buttons** to change the order in which images appear in the Lightbox Gallery.
7. **Removing**: Click the **Trash icon** on any individual image to remove it.

---

## 3. Editing Existing Projects & Sample Projects

Every project displayed on the portfolio—including initial sample/demo projects—can be edited at any time:

1. Click the **Edit icon (pencil)** on any project card, or open the project dossier and click **EDIT**.
2. All existing fields, tools, and attached CAD images will be pre-filled into the form.
3. Modify any field, add new images, replace the cover image, or update outcomes.
4. If you attempt to close the form with unsaved edits, an **Unsaved Changes Warning** will prevent accidental data loss.
5. Click **SAVE CHANGES**. The project updates immediately in IndexedDB.

---

## 4. Deleting Projects & Sample Content Persistence Guarantee

### How Deletion Works:
1. Click the **Trash icon** on any project card or inside the Project Details view.
2. A **Confirm Deletion Modal** will prompt you with the project title and a warning that deletion is permanent.
3. Click **DELETE PROJECT**.

### Persistence Guarantee:
- Sample projects and user-created projects share the **exact same IndexedDB database store**.
- Initial sample data is seeded only on the very first time the portfolio runs in your browser.
- Once you delete a sample project, it is permanently removed from IndexedDB and **will NEVER reappear upon refreshing the browser or restarting the application**.

---

## 5. Managing Certifications (PDF & Image Uploads)

The **Certifications & Credentials** section operates independently with its own persistent store:

### Adding a Certification:
1. Scroll to the **Certifications** section and click **+ ADD CERTIFICATION**.
2. Enter:
   - **Certificate Name** *(Required)*: e.g. `Certified SOLIDWORKS Professional (CSWP)`
   - **Issuing Organization** *(Required)*: e.g. `Dassault Systèmes`
   - **Issue Date** *(Required)* and optional Expiry Date.
   - **Credential ID & URL**: For digital verification.
   - **Skills / Topics Covered**: Comma-separated (e.g. `SolidWorks, Part Modeling, Assembly Design`).
   - **Certificate File**: Drag & drop or upload a `PDF`, `JPG`, or `PNG` document.
3. Click **SAVE CERTIFICATION**.

### Viewing & Downloading:
- Click **VIEW CREDENTIAL** on any card to open the interactive viewer.
- For PDFs, an embedded document reader allows viewing and direct downloading.
- For images, a zoomable high-resolution viewer with fullscreen mode is provided.

### Editing & Deleting Certifications:
- Click **Edit** or **Delete** on any card.
- Sample demo certifications can be edited or permanently deleted; once deleted, they will never return.

---

## 6. Configuring Resume & Contact Information

You can customize your personal links, contact information, and resume file directly without modifying source code:

1. Click **SETTINGS** in the navigation bar or in the **Resume / Contact** sections.
2. The **Portfolio Settings Modal** allows you to update:
   - **Primary Contact Email**
   - **GitHub Profile URL**
   - **LinkedIn Profile URL**
   - **Hero Subtitle & Bio Description**
   - **Custom Resume PDF**: Upload a custom `resume.pdf` directly into browser storage.
3. Click **SAVE SETTINGS**. The portfolio will instantly reflect the updated links and bio.
4. Alternatively, you can drop your static resume file into `/public/resume.pdf` in the project folder.

---

## 7. Backup & Restore System

Because all data is stored locally in your browser, the portfolio includes a reliable **Backup & Restore tool**:

### Creating a Backup:
1. Click **MANAGE** in the navigation bar and select **BACKUP & RESTORE** (or click the Database icon in the footer).
2. Click **EXPORT DATA**.
3. A JSON backup archive (`adithya-g-portfolio-backup-[timestamp].json`) containing all your projects, full-resolution CAD images, certifications, PDF files, and settings will be downloaded to your computer.

### Restoring from a Backup:
1. Open **BACKUP & RESTORE** on any computer or browser.
2. Select your exported JSON backup file.
3. The system validates the schema and displays the project and certification counts.
4. Choose your restore strategy:
   - **Replace Existing Data**: Clears current records and installs the backup archive.
   - **Merge with Existing**: Appends backup items to your current repository.
5. Click **RESTORE PORTFOLIO DATABASE**.

---

## 8. How Browser Storage (IndexedDB) Works

- **Storage Technology**: The portfolio uses **IndexedDB** (`AdithyaMechPortfolioDB_v1`), a high-performance transactional object database native to modern web browsers (Chrome, Edge, Firefox, Safari).
- **Data Retention**: Unlike temporary session state or `localStorage` (which is limited to ~5MB), IndexedDB can store hundreds of megabytes of binary CAD images and PDFs.
- **Persistence Guarantee**: Your projects and certifications remain safely stored across browser tab closures, page reloads, and computer restarts.
- **Storage Telemetry**: You can check your estimated storage usage anytime inside **MANAGE $\rightarrow$ STORAGE TELEMETRY**.

---

## 9. Supported File Types & Size Limits

| Data Type | Supported Formats | Recommended Limit | Storage Location |
| :--- | :--- | :--- | :--- |
| **Project CAD Images** | `JPG`, `JPEG`, `PNG`, `WEBP` | Up to 15 MB per image | Browser IndexedDB |
| **Certifications** | `PDF`, `JPG`, `JPEG`, `PNG`, `WEBP` | Up to 15 MB per file | Browser IndexedDB |
| **Resume** | `PDF` | Up to 15 MB | IndexedDB / `/public/resume.pdf` |
| **Backup Archive** | `JSON` | Complete archive | Downloaded File |

---

## 10. WebGL Resilience & 2D Schematic Fallback

- The **3D Mechanical Assembly** in the Hero section runs on WebGL using Three.js and React Three Fiber.
- **Automatic Fallback Protection**: If WebGL is unavailable, fails to initialize, or context is lost, the application automatically switches to an animated **2D CAD Blueprint Vector Schematic** without throwing runtime exceptions or crashing the page.
- Users can also manually toggle between **3D CAD Render** and **2D Blueprint Schematic** mode using the HUD controls.

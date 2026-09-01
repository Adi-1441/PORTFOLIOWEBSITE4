/**
 * Image & File Utility Service for CAD/Engineering Artifacts
 * Handles file validation, reading, compression, and dimension extraction.
 */

export const MAX_IMAGE_SIZE_MB = 15;
export const MAX_FILE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const SUPPORTED_CERT_TYPES = [...SUPPORTED_IMAGE_TYPES, 'application/pdf'];

/**
 * Validate an image or PDF file before processing
 */
export function validateFile(file, isCert = false) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  const allowedTypes = isCert ? SUPPORTED_CERT_TYPES : SUPPORTED_IMAGE_TYPES;
  const fileType = file.type?.toLowerCase() || '';

  if (!allowedTypes.includes(fileType)) {
    const supportedList = isCert ? 'JPG, PNG, WEBP, or PDF' : 'JPG, PNG, or WEBP';
    return {
      valid: false,
      error: `Unsupported file format (${file.type || 'unknown'}). Please upload ${supportedList}.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the ${MAX_IMAGE_SIZE_MB}MB limit.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Convert a File object to a Base64 data URL
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(new Error('Failed to read file: ' + (err?.message || 'Read error')));
    reader.readAsDataURL(file);
  });
}

/**
 * Optional smart client-side optimization to prevent browser storage exhaustion
 * while preserving CAD line sharpness and technical fidelity.
 */
export async function optimizeImageIfNeeded(file) {
  if (file.type === 'application/pdf') {
    const dataUrl = await readFileAsDataURL(file);
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl,
      isPdf: true,
    };
  }

  const rawDataUrl = await readFileAsDataURL(file);

  // If image is already reasonably sized (< 2MB), keep original unmodified
  if (file.size < 2 * 1024 * 1024) {
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: rawDataUrl,
      isPdf: false,
    };
  }

  // If larger, optimize resolution on canvas if exceeding 2800px max dimension
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 2560;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.92);
          resolve({
            name: file.name,
            type: file.type === 'image/png' ? 'image/png' : 'image/jpeg',
            size: Math.round((compressedDataUrl.length * 3) / 4),
            dataUrl: compressedDataUrl,
            width,
            height,
            isPdf: false,
          });
          return;
        }
      }

      // Default to original data
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: rawDataUrl,
        width: img.width,
        height: img.height,
        isPdf: false,
      });
    };

    img.onerror = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: rawDataUrl,
        isPdf: false,
      });
    };

    img.src = rawDataUrl;
  });
}

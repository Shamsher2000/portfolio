import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration for PDF-based resume seeding
 * Specifies where to find and how to process PDF files
 */
export const pdfConfig = {
  // Directory where resume PDFs are stored
  resumeDir: process.env.RESUME_PDF_DIR || path.resolve(__dirname, '../../../public/resume'),
  
  // Primary resume file name (the file to parse)
  primaryResume: process.env.PRIMARY_RESUME_NAME || 'resume.pdf',
  
  // Enable automatic reseeding on startup
  autoReseedOnStartup: process.env.AUTO_RESEED !== 'false', // true by default
  
  // Fallback mode: if PDF parsing fails, should we use fallback data?
  useFallbackOnError: process.env.USE_FALLBACK_ON_ERROR !== 'false', // true by default
};

/**
 * Get the full path to the primary resume PDF
 */
export function getPrimaryResumePath() {
  return path.join(pdfConfig.resumeDir, pdfConfig.primaryResume);
}

/**
 * Ensure resume directory exists
 */
export function ensureResumeDirectory() {
  if (!fs.existsSync(pdfConfig.resumeDir)) {
    fs.mkdirSync(pdfConfig.resumeDir, { recursive: true });
    console.log(`Created resume directory at: ${pdfConfig.resumeDir}`);
  }
}

/**
 * Check if primary resume file exists
 */
export function primaryResumeExists() {
  return fs.existsSync(getPrimaryResumePath());
}

/**
 * Get all PDF files in the resume directory
 */
export function getAllResumePDFs() {
  ensureResumeDirectory();
  
  try {
    const files = fs.readdirSync(pdfConfig.resumeDir);
    return files.filter(file => file.toLowerCase().endsWith('.pdf'));
  } catch (error) {
    console.error(`Error reading resume directory: ${error.message}`);
    return [];
  }
}

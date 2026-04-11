import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { getPortfolio, reseedFromPDF } from './services/portfolioService.js';
import { getPrimaryResumePath, primaryResumeExists } from './config/pdfConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/profile', async (_req, res, next) => {
  try {
    const profile = await getPortfolio();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

/**
 * Download resume PDF endpoint
 * Serves the actual PDF file from public/resume/resume.pdf
 * GET /api/resume/download
 */
app.get('/api/resume/download', (_req, res, next) => {
  try {
    const resumePath = getPrimaryResumePath();
    
    if (!primaryResumeExists()) {
      return res.status(404).json({
        error: 'Resume file not found',
        message: 'The resume PDF file is not available for download.',
      });
    }

    // Set appropriate headers for file download
    res.download(resumePath, 'Shamsher_Tiwari_resume.pdf', (err) => {
      if (err) {
        console.error('Error downloading resume:', err);
        if (!res.headersSent) {
          next(err);
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get resume file info (metadata)
 * Returns filename, size, and availability
 * GET /api/resume/info
 */
app.get('/api/resume/info', (_req, res, next) => {
  try {
    const resumePath = getPrimaryResumePath();
    
    if (!primaryResumeExists()) {
      return res.json({
        available: false,
        message: 'Resume file not found',
      });
    }

    const stats = fs.statSync(resumePath);
    
    res.json({
      available: true,
      filename: 'Shamsher_Tiwari_resume.pdf',
      path: '/api/resume/download',
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      lastModified: stats.mtime,
      downloadUrl: '/api/resume/download',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Endpoint to reseed portfolio from updated PDF
 * Useful if you update your resume and want to reload without restarting
 * POST /api/admin/reseed
 */
app.post('/api/admin/reseed', async (_req, res, next) => {
  try {
    const updatedProfile = await reseedFromPDF();
    res.json({
      success: true,
      message: 'Portfolio reseeded successfully from PDF',
      profile: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
});

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      next();
      return;
    }

    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: 'Something went wrong while loading the portfolio.',
  });
});

export default app;

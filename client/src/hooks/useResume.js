import { useState, useCallback } from 'react';

/**
 * Custom hook for handling resume download functionality
 * Uses static resume file for frontend-only deployment
 */
export function useResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadResume = useCallback(async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Use static resume file from public directory
      const resumeUrl = '/resume.pdf';

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Shamsher_Tiwari_resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('✅ Resume download initiated');
    } catch (error) {
      console.error('❌ Download error:', error);
      setDownloadError(error.message || 'Failed to download resume');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadResume,
    isDownloading,
    downloadError,
  };
}

/**
 * Custom hook for fetching resume metadata
 * Returns static resume information for frontend-only deployment
 */
export function useResumeInfo() {
  const resumeInfo = {
    available: true,
    filename: 'Shamsher_Tiwari_resume.pdf',
    path: '/resume.pdf',
    size: 245000, // Approximate size in bytes
    sizeKB: 245,
    lastModified: new Date('2024-01-15'),
    downloadUrl: '/resume.pdf',
  };

  return {
    resumeInfo,
    loading: false,
    error: null,
    refetch: () => {}, // No-op for static data
  };
}

/**
 * Custom hook for handling portfolio refresh/reseed
 * Disabled for frontend-only deployment
 */
export function usePortfolioReseed() {
  const triggerReseed = useCallback(async () => {
    console.log('ℹ️ Portfolio reseed not available in frontend-only mode');
    // No-op for static data
  }, []);

  return {
    triggerReseed,
    isReseeding: false,
    reseedError: null,
  };
}

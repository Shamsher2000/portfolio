import { useState, useCallback } from 'react';

/**
 * Custom hook for handling resume download functionality
 * Manages download state, errors, and triggers API calls
 */
export function useResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadResume = useCallback(async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Use environment variable for API URL, otherwise fallback to same host on port 5000
      const defaultBackendUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
      const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
      
      // Fetch the resume from the API endpoint
      const response = await fetch(`${API_BASE}/api/resume/download`);

      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Shamsher_Tiwari_resume.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      console.log('✅ Resume downloaded successfully');
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
 * Gets file info like size, last modified date, etc.
 */
export function useResumeInfo() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumeInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Use environment variable for API URL, otherwise fallback to same host on port 5000
      const defaultBackendUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
      const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
      
      const response = await fetch(`${API_BASE}/api/resume/info`);

      if (!response.ok) {
        throw new Error('Failed to fetch resume info');
      }

      const data = await response.json();
      setResumeInfo(data);
    } catch (err) {
      console.error('Error fetching resume info:', err);
      setError(err.message);
      setResumeInfo({ available: false });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    resumeInfo,
    loading,
    error,
    refetch: fetchResumeInfo,
  };
}

/**
 * Custom hook for handling portfolio refresh/reseed
 * Allows updating the portfolio from a newly modified resume
 */
export function usePortfolioReseed() {
  const [isReseeding, setIsReseeding] = useState(false);
  const [reseedError, setReseedError] = useState(null);

  const triggerReseed = useCallback(async () => {
    setIsReseeding(true);
    setReseedError(null);

    try {
      // Use environment variable for API URL, otherwise fallback to same host on port 5000
      const defaultBackendUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
      const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
      
      const response = await fetch(`${API_BASE}/api/admin/reseed`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Reseed failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Portfolio reseeded successfully');

      // Optional: trigger page refresh or state update
      // You might want to reload the profile or notify the user
      return data;
    } catch (error) {
      console.error('❌ Reseed error:', error);
      setReseedError(error.message || 'Failed to reseed portfolio');
      throw error;
    } finally {
      setIsReseeding(false);
    }
  }, []);

  return {
    triggerReseed,
    isReseeding,
    reseedError,
  };
}

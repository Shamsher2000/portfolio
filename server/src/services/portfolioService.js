import mongoose from 'mongoose';
import { loadPortfolioData, fallbackPortfolioData } from '../data/seedPortfolio.js';
import { Portfolio } from '../models/Portfolio.js';
import { ensureResumeDirectory } from '../config/pdfConfig.js';

// Cache the loaded portfolio data
let cachedPortfolioData = null;

/**
 * Initialize portfolio data on service startup
 * Loads from PDF if available, otherwise uses fallback
 */
export async function initializePortfolio() {
  try {
    ensureResumeDirectory();
    cachedPortfolioData = await loadPortfolioData();
    
    return cachedPortfolioData;
  } catch (error) {
    console.error('Error initializing portfolio:', error.message);
    cachedPortfolioData = fallbackPortfolioData;
    return cachedPortfolioData;
  }
}

/**
 * Get portfolio data from database or return cached data
 */
export async function getPortfolio() {
  // Ensure data is loaded
  if (!cachedPortfolioData) {
    await initializePortfolio();
  }

  // Try to get from database first
  if (mongoose.connection.readyState === 1) {
    try {
      const profile = await Portfolio.findOne({ slug: cachedPortfolioData.slug }).lean();
      if (profile) {
        return profile;
      }
    } catch (error) {
      console.warn('Error reading from database, using cache:', error.message);
    }
  }

  return cachedPortfolioData;
}

/**
 * Reseed the portfolio data from PDF
 * Useful if you've updated your resume PDF and want to reload without restarting
 */
export async function reseedFromPDF() {
  try {
    cachedPortfolioData = await loadPortfolioData();
    
    // Update database if connected
    if (mongoose.connection.readyState === 1) {
      await Portfolio.findOneAndUpdate(
        { slug: cachedPortfolioData.slug },
        cachedPortfolioData,
        { upsert: true, new: true }
      );
    }
    
    console.log('✅ Portfolio reseeded successfully');
    return cachedPortfolioData;
  } catch (error) {
    console.error('Error reseeding portfolio:', error.message);
    throw error;
  }
}

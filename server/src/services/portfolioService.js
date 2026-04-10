import mongoose from 'mongoose';
import { seedPortfolio } from '../data/seedPortfolio.js';
import { Portfolio } from '../models/Portfolio.js';

export async function getPortfolio() {
  if (mongoose.connection.readyState === 1) {
    const profile = await Portfolio.findOne({ slug: seedPortfolio.slug }).lean();
    if (profile) {
      return profile;
    }
  }

  return seedPortfolio;
}

import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    strict: false,
    timestamps: true,
    collection: 'portfolio',
  },
);

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

import mongoose from 'mongoose';

let hasLoggedFallback = false;

export async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    if (!hasLoggedFallback) {
      console.log('MONGO_URI not found. Serving the portfolio from local seeded data.');
      hasLoggedFallback = true;
    }
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB.');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed. Falling back to seeded portfolio data.', error.message);
    return null;
  }
}

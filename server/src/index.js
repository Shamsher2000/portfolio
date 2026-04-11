import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/db.js';
import { initializePortfolio } from './services/portfolioService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    // Initialize portfolio (loads from PDF or fallback)
    await initializePortfolio();
    
    // Connect to database
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`Portfolio server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

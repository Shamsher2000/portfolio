#!/usr/bin/env node

/**
 * Utility script to reseed portfolio from updated PDF
 * Usage: npm run reseed-cli
 * 
 * This script makes an API call to the reseed endpoint to reload
 * portfolio data from the PDF without restarting the server.
 */

import http from 'http';

const hostname = process.env.SERVER_HOST || 'localhost';
const port = process.env.PORT || 5000;

// Make POST request to reseed endpoint
const options = {
  hostname,
  port,
  path: '/api/admin/reseed',
  method: 'POST',
  headers: {
    'Content-Length': 0,
  },
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅', response.message);
        console.log('📊 Portfolio updated with new data');
      } else {
        console.error('❌ Reseed failed:', response.message);
        process.exit(1);
      }
    } catch {
      console.error('❌ Server responded with invalid JSON');
      console.error('Response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error connecting to server:', error.message);
  console.error(`\nMake sure the server is running on ${hostname}:${port}`);
  console.error(`Start with: npm run dev`);
  process.exit(1);
});

console.log(`🔄 Requesting portfolio reseed from ${hostname}:${port}...`);
req.end();

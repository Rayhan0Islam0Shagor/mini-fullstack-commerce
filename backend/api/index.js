// Re-export the app from server.js for Vercel serverless functions
// This file is required by Vercel's routing, but all the actual
// configuration is in server.js to avoid code duplication
export { default } from '../server.js';

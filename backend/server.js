import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/connectDB.js';
// import swaggerUi from 'swagger-ui-express';
// import { swaggerSpec } from './config/swagger.js';
import { ProductRoutes } from './src/modules/product/product.route.js';
import { CategoryRoutes } from './src/modules/category/category.route.js';

// Load environment variables
try {
  dotenv.config();
} catch (error) {
  // dotenv.config() failed
}

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed origins
      const isAllowed = allowedOrigins.some((allowed) => {
        if (!allowed) return false;
        // Check exact match or if origin starts with allowed origin
        return origin === allowed || origin.startsWith(allowed);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        // For Vercel deployments, allow all vercel.app domains (including preview URLs)
        if (process.env.VERCEL || process.env.VERCEL_ENV) {
          if (origin.includes('.vercel.app')) {
            callback(null, true);
          } else {
            callback(null, true);
          }
        } else {
          callback(null, true); // For now, allow all in development
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-api-key',
      'X-Requested-With',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  }),
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Swagger API Documentation
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     customCss: '.swagger-ui .topbar { display: none }',
//     customSiteTitle: 'Ecommerce API Documentation',
//     customfavIcon: '/favicon.ico',
//   }),
// );

// Connect to MongoDB (non-blocking)
connectDB();

// Routes
app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/category', CategoryRoutes);

// Global error handler (must be after all routes)
app.use((err, req, res, next) => {
  // If response already sent, delegate to default error handler
  if (res.headersSent) {
    return next(err);
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Format response
  const response = {
    success: false,
    message,
  };

  // Add error details in development
  if (process.env.NODE_ENV === 'development') {
    response.error = err.stack;
  }

  res.status(statusCode).json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Documentation: http://localhost:${PORT}`);
});

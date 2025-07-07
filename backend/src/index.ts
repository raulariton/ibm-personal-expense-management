import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dataSource from '@config/database';
import authRoutes from '@routes/authRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

// middleware to parse JSON requests
app.use(express.json());
// middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// middleware to parse cookies
app.use(cookieParser());

// configure routes
app.use('/auth', authRoutes);

dataSource
  .initialize()
  .then(async () => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // enable port reusing
    server.on('listening', () => {
      server.setMaxListeners(0);
    });

    // handle graceful shutdown
    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server terminated gracefully...');
        dataSource
          .destroy()
          .then(() => {
            console.log('Database connection closed.');
            process.exit(0);
          })
          .catch((err) => {
            console.error('Error closing database connection:', err);
            process.exit(1);
          });
      });
    });

    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Server interrupted, shutting down...');
        dataSource
          .destroy()
          .then(() => {
            console.log('Database connection closed.');
            process.exit(0);
          })
          .catch((err) => {
            console.error('Error closing database connection:', err);
            process.exit(1);
          });
      });
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

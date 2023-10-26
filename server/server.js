// server/server.js 

import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import setupRoutes from './routes.js';

const { Pool } = pg;

dotenv.config();

const app = express();


// Database connection
export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Setup routes
app.use(express.json()); // Enable JSON body parsing middleware
setupRoutes(app);

export default app;

// server.js
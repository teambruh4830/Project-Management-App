import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/API/API'; // Adjust if your routes are defined differently

dotenv.config();
const app = express();

app.use(express.json()); // Middleware for JSON body parsing

// Use your API routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

export default app; // Export the app
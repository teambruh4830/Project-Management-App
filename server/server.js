import path from 'path';
import express from 'express';
import client from './db/client.js';
import usersRouter from './api/users.js';
import projectsRouter from './api/projects.js';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const server = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, 'build');
const port = process.env.PORT || 4000;

client.connect();

server.use(express.static(publicPath));
server.use(cors());
server.use(express.json());
server.use(morgan('tiny'));

server.get('/', (req, res) => {
    console.log('server is working');
    res.send({ message: 'server get' });
});

// Register routes directly on the server instance
server.get('/api', (req, res) => {
    res.send({message: 'api get'});
});

server.use('/api/users', usersRouter);
server.use('/api/projects', projectsRouter);

// Catch-all route for serving index.html
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let serverInstance = server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

export { client, server, serverInstance };

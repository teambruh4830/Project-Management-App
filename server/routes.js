// server/routes.js

import { pool } from './server.js'; // Ensure this is correctly exporting pool
import { Project, Ticket, User } from './objects.js';

const setupRoutes = (app) => {
    userRoutes(app);
    projectRoutes(app);
    ticketRoutes(app);
};

export default setupRoutes;

const projectRoutes = (app) => {
    app.post('/project', async (req, res) => {
        const project = new Project(null, req.body.name, req.body.description, req.body.owner_id, null, null);
        await project.save();
        res.json(project);
    });

    app.get('/project/:id', async (req, res) => {
        const project = new Project(req.params.id);
        if (project.id) {
            res.json(project);
        } else {
            res.status(404).send('Project not found');
        }
    });

    app.delete('/project/:id', async (req, res) => {
        const project = new Project(req.params.id);
        await project.delete();
        res.status(204).send();
    });
};

const ticketRoutes = (app) => {
    app.post('/ticket', async (req, res) => {
        const ticket = new Ticket(null, req.body.title, req.body.description, req.body.status, req.body.project_id, req.body.creator_user_id, req.body.assigned_user_id, null, null);
        await ticket.save();
        res.json(ticket);
    });

    app.put('/ticket/:id', async (req, res) => {
        const ticket = new Ticket(req.params.id, req.body.title, req.body.description, req.body.status);
        await ticket.save();
        res.json(ticket);
    });

    app.delete('/ticket/:id', async (req, res) => {
        const ticket = new Ticket(req.params.id);
        await ticket.delete();
        res.status(204).send();
    });
};

const userRoutes = (app) => {
    app.post('/user', async (req, res) => {
        const user = new User(null, req.body.username, req.body.email, req.body.password, null, null);
        await user.save();
        res.json(user);
    });

    app.delete('/user/:id', async (req, res) => {
        const user = new User(req.params.id);
        await user.delete();
        res.status(204).send();
    });
};




// routes.js

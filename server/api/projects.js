import express from 'express';

import {
    createUser,
    getUser,
    createTicket,
    getTickets
} from '../db/users.js';

import { 
    createProject,
    getProjects,
    getProject,
    getProjectCount,
    editProject,
    deleteProject,
    deleteProjectsByTicketId,
    updateTicket,
    deleteTicketById 
} from '../db/projects.js';

const router = express.Router();

router.get('/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await getProject({ projectId });
        res.send(project);
    } catch (error) {
        console.error('error getting project card');
        throw error;
    }
});

router.post('/', async (req, res) => {
    const { userId, ticketId, title, desc } = req.body;

    try {
        const newProject = await createProject({ userId, ticketId, title, desc });
        res.send(newProject);
    } catch (error) {
        throw error;
    }
});

router.post('/:projectId/tickets', async (req, res) => {
    const { projectId, newTicketId } = req.body;

    try {
        const newTicket = await updateTicket({ projectId, newTicketId });
        res.send(newTicket);
    } catch (error) {
        throw error;
    }
});

router.post('/:ticketId/delete', async (req, res) => {
    const { ticketId } = req.body;

    try {
        const deletedProjects = await deleteProjectsByTicketId({ ticketId });
        const deletedTicket = await deleteTicketById({ ticketId });
        res.send({ tickets: deletedTicket, projects: deletedProjects });
    } catch (error) {
        throw error;
    }
});

router.post('/:projectId/edit', async (req, res) => {
    const { projectId, newTitle, newDesc } = req.body;

    try {
        const project = await editProject({ projectId, newTitle, newDesc });
        res.send(project);
    } catch (error) {
        console.error('edit api section');
        throw error;
    }
});

router.delete('/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await deleteProject({ projectId });
        res.send(project);
    } catch (error) {
        console.error(`could not delete this project ${projectId}`);
        throw error;
    }
});


export default router;
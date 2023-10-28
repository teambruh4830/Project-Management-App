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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUser({ username, password });
        res.send(user);
    } catch (error) {
        console.error('could not post');
        throw error;
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await createUser({ username, password });

        const ticketsToCreate = [
            { userId: user.id, type: 'To Do' },
            { userId: user.id, type: 'In Progress' },
            { userId: user.id, type: 'Completed' }
        ];
        ticketsToCreate.map(async (ticket) => {
            const userTickets = await createTicket(ticket);
            await createProject({ userId: user.id, ticketId: userTickets[0].id, title: 'Project Card', desc: 'Description of your project' });
        });

        res.send(user);
    } catch (error) {
        throw error;
    }
});

router.get('/:userId/tickets', async (req, res) => {
    const { userId } = req.params;

    try {
        const projectTickets = await getTickets({ userId });
        const projectCount = await getProjectCount({ userId });
        projectTickets.map(ticket => {
            projectCount.map(count => {
                if (ticket.id === count.ticketId) {
                    ticket.count = count.count;
                }
            });
        });

        res.send(projectTickets);
    } catch (error) {
        console.error('could not get tickets');
        throw error;
    }
});

router.post('/:userId/tickets', async (req, res) => {
    const { userId, type } = req.body;

    try {
        const ticket = await createTicket({ userId, type });
        res.send(ticket);
    } catch (error) {
        throw error;
    }
});

router.get('/:userId/projects', async (req, res) => {
    const { userId } = req.params;

    try {
        const projects = await getProjects({ userId });
        res.send(projects);
    } catch (error) {
        throw error;
    }
});

router.get('/', (req, res) => {
    res.send('this is working');
});

export default router;

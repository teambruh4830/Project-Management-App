import express from 'express';
import User from '../DB/User'; 
import Project from '../DB/Project'; 
import Ticket from '../DB/Ticket'; 
import { createUser, verifyUser, getProjectsByUser, createNewProject, getTicketsByProject, createNewTicket, updateProject, updateTicket, addUserToProjectByUsername, removeUserFromProjectByUsername, deleteProject,
    deleteTicket } from '../DB/dbUtil'; 
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Welcome to the API!');
});

//------------------------------------------------------------
// USER STUFF
//------------------------------------------------------------
// Register
router.post('/users/register', async (req, res) => {
    try {
        //console.log(req.body); //Debug
        const { username, password } = req.body;
        const newUser = await createUser(username, password);
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            if (error.message === 'User already exists') {
                res.status(409).send(error.message); // 409 Conflict
            } else {
                res.status(500).send('Error registering user: ' + error.message);
            }
        } else {
            // If error is not an instance of Error, handle it as an unknown error
            res.status(500).send('Unknown error occurred');
        }
    }
});

// Sign-In
router.post('/users/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await verifyUser(username, password);
        if (user) {
            // Return relevant user details. Avoid sending sensitive information like password.
            res.status(200).json({ message: 'User signed in successfully', userId: user.id, username: user.username });
        } else {
            res.status(401).send('Invalid username or password'); // 401 Unauthorized
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error signing in: ' + error.message);
        } else {
            res.status(500).send('Unknown error occurred');
        }
    }
});

//------------------------------------------------------------
// PROJECT STUFF
//------------------------------------------------------------
// Retrieve all projects that a user is a member of (has access to)
router.get('/users/:userId/projects', async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await getProjectsByUser(parseInt(userId));
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send('Error fetching projects: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

// Create a new project
router.post('/projects', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newProject = await createNewProject(title, description);
        res.status(201).json({ message: 'Project created successfully', projectId: newProject.id });
    } catch (error) {
        res.status(500).send('Error creating project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

router.post('/projects/:projectId/users/:username', async (req, res) => {
    try {
        const { projectId, username } = req.params;
        await addUserToProjectByUsername(username, parseInt(projectId));
        res.status(200).send(`User ${username} added to project successfully`);
    } catch (error) {
        res.status(500).send('Error adding user to project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

router.delete('/projects/:projectId/users/:username', async (req, res) => {
    try {
        const { projectId, username } = req.params;
        await removeUserFromProjectByUsername(username, parseInt(projectId));
        res.status(200).send(`User ${username} removed from project successfully`);
    } catch (error) {
        res.status(500).send('Error removing user from project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

router.delete('/projects/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        await deleteProject(parseInt(projectId));
        res.status(200).send('Project deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});




// Edit a project
router.put('/projects/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const projectData = { id: parseInt(projectId), ...req.body };
        const updatedProject = await updateProject(projectData);
        res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
        res.status(500).send('Error updating project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});



//------------------------------------------------------------
// TICKET STUFF
//------------------------------------------------------------
// Retrieve all tickets associated with a project
router.get('/projects/:projectId/tickets', async (req, res) => {
    try {
        const { projectId } = req.params;
        const tickets = await getTicketsByProject(parseInt(projectId));
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).send('Error fetching tickets: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});


// Create a new ticket
router.post('/tickets', async (req, res) => {
    try {
        const ticketData = req.body; // Assuming all necessary ticket data is provided
        const newTicket = await createNewTicket(ticketData);
        res.status(201).json({ message: 'Ticket created successfully', ticketId: newTicket.id });
    } catch (error) {
        res.status(500).send('Error creating ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

// Edit a ticket
router.put('/tickets/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticketData = { id: parseInt(ticketId), ...req.body };
        const updatedTicket = await updateTicket(ticketData);
        res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
    } catch (error) {
        res.status(500).send('Error updating ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

router.delete('/tickets/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        await deleteTicket(parseInt(ticketId));
        res.status(200).send('Ticket deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});


export default router;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { createUser, verifyUser, getProjectsByUser, createNewProject, getTicketsByProject, createNewTicket, updateProject, updateTicket, addUserToProjectByUsername, removeUserFromProjectByUsername, deleteProject, deleteTicket } from '../DB/dbUtil.js';
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Welcome to the API!');
}));
//------------------------------------------------------------
// USER STUFF
//------------------------------------------------------------
// Register
router.post('/users/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body); //Debug
        const { username, password } = req.body;
        const newUser = yield createUser(username, password);
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    }
    catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            if (error.message === 'User already exists') {
                res.status(409).send(error.message); // 409 Conflict
            }
            else {
                res.status(500).send('Error registering user: ' + error.message);
            }
        }
        else {
            // If error is not an instance of Error, handle it as an unknown error
            res.status(500).send('Unknown error occurred');
        }
    }
}));
// Sign-In
router.post('/users/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield verifyUser(username, password);
        if (user) {
            // Return relevant user details. Avoid sending sensitive information like password.
            res.status(200).json({ message: 'User signed in successfully', userId: user.id, username: user.username });
        }
        else {
            res.status(401).send('Invalid username or password'); // 401 Unauthorized
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error signing in: ' + error.message);
        }
        else {
            res.status(500).send('Unknown error occurred');
        }
    }
}));
//------------------------------------------------------------
// PROJECT STUFF
//------------------------------------------------------------
// Retrieve all projects that a user is a member of (has access to)
router.get('/users/:userId/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const projects = yield getProjectsByUser(parseInt(userId));
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).send('Error fetching projects: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Create a new project
router.post('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newProject = yield createNewProject(title, description);
        res.status(201).json({ message: 'Project created successfully', projectId: newProject.id });
    }
    catch (error) {
        res.status(500).send('Error creating project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
router.post('/projects/:projectId/users/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, username } = req.params;
        yield addUserToProjectByUsername(username, parseInt(projectId));
        res.status(200).send(`User ${username} added to project successfully`);
    }
    catch (error) {
        res.status(500).send('Error adding user to project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
router.delete('/projects/:projectId/users/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, username } = req.params;
        yield removeUserFromProjectByUsername(username, parseInt(projectId));
        res.status(200).send(`User ${username} removed from project successfully`);
    }
    catch (error) {
        res.status(500).send('Error removing user from project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
router.delete('/projects/:projectId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        yield deleteProject(parseInt(projectId));
        res.status(200).send('Project deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Edit a project
router.put('/projects/:projectId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const projectData = Object.assign({ id: parseInt(projectId) }, req.body);
        const updatedProject = yield updateProject(projectData);
        res.status(200).json({ message: 'Project updated successfully', updatedProject });
    }
    catch (error) {
        res.status(500).send('Error updating project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
//------------------------------------------------------------
// TICKET STUFF
//------------------------------------------------------------
// Retrieve all tickets associated with a project
router.get('/projects/:projectId/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const tickets = yield getTicketsByProject(parseInt(projectId));
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(500).send('Error fetching tickets: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Create a new ticket
router.post('/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketData = req.body; // Assuming all necessary ticket data is provided
        const newTicket = yield createNewTicket(ticketData);
        res.status(201).json({ message: 'Ticket created successfully', ticketId: newTicket.id });
    }
    catch (error) {
        res.status(500).send('Error creating ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Edit a ticket
router.put('/tickets/:ticketId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const ticketData = Object.assign({ id: parseInt(ticketId) }, req.body);
        const updatedTicket = yield updateTicket(ticketData);
        res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
    }
    catch (error) {
        res.status(500).send('Error updating ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
router.delete('/tickets/:ticketId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        yield deleteTicket(parseInt(ticketId));
        res.status(200).send('Ticket deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
export default router;

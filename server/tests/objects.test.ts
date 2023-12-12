import client from '../src/DB/client';
import initializeDB from '../src/utils/dbInit';

import User from '../src/DB/User';
import Ticket from '../src/DB/Ticket';
import Project from '../src/DB/Project';

import { 
    getProjectsByUser, getTicketsByProject,
    getAllUsers, saveAllUsers, 
    getAllTickets, saveAllTickets, 
    getAllProjects, saveAllProjects,
} from '../src/DB/dbUtil';  // Adjust the path to dbUtil if needed


describe('Database Utilities', () => {
    
    // Connect to the DB and initialize it before all tests
    beforeAll(async () => {
        //DEBUG console.log('Begin database testing...');
        await client.connect();
        //DEBUG console.log('Connected to database.');
        await initializeDB();
        //DEBUG console.log('Initialized database.');
    });

    // Disconnect from the DB after all tests
    afterAll(async () => {
        //DEBUG console.log('End database testing.');
        await client.end();
        //DEBUG console.log('Disconnected from database.');
    });

    // Clear and populate data before each test
    beforeEach(async () => {
        await initializeDB();
    });

    test('Fetch all users from DB', async () => {
        const users = await getAllUsers();
        expect(users.length).toBeGreaterThanOrEqual(1);
        expect(users[0]).toBeInstanceOf(User);
    });

    test('Fetch all tickets from DB', async () => {
        const tickets = await getAllTickets();
        expect(tickets.length).toBeGreaterThanOrEqual(4);  // Assuming 4 tickets are seeded
        expect(tickets[0]).toBeInstanceOf(Ticket);
        expect(tickets[0]).toHaveProperty('title');
        tickets.forEach(ticket => {
            expect(ticket).toHaveProperty('title'); // Check if each ticket has a title
            // If description is optional, check if it exists or is null
            expect(ticket.description === null || typeof ticket.description === 'string').toBe(true);
        });
    });
    

    test('Fetch all projects from DB', async () => {
        const projects = await getAllProjects();
        expect(projects.length).toBeGreaterThanOrEqual(1);
        expect(projects[0]).toBeInstanceOf(Project);
    });

    test('Save all users to DB', async () => {
        const usersBefore = await getAllUsers();
        await saveAllUsers(usersBefore);
        const usersAfter = await getAllUsers();
        expect(usersBefore.length).toEqual(usersAfter.length);
    });

    test('Save all tickets to DB', async () => {
        const ticketsBefore = await getAllTickets();
        await saveAllTickets(ticketsBefore);
        const ticketsAfter = await getAllTickets();
        expect(ticketsBefore.length).toEqual(ticketsAfter.length);
    });

    test('Save all projects to DB', async () => {
        const projectsBefore = await getAllProjects();
        await saveAllProjects(projectsBefore);
        const projectsAfter = await getAllProjects();
        expect(projectsBefore.length).toEqual(projectsAfter.length);
    });

    test('Fetch the projects associated with a user', async () => {
        const users = await getAllUsers();
        const user = users[0];
        const userProjects = await getProjectsByUser(user.id);
        expect(userProjects.length).toBeGreaterThanOrEqual(1);
        expect(userProjects[0]).toBeInstanceOf(Project);
    });

    test('Fetch tickets associated with a project', async () => {
        const projects = await getAllProjects();
        const project = projects[0];
        const projectTickets = await getTicketsByProject(project.id);
        expect(projectTickets.length).toBeGreaterThanOrEqual(1);
        expect(projectTickets[0]).toBeInstanceOf(Ticket);
        projectTickets.forEach(ticket => {
            expect(ticket).toHaveProperty('title'); // Check if each ticket has a title
            // If description is optional, check if it exists or is null
            expect(ticket.description === null || typeof ticket.description === 'string').toBe(true);
        });
    });

});

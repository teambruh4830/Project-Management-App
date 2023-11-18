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
        expect(tickets.length).toBeGreaterThanOrEqual(4);  // We're seeding 4 tickets
        expect(tickets[0]).toBeInstanceOf(Ticket);
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
    });

    /*test('Print the projects associated with a user', async () => {
        const users = await getAllUsers();
        const user = users[0];
        const userProjects = await getProjectsByUser(user.id);
        console.log("Projects associated with user:", userProjects);

        const user2 = users[1];
        const user2Projects = await getProjectsByUser(user2.id);
        console.log("Projects associated with user2:", user2Projects);
    });

    test('Print the tickets in users projects', async () => {
        const users = await getAllUsers();
        const user = users[0];
        const userProjects = await getProjectsByUser(user.id);

        for (let project of userProjects) {
            const projectTickets = await getTicketsByProject(project.id);
            console.log("Tickets in project:", projectTickets);
        }

        const user2 = users[1];
        const user2Projects = await getProjectsByUser(user2.id);

        for (let project of user2Projects) {
            const projectTickets = await getTicketsByProject(project.id);
            console.log("Tickets in project:", projectTickets);
        }
    });*/


    /*test('PrintAllTables', async () => {
        const projects = await getAllProjects();
        const users = await getAllUsers();
        const tickets = await getAllTickets();
        console.log("Projects:", projects);
        console.log("Users:", users);
        console.log("Tickets:", tickets);
    });*/

});

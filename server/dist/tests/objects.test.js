var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from '../src/DB/client.js';
import initializeDB from '../src/utils/dbInit.js';
import User from '../src/DB/User.js';
import Ticket from '../src/DB/Ticket.js';
import Project from '../src/DB/Project.js';
import { getProjectsByUser, getTicketsByProject, getAllUsers, saveAllUsers, getAllTickets, saveAllTickets, getAllProjects, saveAllProjects, } from '../src/DB/dbUtil.js'; // Adjust the path to dbUtil if needed
describe('Database Utilities', () => {
    // Connect to the DB and initialize it before all tests
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.connect();
        yield initializeDB();
    }));
    // Disconnect from the DB after all tests
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.end();
    }));
    // Clear and populate data before each test
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeDB();
    }));
    test('Fetch all users from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield getAllUsers();
        expect(users.length).toBeGreaterThanOrEqual(1);
        expect(users[0]).toBeInstanceOf(User);
    }));
    test('Fetch all tickets from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const tickets = yield getAllTickets();
        expect(tickets.length).toBeGreaterThanOrEqual(4); // We're seeding 4 tickets
        expect(tickets[0]).toBeInstanceOf(Ticket);
    }));
    test('Fetch all projects from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects = yield getAllProjects();
        expect(projects.length).toBeGreaterThanOrEqual(1);
        expect(projects[0]).toBeInstanceOf(Project);
    }));
    test('Save all users to DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersBefore = yield getAllUsers();
        yield saveAllUsers(usersBefore);
        const usersAfter = yield getAllUsers();
        expect(usersBefore.length).toEqual(usersAfter.length);
    }));
    test('Save all tickets to DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const ticketsBefore = yield getAllTickets();
        yield saveAllTickets(ticketsBefore);
        const ticketsAfter = yield getAllTickets();
        expect(ticketsBefore.length).toEqual(ticketsAfter.length);
    }));
    test('Save all projects to DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectsBefore = yield getAllProjects();
        yield saveAllProjects(projectsBefore);
        const projectsAfter = yield getAllProjects();
        expect(projectsBefore.length).toEqual(projectsAfter.length);
    }));
    test('Fetch the projects associated with a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield getAllUsers();
        const user = users[0];
        const userProjects = yield getProjectsByUser(user.id);
        expect(userProjects.length).toBeGreaterThanOrEqual(1);
        expect(userProjects[0]).toBeInstanceOf(Project);
    }));
    test('Fetch tickets associated with a project', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects = yield getAllProjects();
        const project = projects[0];
        const projectTickets = yield getTicketsByProject(project.id);
        expect(projectTickets.length).toBeGreaterThanOrEqual(1);
        expect(projectTickets[0]).toBeInstanceOf(Ticket);
    }));
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

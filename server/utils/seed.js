import client from '../db/client.js';
import { createUser, getUser, getTickets, createTicket } from '../db/users.js';
import { getProjects, createProject, getProjectCount } from '../db/projects.js';

async function dropTables() {
    try {
        console.log('Dropping tables...');
        await client.query(`
            DROP TABLE IF EXISTS projects;
            DROP TABLE IF EXISTS tickets;
            DROP TABLE IF EXISTS users;
        `);
        console.log('Dropping tables completed');
    } catch (error) {
        console.error('Error dropping tables');
        throw error;
    }
}

async function buildTables() {
    try {
        console.log('Building tables...');
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            CREATE TABLE tickets (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                type VARCHAR(255) NOT NULL,
                UNIQUE ("userId", type)
            );
            CREATE TABLE projects (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "ticketId" INTEGER REFERENCES tickets(id),
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255)
            );
        `);
        console.log('Building tables completed');
    } catch (error) {
        console.error('Error building tables');
        throw error;
    }
}

async function createInitialUsers() {
    console.log('Creating initial users...');
    const usersToCreate = [{username: 'exampleUserTest', password: '1234'}];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Creating users completed');
}

async function createInitialTickets() {
    console.log('Creating initial tickets...');
    const ticketsToCreate = [
        {id: 1, userId: 1, type: 'To Do'},
        {id: 2, userId: 1, type: 'In Progress'},
        {id: 3, userId: 1, type: 'Completed'}
    ];

    const tickets = await Promise.all(ticketsToCreate.map(createTicket));
    console.log('Creating tickets completed');
}

async function createInitialProjects() {
    console.log('Creating initial projects...');
    const projectsToCreate = [
        {userId: 1, ticketId: 1, title: 'Task1', desc: 'Do Stuff For Task1'},
        {userId: 1, ticketId: 2, title: 'Task2', desc: 'Do Stuff For Task2'},
        {userId: 1, ticketId: 3, title: 'Task3', desc: 'Do Stuff For Task3'}
    ];

    const projects = await Promise.all(projectsToCreate.map(createProject));
    console.log('Creating projects completed');
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await buildTables();
        await createInitialUsers();
        await createInitialTickets();
        await createInitialProjects();
    } catch (error) {
        console.log('There was an error during rebuildDB');
        throw error;
    } finally {
        client.end();
    }
}

rebuildDB().catch(console.error);

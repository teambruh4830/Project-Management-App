// tests/testSetup.js

import { User, Project, Ticket } from '../server/objects.js';
import app from '../server/server.js';

process.env.NODE_ENV = 'test';

let testUser;
let testProject;
let testTicket;

async function setup() {
    testUser = new User(null, 'testUser', 'testuser@email.com', 'testPassword', null, null);
    await testUser.save();

    testProject = new Project(null, 'Test Project', 'This is a test project', testUser.id, null, null);
    await testProject.save();

    testTicket = new Ticket(null, 'Test Ticket', 'This is a test ticket', 'Open', testProject.id, testUser.id, null, null, null);
    await testTicket.save();
}

async function teardown() {
    await testTicket.delete();
    await testProject.delete();
    await testUser.delete();
}

export { setup, teardown, testUser, testProject, testTicket, app };






// testSetup.js

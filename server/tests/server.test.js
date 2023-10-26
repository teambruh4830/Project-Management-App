// tests/server.test.js

import request from 'supertest';
import { setup, teardown, testUser, testProject, testTicket, app } from './testSetup.js';

beforeAll(async () => {
    await setup();
    console.log('Setup complete');
});

afterAll(async () => {
    await teardown();
});

describe('Project Routes', () => {
    test('should retrieve a project by ID', async () => {
        const response = await request(app).get(`/project/${testProject.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(testProject.id);
    });
});

describe('Ticket Routes', () => {
    test('should update a ticket', async () => {
        testTicket.title = 'Updated Ticket';
        testTicket.description = 'This ticket has been updated';
        testTicket.status = 'In Progress';
        await testTicket.save();

        const response = await request(app).put(`/ticket/${testTicket.id}`).send({
            title: testTicket.title,
            description: testTicket.description,
            status: testTicket.status
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testTicket.title);
        expect(response.body.description).toBe(testTicket.description);
        expect(response.body.status).toBe(testTicket.status);
    }, 10000); // Setting timeout for this specific test
});

describe('User Routes', () => {
    test('should create a new user', async () => {
        const uniqueUsername = `uniqueUser_${Date.now()}`;
        const uniqueEmail = `uniqueUser${Date.now()}@email.com`;
        const response = await request(app).post('/user').send({
            username: uniqueUsername,
            email: uniqueEmail,
            password: 'testPassword'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(uniqueUsername);
        expect(response.body.email).toBe(uniqueEmail);
    }, 10000); // Setting timeout for this specific test
});





// server.test.js
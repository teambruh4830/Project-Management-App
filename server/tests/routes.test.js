import request from 'supertest';
import { client, server, serverInstance } from '../server.js';

describe('Server Routes', () => {
    // ... (Other tests)

    describe('API Routes', () => {

        // ... (More API Tests)

        describe('User Routes', () => {
            it('should respond to POST on /api/users/login', async () => {
                const response = await request(server).post('/api/users/login').send({
                    username: 'exampleUserTest',
                    password: '1234'
                });
                expect(response.status).toBe(200);
                expect(response.body.username).toBe('exampleUserTest');  // Expecting to get the user details
            });

            it('should respond to POST on /api/users/register', async () => {
                const uniqueUsername = `newUser-${Date.now()}`;
                const response = await request(server).post('/api/users/register').send({
                    username: uniqueUsername,
                    password: 'newPass'
                });
                expect(response.status).toBe(200);
                expect(response.body.username).toBe(uniqueUsername);  // Adjusting to expect the unique username
            });
            

            it('should respond to GET on /api/users/:userId/tickets', async () => {
                const userId = 1;
                const response = await request(server).get(`/api/users/${userId}/tickets`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveLength(3);  // Expecting 3 tickets for user with ID 1
            });

            it('should respond to GET on /api/users/:userId/projects', async () => {
                const userId = 1;
                const response = await request(server).get(`/api/users/${userId}/projects`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveLength(3);  // Expecting 3 projects for user with ID 1
            });
        });

        describe('Project Routes', () => {
            it('should respond to GET on /api/projects/:projectId', async () => {
                const projectId = 1;
                const response = await request(server).get(`/api/projects/${projectId}`);
                expect(response.status).toBe(200);
                expect(response.body[0].title).toBe('Task1');  // Access the first element of the array
            });
            
            

            // ... (More API Tests)
        });
    });

    // ... (Remaining Other Tests)
});


afterAll(async () => {
    serverInstance.close();
    await client.end();  // Close the database connection
});

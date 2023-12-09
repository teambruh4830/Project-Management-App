import request from 'supertest';
import app from '../server'; // Adjust this import according to your project structure
import client from '../src/DB/client';
import initializeDB from '../src/utils/dbInit'; // Import your initialization function

describe('API Endpoints', () => {
    beforeAll(async () => {
        await client.connect();
        await initializeDB();
    });

    afterAll(async () => {
        await client.end();
    });

    // Test the root route
    test('GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to the API!');
    });

    // Test user registration with a new user
    test('POST /users/register - New User', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'newuser', password: 'newpassword' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
        expect(response.body).toHaveProperty('userId');
    });

    // Test user sign-in with existing user
    test('POST /users/signin - Existing User', async () => {
        const response = await request(app)
            .post('/api/users/signin')
            .send({ username: 'testUser1', password: 'testPass1' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User signed in successfully');
    });

    // Test retrieving projects for an existing user
    test('GET /users/:userId/projects - Existing User', async () => {
        const response = await request(app).get('/api/users/1/projects');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test creating a new project
    test('POST /projects - Create New Project', async () => {
        const response = await request(app)
            .post('/api/projects')
            .send({ title: 'New Test Project', description: 'A new test project' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Project created successfully');
    });

    // Test retrieving tickets for a project
    test('GET /projects/:projectId/tickets - Existing Project', async () => {
        const response = await request(app).get('/api/projects/1/tickets');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test creating a new ticket
    test('POST /tickets - Create New Ticket', async () => {
        const newTicket = {
            project_id: 1, // Assuming a valid project ID
            created_by: 1, // Assuming a valid user ID
            assigned_to: 1, // Assuming a valid user ID
            type: 'Bug',
            priority: 1
        };
        const response = await request(app)
            .post('/api/tickets')
            .send(newTicket);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Ticket created successfully');
        expect(response.body).toHaveProperty('ticketId');
    });

    // Test updating a ticket
    test('PUT /tickets/:ticketId - Update Ticket', async () => {
        const updatedTicketData = {
            project_id: 1, // Assuming the same project ID
            type: 'Feature',
            priority: 2
            // Other fields can be added as needed
        };
        const ticketId = 1; // Replace with a valid ticket ID
        const response = await request(app)
            .put(`/api/tickets/${ticketId}`)
            .send(updatedTicketData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Ticket updated successfully');
        // Additional checks can be added to verify the content of the updated ticket
    });

    // Test updating a project
    test('PUT /projects/:projectId - Update Project', async () => {
        const updatedProjectData = {
            title: 'Updated Project Title',
            description: 'Updated project description'
        };
        const projectId = 1; // Replace with a valid project ID
        const response = await request(app)
            .put(`/api/projects/${projectId}`)
            .send(updatedProjectData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Project updated successfully');
        expect(response.body).toHaveProperty('updatedProject');
            
    });

    test('DELETE /projects/:projectId - Delete Project', async () => {
        const projectId = 1; // Assuming this is a valid project ID for testing
        const response = await request(app).delete(`/api/projects/${projectId}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Project deleted successfully');
    });

    test('DELETE /tickets/:ticketId - Delete Ticket', async () => {
        const ticketId = 1; // Assuming this is a valid ticket ID for testing
        const response = await request(app).delete(`/api/tickets/${ticketId}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Ticket deleted successfully');
    });
    
    // Add more tests as needed for other scenarios and endpoints
});
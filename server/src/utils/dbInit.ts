import client from '../DB/client';

// Drop tables for server testing DB
async function dropExistingTables() {
    await client.query('DROP TABLE IF EXISTS tickets CASCADE');
    await client.query('DROP TABLE IF EXISTS user_projects CASCADE');
    await client.query('DROP TABLE IF EXISTS projects CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
}

// Create tables for server testing DB
async function createTables(){
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await client.query(`
        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await client.query(`
        CREATE TABLE user_projects (
            user_id INTEGER NOT NULL REFERENCES users(id),
            project_id INTEGER NOT NULL REFERENCES projects(id),
            PRIMARY KEY (user_id, project_id)
        )
    `);

    await client.query(`
        CREATE TABLE tickets (
            id SERIAL PRIMARY KEY,
            project_id INTEGER NOT NULL REFERENCES projects(id),
            created_by INTEGER NOT NULL REFERENCES users(id),
            assigned_to INTEGER REFERENCES users(id) NULL,
            title VARCHAR(255) NOT NULL, 
            description TEXT,            
            type VARCHAR(255) NOT NULL,
            priority INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Seed data into server testing DB for testing
async function seedData() {
    // Seed data
    // Users
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['testUser1', 'testPass1']);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['testUser2', 'testPass2']);
    const userId = (await client.query('SELECT id FROM users WHERE username = $1', ['testUser1'])).rows[0].id;

    // Projects
    await client.query('INSERT INTO projects (title, description) VALUES ($1, $2)', ['Test Project 1', 'Description for test project 1']);
    const projectId = (await client.query('SELECT id FROM projects WHERE title = $1', ['Test Project 1'])).rows[0].id;

    // Add user to project
    await client.query('INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);

    // Tickets for Test Project 1
    await client.query('INSERT INTO tickets (project_id, created_by, title, description, type, priority) VALUES ($1, $2, $3, $4, $5, $6)', 
    [projectId, userId, 'Ticket Title 1', 'Description for ticket 1', 'Bug', 1]);

    await client.query('INSERT INTO tickets (project_id, created_by, title, description, type, priority) VALUES ($1, $2, $3, $4, $5, $6)', 
    [projectId, userId, 'Ticket Title 2', null, 'Feature', 2]);

    await client.query('INSERT INTO tickets (project_id, created_by, title, description, type, priority) VALUES ($1, $2, $3, $4, $5, $6)', 
    [projectId, userId, 'Ticket Title 3', 'Description for ticket 3', 'Improvement', 3]);

    await client.query('INSERT INTO tickets (project_id, created_by, title, type, priority) VALUES ($1, $2, $3, $4, $5)', 
    [projectId, userId, 'Ticket Title 4', 'Bug', 4]);
}

// Initializes the test database for server tests.
async function initializeDB() {
    //DEBUG console.log('Initializing test database...');
    await dropExistingTables();
    //DEBUG console.log('Dropped existing tables');
    await createTables();
    //DEBUG console.log('Created tables');
    await seedData();
    //DEBUG console.log('Seeded data');
    //DEBUG console.log('Test database initialized');
}

export default initializeDB;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from '../DB/client.js';
// Drop tables for server testing DB
function dropExistingTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query('DROP TABLE IF EXISTS tickets CASCADE');
        yield client.query('DROP TABLE IF EXISTS user_projects CASCADE');
        yield client.query('DROP TABLE IF EXISTS projects CASCADE');
        yield client.query('DROP TABLE IF EXISTS users CASCADE');
    });
}
// Create tables for server testing DB
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
        yield client.query(`
        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
        yield client.query(`
        CREATE TABLE user_projects (
            user_id INTEGER NOT NULL REFERENCES users(id),
            project_id INTEGER NOT NULL REFERENCES projects(id),
            PRIMARY KEY (user_id, project_id)
        )
    `);
        yield client.query(`
        CREATE TABLE tickets (
            id SERIAL PRIMARY KEY,
            project_id INTEGER NOT NULL REFERENCES projects(id),
            created_by INTEGER NOT NULL REFERENCES users(id),
            assigned_to INTEGER REFERENCES users(id) NULL,
            type VARCHAR(255) NOT NULL,
            priority INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
    });
}
// Seed data into server testing DB for testing
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Seed data
        // Users
        yield client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['testUser1', 'testPass1']);
        yield client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['testUser2', 'testPass2']);
        const userId = (yield client.query('SELECT id FROM users WHERE username = $1', ['testUser1'])).rows[0].id;
        // Projects
        yield client.query('INSERT INTO projects (title, description) VALUES ($1, $2)', ['Test Project 1', 'Description for test project 1']);
        const projectId = (yield client.query('SELECT id FROM projects WHERE title = $1', ['Test Project 1'])).rows[0].id;
        // Add user to project
        yield client.query('INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);
        // Tickets for Test Project 1
        yield client.query('INSERT INTO tickets (project_id, created_by, type, priority) VALUES ($1, $2, $3, $4)', [projectId, userId, 'Bug', 1]);
        yield client.query('INSERT INTO tickets (project_id, created_by, type, priority) VALUES ($1, $2, $3, $4)', [projectId, userId, 'Feature', 2]);
        yield client.query('INSERT INTO tickets (project_id, created_by, type, priority) VALUES ($1, $2, $3, $4)', [projectId, userId, 'Improvement', 3]);
        yield client.query('INSERT INTO tickets (project_id, created_by, type, priority) VALUES ($1, $2, $3, $4)', [projectId, userId, 'Bug', 4]);
    });
}
// Initializes the test database for server tests.
function initializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dropExistingTables();
        yield createTables();
        yield seedData();
    });
}
export default initializeDB;

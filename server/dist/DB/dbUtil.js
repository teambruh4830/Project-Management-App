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
import Project from '../DB/Project.js';
import User from '../DB/User.js';
import Ticket from '../DB/Ticket.js';
function userExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query('SELECT id FROM users WHERE username = $1', [username]);
        return result.rows.length > 0;
    });
}
function createUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield userExists(username)) {
            throw new Error('User already exists');
        }
        yield client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
        const result = yield client.query('SELECT * FROM users WHERE username = $1', [username]);
        const newUserProps = result.rows[0];
        return new User(newUserProps);
    });
}
function verifyUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return null; // User not found
        }
        const userProps = result.rows[0];
        if (userProps.password !== password) {
            return null; // Password does not match
        }
        return new User(userProps); // User verified
    });
}
// Fetch all projects that a user is a member of from the database and return an array of Project instances
function getProjectsByUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM projects WHERE id IN (SELECT project_id FROM user_projects WHERE user_id = $1)', [user_id]);
        return rows.map((row) => new Project(row));
    });
}
// Fetch all tickets associated with a project from the database and return an array of Ticket instances
function getTicketsByProject(project_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM tickets WHERE project_id = $1', [project_id]);
        return rows.map((row) => new Ticket(row));
    });
}
function createNewProject(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: [newProjectRow] } = yield client.query(`
        INSERT INTO projects (title, description)
        VALUES ($1, $2)
        RETURNING *
    `, [title, description]);
        return new Project({
            id: newProjectRow.id,
            title: newProjectRow.title,
            description: newProjectRow.description,
            created_at: newProjectRow.created_at,
            modified_at: newProjectRow.modified_at
        });
    });
}
function addUserToProjectByUsername(username, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRes = yield client.query('SELECT id FROM users WHERE username = $1', [username]);
        if (userRes.rows.length === 0) {
            throw new Error('User not found');
        }
        const userId = userRes.rows[0].id;
        yield client.query('INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);
    });
}
function removeUserFromProjectByUsername(username, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRes = yield client.query('SELECT id FROM users WHERE username = $1', [username]);
        if (userRes.rows.length === 0) {
            throw new Error('User not found');
        }
        const userId = userRes.rows[0].id;
        yield client.query('DELETE FROM user_projects WHERE user_id = $1 AND project_id = $2', [userId, projectId]);
    });
}
// Create a new ticket in the database
function createNewTicket(ticketData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { project_id, created_by, assigned_to, title, description, type, priority } = ticketData;
        const { rows: [newTicketRow] } = yield client.query(`
        INSERT INTO tickets (project_id, created_by, assigned_to, title, description, type, priority, created_at, modified_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING *
    `, [project_id, created_by, assigned_to, title, description, type, priority]);
        return new Ticket(newTicketRow);
    });
}
// Update an existing project in the database
function updateProject(projectData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, title, description } = projectData;
        const { rows: [updatedProjectRow] } = yield client.query(`
        UPDATE projects
        SET title = $1, description = $2, modified_at = NOW()
        WHERE id = $3
        RETURNING *
    `, [title, description, id]);
        return new Project(updatedProjectRow);
    });
}
function updateTicket(ticketData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the existing ticket data
            const { rows: existingTicketRows } = yield client.query('SELECT * FROM tickets WHERE id = $1', [ticketData.id]);
            if (existingTicketRows.length === 0) {
                throw new Error('Ticket not found');
            }
            const existingTicket = existingTicketRows[0];
            // Merge existing data with new data
            const updatedData = Object.assign(Object.assign(Object.assign({}, existingTicket), ticketData), { modified_at: new Date() // Update the modified_at timestamp
             });
            // Update the ticket in the database
            const { rows: [updatedTicketRow] } = yield client.query(`
            UPDATE tickets
            SET project_id = $1, created_by = $2, assigned_to = $3, title = $4, description = $5, type = $6, priority = $7, modified_at = $8
            WHERE id = $9
            RETURNING *
        `, [updatedData.project_id, updatedData.created_by, updatedData.assigned_to, updatedData.title, updatedData.description, updatedData.type, updatedData.priority, updatedData.modified_at, updatedData.id]);
            return new Ticket(updatedTicketRow);
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteProject(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query('DELETE FROM tickets WHERE project_id = $1', [projectId]);
        yield client.query('DELETE FROM user_projects WHERE project_id = $1', [projectId]);
        yield client.query('DELETE FROM projects WHERE id = $1', [projectId]);
    });
}
function deleteTicket(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query('DELETE FROM tickets WHERE id = $1', [ticketId]);
    });
}
//------------------------------------------------------------
// Fetch Functions
//------------------------------------------------------------
// Fetch all users from the database and return an array of User instances
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM users');
        return rows.map((row) => new User(row));
    });
}
// Fetch all tickets from the database and return an array of Ticket instances
function getAllTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM tickets');
        return rows.map((row) => {
            // Include a check for the new 'title' field as it is mandatory
            if (!row.project_id || !row.created_by || !row.title) {
                console.error("Problematic ticket row:", row);
                throw new Error("Essential properties missing for Ticket object");
            }
            return new Ticket(row);
        });
    });
}
// Fetch all projects from the database and return an array of Project instances
function getAllProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM projects');
        return rows.map((row) => new Project(row));
    });
}
//------------------------------------------------------------
//------------------------------------------------------------
// Save Functions
//------------------------------------------------------------
// Save the state of all User instances to the database
function saveAllUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let user of users) {
            yield user.saveChangesToDB();
        }
    });
}
// Save the state of all Ticket instances to the database
function saveAllTickets(tickets) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let ticket of tickets) {
            //console.log(ticket); 
            yield ticket.saveChangesToDB();
        }
    });
}
// Save the state of all Project instances to the database
function saveAllProjects(projects) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let project of projects) {
            yield project.saveChangesToDB();
        }
    });
}
//------------------------------------------------------------
export { userExists, createUser, verifyUser, createNewProject, createNewTicket, updateProject, updateTicket, deleteProject, deleteTicket, addUserToProjectByUsername, removeUserFromProjectByUsername, getProjectsByUser, getTicketsByProject, getAllUsers, getAllTickets, getAllProjects, saveAllUsers, saveAllTickets, saveAllProjects };

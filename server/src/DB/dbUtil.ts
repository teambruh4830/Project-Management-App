import client from '../DB/client';

import { UserProps } from '../DB/User';
import { TicketProps } from '../DB/Ticket';
import { ProjectProps } from '../DB/Project';
import Project from '../DB/Project';
import User from '../DB/User';
import Ticket from '../DB/Ticket';


async function userExists(username: string): Promise<boolean> {
    const result = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    return result.rows.length > 0;
}

async function createUser(username: string, password: string): Promise<User> {
    if (await userExists(username)) {
        throw new Error('User already exists');
    }

    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const newUserProps: UserProps = result.rows[0];
    return new User(newUserProps);
}

async function verifyUser(username: string, password: string): Promise<User | null> {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
        return null; // User not found
    }
    const userProps: UserProps = result.rows[0];
    if (userProps.password !== password) {
        return null; // Password does not match
    }
    return new User(userProps); // User verified
}

// Fetch all projects that a user is a member of from the database and return an array of Project instances
async function getProjectsByUser(user_id: number): Promise<Project[]> {
    const { rows } = await client.query('SELECT * FROM projects WHERE id IN (SELECT project_id FROM user_projects WHERE user_id = $1)', [user_id]);
    return rows.map((row: ProjectProps) => new Project(row));
}

// Fetch all tickets associated with a project from the database and return an array of Ticket instances
async function getTicketsByProject(project_id: number): Promise<Ticket[]> {
    const { rows } = await client.query('SELECT * FROM tickets WHERE project_id = $1', [project_id]);
    return rows.map((row: TicketProps) => new Ticket(row));
}

async function createNewProject(title: string, description: string): Promise<Project> {
    const { rows: [newProjectRow] } = await client.query(`
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
}

async function addUserToProjectByUsername(username: string, projectId: number): Promise<void> {
    const userRes = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userRes.rows.length === 0) {
        throw new Error('User not found');
    }
    const userId = userRes.rows[0].id;
    await client.query('INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);
}

async function removeUserFromProjectByUsername(username: string, projectId: number): Promise<void> {
    const userRes = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userRes.rows.length === 0) {
        throw new Error('User not found');
    }
    const userId = userRes.rows[0].id;
    await client.query('DELETE FROM user_projects WHERE user_id = $1 AND project_id = $2', [userId, projectId]);
}



// Create a new ticket in the database
async function createNewTicket(ticketData: TicketProps): Promise<Ticket> {
    const { project_id, created_by, assigned_to, type, priority } = ticketData;
    const { rows: [newTicketRow] } = await client.query(`
        INSERT INTO tickets (project_id, created_by, assigned_to, type, priority, created_at, modified_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *
    `, [project_id, created_by, assigned_to, type, priority]);

    return new Ticket(newTicketRow);
}

// Update an existing project in the database
async function updateProject(projectData: ProjectProps): Promise<Project> {
    const { id, title, description } = projectData;
    const { rows: [updatedProjectRow] } = await client.query(`
        UPDATE projects
        SET title = $1, description = $2, modified_at = NOW()
        WHERE id = $3
        RETURNING *
    `, [title, description, id]);

    return new Project(updatedProjectRow);
}

async function updateTicket(ticketData: TicketProps): Promise<Ticket> {
    try {
        // Fetch the existing ticket data
        const { rows: existingTicketRows } = await client.query('SELECT * FROM tickets WHERE id = $1', [ticketData.id]);
        if (existingTicketRows.length === 0) {
            throw new Error('Ticket not found');
        }
        const existingTicket = existingTicketRows[0];

        // Merge existing data with new data
        const updatedData = {
            ...existingTicket,
            ...ticketData,
            modified_at: new Date() // Update the modified_at timestamp
        };

        // Update the ticket in the database
        const { rows: [updatedTicketRow] } = await client.query(`
            UPDATE tickets
            SET project_id = $1, created_by = $2, assigned_to = $3, type = $4, priority = $5, modified_at = $6
            WHERE id = $7
            RETURNING *
        `, [updatedData.project_id, updatedData.created_by, updatedData.assigned_to, updatedData.type, updatedData.priority, updatedData.modified_at, updatedData.id]);

        return new Ticket(updatedTicketRow);
    } catch (error) {
        throw error;
    }
}

async function deleteProject(projectId: number): Promise<void> {
    await client.query('DELETE FROM tickets WHERE project_id = $1', [projectId]);
    await client.query('DELETE FROM user_projects WHERE project_id = $1', [projectId]);
    await client.query('DELETE FROM projects WHERE id = $1', [projectId]);
}

async function deleteTicket(ticketId: number): Promise<void> {
    await client.query('DELETE FROM tickets WHERE id = $1', [ticketId]);
}







//------------------------------------------------------------
// Fetch Functions
//------------------------------------------------------------

// Fetch all users from the database and return an array of User instances
async function getAllUsers(): Promise<User[]> {
    const { rows } = await client.query('SELECT * FROM users');
    return rows.map((row: UserProps) => new User(row));
}

// Fetch all tickets from the database and return an array of Ticket instances
async function getAllTickets(): Promise<Ticket[]> {
    const { rows } = await client.query('SELECT id, project_id, created_by, assigned_to, type, priority, created_at, modified_at FROM tickets');
    //console.log("Fetched ticket rows:", rows);
    return rows.map((row: TicketProps) => {
        if (!row.project_id || !row.created_by) {
            console.error("Problematic ticket row:", row);
            throw new Error("Essential properties missing for Ticket object");
        }
        return new Ticket(row);
    });
}

// Fetch all projects from the database and return an array of Project instances
async function getAllProjects(): Promise<Project[]> {
    const { rows } = await client.query('SELECT * FROM projects');
    return rows.map((row: ProjectProps) => new Project(row));
}

//------------------------------------------------------------


//------------------------------------------------------------
// Save Functions
//------------------------------------------------------------

// Save the state of all User instances to the database
async function saveAllUsers(users: User[]) {
    for (let user of users) {
        await user.saveChangesToDB();
    }
}

// Save the state of all Ticket instances to the database
async function saveAllTickets(tickets: Ticket[]) {
    for (let ticket of tickets) {
        //console.log(ticket); 
        await ticket.saveChangesToDB();
    }
}

// Save the state of all Project instances to the database
async function saveAllProjects(projects: Project[]) {
    for (let project of projects) {
        await project.saveChangesToDB();
    }
}


//------------------------------------------------------------

export {
    userExists,
    createUser,
    verifyUser,
    createNewProject,
    createNewTicket,
    updateProject,
    updateTicket,
    deleteProject,
    deleteTicket,
    addUserToProjectByUsername,
    removeUserFromProjectByUsername,
    getProjectsByUser,
    getTicketsByProject,
    getAllUsers,
    getAllTickets,
    getAllProjects,
    saveAllUsers,
    saveAllTickets,
    saveAllProjects
};
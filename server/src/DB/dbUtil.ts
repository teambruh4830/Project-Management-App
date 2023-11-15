import client from '../DB/client';

import { UserProps } from '../DB/User';
import { TicketProps } from '../DB/Ticket';
import { ProjectProps } from '../DB/Project';
import Project from '../DB/Project';
import User from '../DB/User';
import Ticket from '../DB/Ticket';

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
    getProjectsByUser,
    getTicketsByProject,
    getAllUsers,
    getAllTickets,
    getAllProjects,
    saveAllUsers,
    saveAllTickets,
    saveAllProjects
};

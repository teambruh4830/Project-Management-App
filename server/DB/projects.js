import client from '../db/client.js';

async function createProject({ userId, ticketId, title, desc }) {
    const { rows } = await client.query(`
        INSERT INTO projects("userId", "ticketId", title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [userId, ticketId, title, desc]);

    return rows;
}

async function getProjects({ userId }) {
    const { rows } = await client.query(`
        SELECT projects.id, projects."userId", projects."ticketId", title, description, type
        FROM projects
        LEFT JOIN tickets
            ON "ticketId" = tickets.id
        WHERE projects."userId" = ($1)
    `, [userId]);

    return rows;
}

async function getProject({ projectId }) {
    const { rows } = await client.query(`
        SELECT *
        FROM projects
        WHERE id = ($1)
    `, [projectId]);

    return rows;
}

async function getProjectCount({ userId }) {
    const { rows } = await client.query(`
        SELECT "ticketId", COUNT("ticketId")
        FROM projects
        WHERE "userId" = ($1)
        GROUP BY "ticketId"
    `, [userId]);

    return rows;
}

async function editProject({ projectId, newTitle, newDesc }) {
    const { rows } = await client.query(`
        UPDATE projects
        SET title = ($2), 
            description = ($3)
        WHERE id = ($1)
        RETURNING *
    `, [projectId, newTitle, newDesc]);

    return rows;
}

async function deleteProjectsByTicketId({ ticketId }) {
    const { rows } = await client.query(`
        DELETE FROM projects
        WHERE "ticketId" = ($1)
        RETURNING *
    `, [ticketId]);

    return rows;
}

async function deleteProject({ projectId }) {
    const { rows } = await client.query(`
        DELETE FROM projects
        WHERE id = ($1)
        RETURNING *
    `, [projectId]);

    return rows;
}

async function updateTicket({ projectId, newTicketId }) {
    const { rows } = await client.query(`
        UPDATE projects
        SET "ticketId" = ($2)
        WHERE id = ($1)
        RETURNING *
    `, [projectId, newTicketId]);

    return rows;
}

async function deleteTicketById({ ticketId }) {
    const { rows } = await client.query(`
        DELETE FROM tickets
        WHERE id = ($1)
        RETURNING *;
    `, [ticketId]);

    return rows;
}

export {
    createProject,
    getProjects,
    getProject,
    getProjectCount,
    editProject,
    deleteProject,
    deleteProjectsByTicketId,
    updateTicket,
    deleteTicketById
};

import client from '../DB/client.js';

interface TicketProps {
    id: number;
    project_id: number; // changed from projectId
    created_by: number; // changed from createdBy
    assigned_to: number | null; // changed from assignedTo
    type: string;
    priority: number;
    created_at: Date;
    modified_at: Date;
}
export { TicketProps };

class Ticket {
    id: number;
    project_id: number;
    created_by: number;
    assigned_to: number | null;
    type: string;
    priority: number;
    created_at: Date;
    modified_at: Date;

    constructor({ id, project_id, created_by, assigned_to, type, priority, created_at, modified_at }: TicketProps) {
        if (!project_id || !created_by) {
            throw new Error("Essential properties missing for Ticket object");
        }
        this.id = id;
        this.project_id = project_id;
        this.created_by = created_by;
        this.assigned_to = assigned_to;
        this.type = type;
        this.priority = priority;
        this.created_at = created_at;
        this.modified_at = modified_at;
    }

    async saveChangesToDB() {
        try {
            const { rows: [updatedTicket] } = await client.query(`
                UPDATE tickets
                SET project_id = $1, created_by = $2, assigned_to = $3, type = $4, priority = $5, created_at = $6, modified_at = $7
                WHERE id = $8
                RETURNING *
            `, [this.project_id, this.created_by, this.assigned_to, this.type, this.priority, this.created_at, this.modified_at, this.id]);
    
            this.type = updatedTicket.type;
            this.priority = updatedTicket.priority;
        } catch (error) {
            throw error;
        }
    }
    
    async updateFromDB() {
        try {
            const { rows: [ticket] } = await client.query(`
                SELECT * FROM tickets WHERE id = $1
            `, [this.id]);
    
            this.project_id = ticket.project_id;
            this.created_by = ticket.created_by;
            this.assigned_to = ticket.assigned_to;
            this.type = ticket.type;
            this.priority = ticket.priority;
            this.created_at = ticket.created_at;
            this.modified_at = ticket.modified_at;
        } catch (error) {
            throw error;
        }
    }
}

export default Ticket;




// Ticket Methods

    // Save Ticket

    // Update Ticket (update it from the database. IDK if this is necessary, but it's here if we need it.)

    // Delete Ticket

    // Assign Ticket

    // Unassign Ticket

    // Change Priority

    // Change Type
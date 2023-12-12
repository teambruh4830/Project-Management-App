import client from '../DB/client';

interface TicketProps {
    id: number;
    project_id: number;
    created_by: number;
    assigned_to: number | null;
    title: string;               // New property
    description: string | null;  // New property, can be string or null
    type: string;
    priority: number;
    created_at: Date;
    modified_at: Date;
}
export { TicketProps };


class Ticket {
    private _id: number;
    private _project_id: number;
    private _created_by: number;
    private _assigned_to: number | null;
    private _title: string;             // New field
    private _description: string | null; // New field
    private _type: string;
    private _priority: number;
    private _created_at: Date;
    private _modified_at: Date;

    constructor({ id, project_id, created_by, assigned_to, title, description, type, priority, created_at, modified_at }: TicketProps) {
        if (!project_id || !created_by || !title) {
            throw new Error("Essential properties missing for Ticket object");
        }
        this._id = id;
        this._project_id = project_id;
        this._created_by = created_by;
        this._assigned_to = assigned_to;
        this._title = title;             // Set title
        this._description = description; // Set description (can be null)
        this._type = type;
        this._priority = priority;
        this._created_at = created_at;
        this._modified_at = modified_at;
    }

    // Getters and setters for new properties
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (!value) {
            throw new Error('Title cannot be empty');
        }
        this._title = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }

    get id(): number {
        return this._id;
    }

    get project_id(): number {
        return this._project_id;
    }

    set project_id(value: number) {
        if (!value) {
            throw new Error('Project ID cannot be empty');
        }
        this._project_id = value;
    }

    get created_by(): number {
        return this._created_by;
    }

    set created_by(value: number) {
        if (!value) {
            throw new Error('Created By cannot be empty');
        }
        this._created_by = value;
    }

    get assigned_to(): number | null {
        return this._assigned_to;
    }

    set assigned_to(value: number | null) {
        this._assigned_to = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Type cannot be empty');
        }
        this._type = value;
    }

    get priority(): number {
        return this._priority;
    }

    set priority(value: number) {
        if (value < 0) {
            throw new Error('Priority cannot be negative');
        }
        this._priority = value;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get modified_at(): Date {
        return this._modified_at;
    }

    async saveChangesToDB() {
        try {
            const { rows: [updatedTicket] } = await client.query(`
                UPDATE tickets
                SET project_id = $1, created_by = $2, assigned_to = $3, title = $4, description = $5, type = $6, priority = $7, created_at = $8, modified_at = $9
                WHERE id = $10
                RETURNING *
            `, [this._project_id, this._created_by, this._assigned_to, this._title, this._description, this._type, this._priority, this._created_at, this._modified_at, this._id]);
            
            // Update object properties from database response
            this._project_id = updatedTicket.project_id;
            this._created_by = updatedTicket.created_by;
            this._assigned_to = updatedTicket.assigned_to;
            this._title = updatedTicket.title;
            this._description = updatedTicket.description;
            this._type = updatedTicket.type;
            this._priority = updatedTicket.priority;
            this._created_at = updatedTicket.created_at;
            this._modified_at = updatedTicket.modified_at;
        } catch (error) {
            throw error;
        }
    }
    
    async updateFromDB() {
        try {
            const { rows: [ticket] } = await client.query(`
                SELECT * FROM tickets WHERE id = $1
            `, [this._id]);
            
            this._project_id = ticket.project_id;
            this._created_by = ticket.created_by;
            this._assigned_to = ticket.assigned_to;
            this._title = ticket.title;
            this._description = ticket.description;
            this._type = ticket.type;
            this._priority = ticket.priority;
            this._created_at = ticket.created_at;
            this._modified_at = ticket.modified_at;
        } catch (error) {
            throw error;
        }
    }
}

export default Ticket;
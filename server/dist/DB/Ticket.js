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
class Ticket {
    constructor({ id, project_id, created_by, assigned_to, title, description, type, priority, created_at, modified_at }) {
        if (!project_id || !created_by || !title) {
            throw new Error("Essential properties missing for Ticket object");
        }
        this._id = id;
        this._project_id = project_id;
        this._created_by = created_by;
        this._assigned_to = assigned_to;
        this._title = title; // Set title
        this._description = description; // Set description (can be null)
        this._type = type;
        this._priority = priority;
        this._created_at = created_at;
        this._modified_at = modified_at;
    }
    // Getters and setters for new properties
    get title() {
        return this._title;
    }
    set title(value) {
        if (!value) {
            throw new Error('Title cannot be empty');
        }
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get id() {
        return this._id;
    }
    get project_id() {
        return this._project_id;
    }
    set project_id(value) {
        if (!value) {
            throw new Error('Project ID cannot be empty');
        }
        this._project_id = value;
    }
    get created_by() {
        return this._created_by;
    }
    set created_by(value) {
        if (!value) {
            throw new Error('Created By cannot be empty');
        }
        this._created_by = value;
    }
    get assigned_to() {
        return this._assigned_to;
    }
    set assigned_to(value) {
        this._assigned_to = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        if (!value || value.trim() === '') {
            throw new Error('Type cannot be empty');
        }
        this._type = value;
    }
    get priority() {
        return this._priority;
    }
    set priority(value) {
        if (value < 0) {
            throw new Error('Priority cannot be negative');
        }
        this._priority = value;
    }
    get created_at() {
        return this._created_at;
    }
    get modified_at() {
        return this._modified_at;
    }
    saveChangesToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: [updatedTicket] } = yield client.query(`
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: [ticket] } = yield client.query(`
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
            }
            catch (error) {
                throw error;
            }
        });
    }
}
export default Ticket;
/*import client from '../DB/client.js';

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

export default Ticket;*/
// Ticket Methods
// Save Ticket
// Update Ticket (update it from the database. IDK if this is necessary, but it's here if we need it.)
// Delete Ticket
// Assign Ticket
// Unassign Ticket
// Change Priority
// Change Type

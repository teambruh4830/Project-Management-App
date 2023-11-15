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
    constructor({ id, project_id, created_by, assigned_to, type, priority, created_at, modified_at }) {
        if (!project_id || !created_by) {
            throw new Error("Essential properties missing for Ticket object");
        }
        this._id = id;
        this.project_id = project_id; // Using the setter here
        this.created_by = created_by; // Using the setter here
        this.assigned_to = assigned_to; // Using the setter here
        this.type = type; // Using the setter here
        this.priority = priority; // Using the setter here
        this._created_at = created_at;
        this._modified_at = modified_at;
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
                SET project_id = $1, created_by = $2, assigned_to = $3, type = $4, priority = $5, created_at = $6, modified_at = $7
                WHERE id = $8
                RETURNING *
            `, [this.project_id, this.created_by, this.assigned_to, this.type, this.priority, this.created_at, this.modified_at, this.id]);
                this.type = updatedTicket.type;
                this.priority = updatedTicket.priority;
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
            `, [this.id]);
                this.project_id = ticket.project_id;
                this.created_by = ticket.created_by;
                this.assigned_to = ticket.assigned_to;
                this.type = ticket.type;
                this.priority = ticket.priority;
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

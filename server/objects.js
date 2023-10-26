// server/objects.js

import { pool } from './server.js';

export class Project {
    constructor(id, name, description, owner_id, created_at, updated_at) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.owner_id = owner_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        if (!this.id) {
            const result = await pool.query('INSERT INTO projects(name, description, owner_id) VALUES($1, $2, $3) RETURNING *', [this.name, this.description, this.owner_id]);
            Object.assign(this, result.rows[0]);
        } else {
            const result = await pool.query('UPDATE projects SET name=$1, description=$2, owner_id=$3 WHERE id=$4 RETURNING *', [this.name, this.description, this.owner_id, this.id]);
            Object.assign(this, result.rows[0]);
        }
    }

    async delete() {
        if (this.id) {
            await pool.query('DELETE FROM projects WHERE id=$1', [this.id]);
        }
    }
}

export class Ticket {
    constructor(id, title, description, status, project_id, creator_user_id, assigned_user_id, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.project_id = project_id;
        this.creator_user_id = creator_user_id;
        this.assigned_user_id = assigned_user_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        if (!this.id) {
            const result = await pool.query('INSERT INTO tickets(title, description, status, project_id, creator_user_id, assigned_user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [this.title, this.description, this.status, this.project_id, this.creator_user_id, this.assigned_user_id]);
            Object.assign(this, result.rows[0]);
        } else {
            const result = await pool.query('UPDATE tickets SET title=$1, description=$2, status=$3, project_id=$4, creator_user_id=$5, assigned_user_id=$6 WHERE id=$7 RETURNING *', [this.title, this.description, this.status, this.project_id, this.creator_user_id, this.assigned_user_id, this.id]);
            Object.assign(this, result.rows[0]);
        }
    }

    async delete() {
        if (this.id) {
            await pool.query('DELETE FROM tickets WHERE id=$1', [this.id]);
        }
    }
}

export class User {
    constructor(id, username, email, password, created_at, updated_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        if (!this.id) {
            const result = await pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *', [this.username, this.email, this.password]);
            Object.assign(this, result.rows[0]);
        } else {
            const result = await pool.query('UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *', [this.username, this.email, this.password, this.id]);
            Object.assign(this, result.rows[0]);
        }
    }

    async delete() {
        if (this.id) {
            await pool.query('DELETE FROM users WHERE id=$1', [this.id]);
        }
    }
}

// objects.js
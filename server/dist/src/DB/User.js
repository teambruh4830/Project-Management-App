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
class User {
    constructor({ id, username, password, created_at }) {
        this._id = id;
        this.username = username; // Using the setter here
        this.password = password; // Using the setter here
        this._created_at = created_at;
    }
    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        if (!value || value.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        this._username = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        if (!value || value.trim() === '') {
            throw new Error('Password cannot be empty');
        }
        this._password = value;
    }
    get created_at() {
        return this._created_at;
    }
    saveChangesToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: [updatedUser] } = yield client.query(`
                UPDATE users
                SET username = $1, password = $2, created_at = $3
                WHERE id = $4
                RETURNING *
            `, [this.username, this.password, this.created_at, this.id]);
                this.username = updatedUser.username;
                this.password = updatedUser.password;
                this._created_at = updatedUser.created_at;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: [user] } = yield client.query(`
                SELECT * FROM users WHERE id = $1
            `, [this.id]);
                this.username = user.username;
                this.password = user.password;
                this._created_at = user.created_at;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: projects } = yield client.query(`
                SELECT p.* 
                FROM projects p
                JOIN user_projects up ON p.id = up.project_id
                WHERE up.user_id = $1
            `, [this.id]);
                return projects;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.query(`
                INSERT INTO user_projects(user_id, project_id)
                VALUES($1, $2)
            `, [this.id, projectId]);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
export default User;
/*import client from '../DB/client.js';

interface UserProps {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}
export { UserProps };

class User {
    id: number;
    username: string;
    password: string;
    created_at: Date;

    constructor({ id, username, password, created_at }: UserProps) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.created_at = created_at;
    }

    async saveChangesToDB() {
        try {
            const { rows: [updatedUser] } = await client.query(`
                UPDATE users
                SET username = $1, password = $2, created_at = $3
                WHERE id = $4
                RETURNING *
            `, [this.username, this.password, this.created_at, this.id]);

            this.username = updatedUser.username;
            this.password = updatedUser.password;
            this.created_at = updatedUser.created_at;
        } catch (error) {
            throw error;
        }
    }

    async updateFromDB() {
        try {
            const { rows: [user] } = await client.query(`
                SELECT * FROM users WHERE id = $1
            `, [this.id]);

            this.username = user.username;
            this.password = user.password;
            this.created_at = user.created_at;
        } catch (error) {
            throw error;
        }
    }

    async getProjects() {
        try {
            const { rows: projects } = await client.query(`
                SELECT p.*
                FROM projects p
                JOIN user_projects up ON p.id = up.project_id
                WHERE up.user_id = $1
            `, [this.id]);
            return projects;
        } catch (error) {
            throw error;
        }
    }

    async addProject(projectId: number) {
        try {
            await client.query(`
                INSERT INTO user_projects(user_id, project_id)
                VALUES($1, $2)
            `, [this.id, projectId]);
        } catch (error) {
            throw error;
        }
    }
}

export default User;*/
// User Methods
// Save User (update its current state into the database)
// Update User (update it from the database. IDK if this is necessary, but it's here if we need it.)
// Delete User
//  Get User's Projects (with optional parameter to sort (i.e. creationDate, title, etc.))
// Get User's Created Tickets - (with optional parameter to sort (i.e. creationDate, title, etc.))
// Get User's Assigned Tickets - (with optional parameter to sort (i.e. creationDate, title, etc.))

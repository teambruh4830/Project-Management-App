import client from '../DB/client';

interface UserProps {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}
export { UserProps };

class User {
    private _id: number;
    private _username!: string;
    private _password!: string;
    private _created_at: Date;

    constructor({ id, username, password, created_at }: UserProps) {
        this._id = id;
        this.username = username;  // Using the setter here
        this.password = password;  // Using the setter here
        this._created_at = created_at;
    }

    get id(): number {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Password cannot be empty');
        }
        this._password = value;
    }

    get created_at(): Date {
        return this._created_at;
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
            this._created_at = updatedUser.created_at;
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
            this._created_at = user.created_at;
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

export default User;
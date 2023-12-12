import client from '../DB/client';

interface ProjectProps {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    modified_at: Date;
}
export { ProjectProps };

class Project {
    private _id: number;
    private _title!: string;
    private _description!: string;
    private _created_at: Date;
    private _modified_at: Date;

    constructor({ id, title, description, created_at, modified_at }: ProjectProps) {
        this._id = id;
        this.title = title;  // Using the setter here
        this.description = description;  // Using the setter here
        this._created_at = created_at;
        this._modified_at = modified_at;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Title cannot be empty');
        }
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        if (value && value.trim() === '') {
            throw new Error('Description cannot be only whitespace');
        }
        this._description = value;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get modified_at(): Date {
        return this._modified_at;
    }

    async saveChangesToDB() {
        try {
            const { rows: [updatedProject] } = await client.query(`
                UPDATE projects
                SET title = $1, description = $2, created_at = $3, modified_at = $4
                WHERE id = $5
                RETURNING *
            `, [this.title, this.description, this.created_at, this.modified_at, this.id]);

            // Update the local instance with the returned data
            this.title = updatedProject.title;
            this.description = updatedProject.description;
        } catch (error) {
            throw error;
        }
    }

    async updateFromDB() {
        try {
            const { rows: [project] } = await client.query(`
                SELECT * FROM projects WHERE id = $1
            `, [this.id]);

            this.title = project.title;
            this.description = project.description;
            this._created_at = project.created_at;
            this._modified_at = project.modified_at;
        } catch (error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            const { rows: users } = await client.query(`
                SELECT u.* 
                FROM users u
                JOIN user_projects up ON u.id = up.user_id
                WHERE up.project_id = $1
            `, [this.id]);
            return users;
        } catch (error) {
            throw error;
        }
    }

    async addUser(userId: number) {
        try {
            await client.query(`
                INSERT INTO user_projects(user_id, project_id)
                VALUES($1, $2)
            `, [userId, this.id]);
        } catch (error) {
            throw error;
        }
    }
}

export default Project;
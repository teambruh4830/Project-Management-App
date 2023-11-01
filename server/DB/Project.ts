import client from '../DB/client.js';

interface ProjectProps {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    modified_at: Date;
}
export { ProjectProps };

class Project {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    modified_at: Date;

    constructor({ id, title, description, created_at, modified_at }: ProjectProps) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.modified_at = modified_at;
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
            this.created_at = project.created_at;
            this.modified_at = project.modified_at;
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



    // Project Methods

    // Save Project (update its current state into the database)

    // Update Project (update it from the database. IDK if this is necessary, but it's here if we need it.)

    // Delete Project

    // Get Project's Tickets (with optional parameter to sort (i.e. creationDate, title, etc.))
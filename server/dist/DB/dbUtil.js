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
import Project from '../DB/Project.js';
import User from '../DB/User.js';
import Ticket from '../DB/Ticket.js';
// Fetch all projects that a user is a member of from the database and return an array of Project instances
function getProjectsByUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM projects WHERE id IN (SELECT project_id FROM user_projects WHERE user_id = $1)', [user_id]);
        return rows.map((row) => new Project(row));
    });
}
// Fetch all tickets associated with a project from the database and return an array of Ticket instances
function getTicketsByProject(project_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM tickets WHERE project_id = $1', [project_id]);
        return rows.map((row) => new Ticket(row));
    });
}
//------------------------------------------------------------
// Fetch Functions
//------------------------------------------------------------
// Fetch all users from the database and return an array of User instances
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM users');
        return rows.map((row) => new User(row));
    });
}
// Fetch all tickets from the database and return an array of Ticket instances
function getAllTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT id, project_id, created_by, assigned_to, type, priority, created_at, modified_at FROM tickets');
        //console.log("Fetched ticket rows:", rows);
        return rows.map((row) => {
            if (!row.project_id || !row.created_by) {
                console.error("Problematic ticket row:", row);
                throw new Error("Essential properties missing for Ticket object");
            }
            return new Ticket(row);
        });
    });
}
// Fetch all projects from the database and return an array of Project instances
function getAllProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield client.query('SELECT * FROM projects');
        return rows.map((row) => new Project(row));
    });
}
//------------------------------------------------------------
//------------------------------------------------------------
// Save Functions
//------------------------------------------------------------
// Save the state of all User instances to the database
function saveAllUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let user of users) {
            yield user.saveChangesToDB();
        }
    });
}
// Save the state of all Ticket instances to the database
function saveAllTickets(tickets) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let ticket of tickets) {
            //console.log(ticket); 
            yield ticket.saveChangesToDB();
        }
    });
}
// Save the state of all Project instances to the database
function saveAllProjects(projects) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let project of projects) {
            yield project.saveChangesToDB();
        }
    });
}
//------------------------------------------------------------
export { getProjectsByUser, getTicketsByProject, getAllUsers, getAllTickets, getAllProjects, saveAllUsers, saveAllTickets, saveAllProjects };

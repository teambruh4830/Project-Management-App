import express from 'express';
import client from './dist/DB/client.js';
// //TESTING IMPORTS
//import initializeDB from './dist/tests/dbInit.js';
//import User from './dist/DB/User.js';
//import Project from './dist/DB/Project.js';
//import Ticket from './dist/DB/Ticket.js';
//import * as dbUtils from './dist/DB/dbUtil.js';

const app = express();
const port = 3000;

// // Initialize the test database
//await client.connect();
//await initializeDB();

// // Get all users from the database
//const projects = await dbUtils.getAllProjects();
//const users = await dbUtils.getAllUsers();
//const tickets = await dbUtils.getAllTickets();

//const user = users[0].id;
//const relatedProjects = await dbUtils.getProjectsByUser(user);

//console.log('Related projects:');
//console.log(relatedProjects);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

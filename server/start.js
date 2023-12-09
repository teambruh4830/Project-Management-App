import app from './deployment_server.js';
import client from './dist/DB/client.js';
import initializeDB from './dist/utils/dbInit.js';
import { userExists, getAllProjects  } from './dist/DB/dbUtil.js';
import request from 'supertest';

async function startServer() {
    try {
        await client.connect();
        console.log('Database connected successfully.');


        // TESTING!!!
        //await initializeDB();
        //console.log('Database initialized.');
        //const projects = await getAllProjects();
        //console.log('Projects:', projects);

        //const userExistsResult = await userExists('test');
        //console.log('User exists:', userExistsResult);
        //const userExistsResult2 = await userExists('testUser1');
        //console.log('User exists:', userExistsResult2);
        // TESTING!!!



        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit with an error code
    }
}

startServer();

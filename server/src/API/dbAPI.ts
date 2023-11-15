import express from 'express';

const router = express.Router();


// Get the projects a user is a member of/has access to.
router.get('/:userId/projects', async (req, res) => {
    // Get the projects that the user is a member of/has access to.
});

// Get the members of a project from a project id. TODO: MAKE SURE THIS IS A MODIFIED OBJECT THAT ONLY INCLUDES USERNAME AND ID.
router.get('/:projectId/members', async (req, res) => {
    // Get a list of members from the project id. (Should use the same modified object as mentioned above)
});

// Get the tickets of a project from a project id. 
router.get('/:projectId/tickets', async (req, res) => {
    // Check if the user is a member of the project, and if so, get the tickets.
});

// Check if a user exists by username. (Will be used when adding members to a project)
router.get('/userExists/:userName', async (req, res) => {
    // Check if the user exists.
});



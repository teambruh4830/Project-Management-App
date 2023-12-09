import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:3000/api';


// User Registration
// POST request to register a new user with a username and password
axios.post(`${BASE_URL}/users/register`, { username: 'newUser', password: 'password123' })
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'User registered successfully', userId: [new user's ID] }


// User Sign-In
// POST request for a user to sign in with their username and password
axios.post(`${BASE_URL}/users/signin`, { username: 'newUser', password: 'password123' })
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'User signed in successfully', userId: [user ID], username: 'newUser' }


// Retrieve Projects for a User
// GET request to retrieve all projects associated with a specific user ID
const userId = 1; // Example User ID
axios.get(`${BASE_URL}/users/${userId}/projects`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: An array of projects the user with specified ID is a member of


// Create a New Project
// POST request to create a new project with a title and description
axios.post(`${BASE_URL}/projects`, { title: 'New Project', description: 'Project Description' })
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'Project created successfully', projectId: [new project's ID] }


// Add User to Project by Username
// POST request to add a user to a project by their username and the project ID
const projectIdToAddUser = 1; // Example Project ID
const usernameToAdd = 'newUser'; // Example Username
axios.post(`${BASE_URL}/projects/${projectIdToAddUser}/users/${usernameToAdd}`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: 'User newUser added to project successfully'


// Remove User from Project by Username
// DELETE request to remove a user from a project by their username and the project ID
const projectIdToRemoveUser = 1; // Example Project ID
const usernameToRemove = 'newUser'; // Example Username
axios.delete(`${BASE_URL}/projects/${projectIdToRemoveUser}/users/${usernameToRemove}`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: 'User newUser removed from project successfully'


// Delete a Project
// DELETE request to delete a project by its ID
const projectIdToDelete = 1; // Example Project ID
axios.delete(`${BASE_URL}/projects/${projectIdToDelete}`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: 'Project deleted successfully'


// Edit a Project
// PUT request to update a project's details by its ID
const projectIdToUpdate = 1; // Example Project ID
const updatedProjectData = { title: 'Updated Title', description: 'Updated Description' }; // Example updated data
axios.put(`${BASE_URL}/projects/${projectIdToUpdate}`, updatedProjectData)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'Project updated successfully', updatedProject: [updated project object] }


// Retrieve Tickets for a Project
// GET request to retrieve all tickets associated with a specific project ID
const projectIdForTickets = 1; // Example Project ID
axios.get(`${BASE_URL}/projects/${projectIdForTickets}/tickets`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: An array of tickets associated with the specified project ID


// Create a New Ticket
// POST request to create a new ticket associated with a project
const newTicketData = { project_id: projectIdForTickets, type: 'Bug', priority: 1, ...otherData }; // Example ticket data
axios.post(`${BASE_URL}/tickets`, newTicketData)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'Ticket created successfully', ticketId: [new ticket's ID] }


// Edit a Ticket
// PUT request to update a ticket's details by its ID
const ticketIdToUpdate = 1; // Example Ticket ID
const updatedTicketData = { type: 'Feature', priority: 2, ...otherData }; // Example updated ticket data
axios.put(`${BASE_URL}/tickets/${ticketIdToUpdate}`, updatedTicketData)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: { message: 'Ticket updated successfully', updatedTicket: [updated ticket object] }


// Delete a Ticket
// DELETE request to delete a ticket by its ID
const ticketIdToDelete = 1; // Example Ticket ID
axios.delete(`${BASE_URL}/tickets/${ticketIdToDelete}`)
  .then(response => console.log(response.data)) // Successful response
  .catch(error => console.error(error)); // Error response
// Expected Response: 'Ticket deleted successfully'

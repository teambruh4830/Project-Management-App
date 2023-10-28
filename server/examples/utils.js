import axios from 'axios'

export async function login(username, password) {
    try {
        const { data } = await axios.post('/api/users/login', {username, password})
        return data
    } catch (error) {
        console.error('login fail')
        throw error
    }
}

export async function register(username, password) {
    try {
        const { data } = await axios.post('api/users/register', {username, password})
        return data
    } catch (error) {
        console.error('could not create account')
        throw error
    }
}

export async function getTicketsByUserId(userId) {
    try {
        const { data } = await axios.get(`/api/users/${userId}/tickets`)
        return data
    } catch (error) {
        throw error
    }
}

export async function addTicket({userId, type}) {
    try {
        const { data } = await axios.post(`/api/users/${userId}/tickets`, {userId, type})
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteTicket({ticketId}) {
    try {
        const { data } = await axios.post(`/api/projects/${ticketId}/delete`, {ticketId})
        return data
    } catch (error) {
        throw error
    }
}

export async function updateTicket(projectId, newTicketId) {
    try {
        const { data } = await axios.post(`/api/projects/${projectId}/tickets`, {projectId, newTicketId})
        return data
    } catch (error) {
        throw error
    }
}

export async function getProjectsByUserId(userId) {
    try {
        const { data } = await axios.get(`api/users/${userId}/projects`)
        return data
    } catch (error) {
        console.error('could not get projects')
        throw error
    }
}

export async function getProjectById(projectId) {
    try {
        const { data } = await axios.get(`/api/projects/${projectId}`)
        return data
    } catch (error) {
        throw error
    }
}

export async function addProject({userId, ticketId, title, desc}) {
    try {
        const { data } = await axios.post(`api/projects`, {userId, ticketId, title, desc})
        return data
    } catch (error) {
        throw error
    }
}

export async function editProjectCard({projectId, newTitle, newDesc}) {
    try {
        const { data } = await axios.post(`/api/projects/${projectId}/edit`, {projectId, newTitle, newDesc})
        return data
    } catch (error) {
        console.error('edit utils section')
        throw error
    }
}

export async function deleteProjectCard(projectId) {
    try {
        const { data } = await axios.delete(`/api/projects/${projectId}`)
        return data
    } catch (error) {
        throw error
    }
}

export async function test() {
    try {
        const data = await axios.get('/')

        return data
    } catch (error) {
        throw error
    }
}
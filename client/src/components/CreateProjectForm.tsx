import React, { useState } from 'react';

// Define the props interface
interface CreateProjectFormProps {
    onProjectCreation: () => Promise<void>;
    username: string | null; // Updated to accept string or null
  }

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onProjectCreation, username }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Create Project
            const projectResponse = await fetch('http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            const projectResult = await projectResponse.json();
            if (projectResponse.ok) {
                alert('Project created successfully: ' + projectResult.projectId);
                
                // Add User to Project
                const addUserResponse = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/projects/${projectResult.projectId}/users/${username}`, {
                    method: 'POST',
                });

                if (addUserResponse.ok) {
                    alert(`User ${username} added to project successfully`);
                } else {
                    alert('Failed to add user to project');
                }

                await onProjectCreation(); // Update parent component
            } else {
                alert('Failed to create project');
            }
        } catch (error) {
            console.error('Error in operation:', error);
            alert('Error in operation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                placeholder="Title" 
            />
            <textarea 
                value={description} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                placeholder="Description"
            ></textarea>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default CreateProjectForm;

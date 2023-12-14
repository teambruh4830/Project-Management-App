import React, { useState } from 'react';
import { TicketProps } from '../models/Ticket';

// Define the props interface
interface AddTicketFormProps {
  onTicketAddition: () => Promise<void>; // Function to handle adding a new ticket
  project_id: string | null;
  created_by: string | null;
  assigned_by: null;
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({ onTicketAddition, created_by, project_id, assigned_by }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let created_at = new Date();
    let modified_at = new Date();
    e.preventDefault();
    // Validate form inputs here if necessary
    try{
        const ticketResponse = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/tickets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({project_id, created_by, assigned_by, title, description, type, priority, created_at, modified_at }),
            
        });
    const ticketResult = await ticketResponse.json();
    if (ticketResponse.ok) {
        alert('Ticket created successfully: ' + ticketResult.id);
    

        await onTicketAddition(); // Update parent component
    } else {
        alert('Failed to create ticket');
    }
    } catch (error) {
    console.error('Error in operation:', error);
    alert('Error in operation');
}
    }

  

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
      <input
        type="text"
        value={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
        placeholder="Type"
      />
      <input
        type="number"
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
};

export default AddTicketForm;
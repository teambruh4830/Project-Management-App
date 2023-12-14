import React, { useState } from 'react';
import { TicketProps } from '../models/Ticket';

// Define the props interface
interface AddTicketFormProps {
  onTicketAddition: () => Promise<void>; // Function to handle adding a new ticket
  projectId: string | null;
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({ onTicketAddition, projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form inputs here if necessary
    try{
        console.log(title, description, type, priority);
        const ticketResponse = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/projects/${projectId}/tickets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, type, priority }),
            
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
        required
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
        required
      />
      <input
        type="number"
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}
        placeholder="Priority"
        required
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
};

export default AddTicketForm;
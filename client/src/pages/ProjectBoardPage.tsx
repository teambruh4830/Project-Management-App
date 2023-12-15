import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonModal,
  IonButton
} from "@ionic/react";
import Ticket, { TicketProps } from '../models/Ticket'; // Adjust the import path as needed
import AddTicketForm from '../components/AddTicketForm';


const ProjectBoardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketProps | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const goToProjectList = () => {
    history.push('/projects');
  };

  useEffect(() => {
    fetchTickets();
  }, [projectId]);

  const fetchTickets = async () => {
    try {

      const response = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/projects/${projectId}/tickets`);
      if (response.ok) {
        const ticketsData = await response.json();
        setTickets(ticketsData);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const openTicketModal = (ticket: TicketProps) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleTicketCreation = async () => {
    setShowModal(false);
    await fetchTickets();
  };

  const ticketsByType: Record<string, TicketProps[]> = tickets.reduce((acc, ticket) => {
    const type = ticket._type;
    acc[type] = acc[type] || [];
    acc[type].push(ticket);
    return acc;
  }, {} as Record<string, TicketProps[]>);

  const handleDeleteTicket = async () => {
    if (!selectedTicket) {
      // No ticket selected, handle accordingly
      return;
    }
  
    try {
      const response = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/tickets/${selectedTicket._id}`, {
        method: 'DELETE',
        // Add necessary headers or authentication tokens if required
      });
  
      if (response.ok) {
        // Ticket deleted successfully, perform necessary actions
        // For example, close the modal and update the ticket list
        setShowTicketModal(false);
        await fetchTickets(); // Update ticket list after deletion
      } else {
        // Handle error scenarios, display an error message
        console.error('Failed to delete ticket');
        // Display an alert or update state to indicate deletion failure
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      // Handle other potential errors (network issues, etc.)
      // Display an alert or update state to indicate deletion failure
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Project Board</IonTitle>
          <IonButton slot="end" onClick={goToProjectList}>Back to Projects</IonButton>
          <IonButton slot="end" onClick={() => setShowModal(true)}>Add Ticket</IonButton>
        </IonToolbar>
        <IonModal isOpen={showModal}>
          {/* Pass username to CreateProjectForm */}
          <AddTicketForm onTicketAddition={handleTicketCreation} project_id={projectId} created_by={localStorage.getItem('userId')} assigned_by={null} />
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonModal>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {Object.keys(ticketsByType).map(type => (
              <IonCol key={type}>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle size="large">{type}</IonTitle>
                  </IonToolbar>
                </IonHeader>
                {ticketsByType[type].map(ticket => (
                  <IonCard key={ticket._id} onClick={() => openTicketModal(ticket)}>
                    <IonCardHeader>
                      <IonCardTitle>{ticket._title}</IonCardTitle>
                      <IonCardSubtitle>Priority: {ticket._priority}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                ))}
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showTicketModal} onDidDismiss={() => setShowTicketModal(false)}>
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Ticket Details</IonTitle>
                <IonButton onClick={handleDeleteTicket}>Delete Ticket</IonButton>
              </IonToolbar>
            </IonHeader>
            <div style={{ padding: '15px' }}>
              <h2>Title: {selectedTicket?._title}</h2>
              <p>Priority: {selectedTicket?._priority}</p>
              <p>Description: {selectedTicket?._description}</p>
              <p>Type: {selectedTicket?._type}</p>
              {/* You can add more fields here as needed */}
              <p>Assigned To: {selectedTicket?._assigned_to}</p>
              <p>Created By: {selectedTicket?._created_by}</p>
              <p>Created At: {selectedTicket?._created_at.toLocaleString()}</p>
              <p>Modified At: {selectedTicket?._modified_at.toLocaleString()}</p>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProjectBoardPage;

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

const ProjectBoardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketProps | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const history = useHistory();

  const goToProjectList = () => {
    history.push('/projects');
  };

  useEffect(() => {
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

    fetchTickets();
  }, [projectId]);

  const openTicketModal = (ticket: TicketProps) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const ticketsByType: Record<string, TicketProps[]> = tickets.reduce((acc, ticket) => {
    const type = ticket._type;
    acc[type] = acc[type] || [];
    acc[type].push(ticket);
    return acc;
  }, {} as Record<string, TicketProps[]>);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Project Board</IonTitle>
          <IonButton slot="end" onClick={goToProjectList}>Back to Projects</IonButton>
        </IonToolbar>
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

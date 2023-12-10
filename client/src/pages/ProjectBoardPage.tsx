import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonLabel
} from "@ionic/react";

import { TicketProps } from '../models/Ticket';

const ProjectBoardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
        try {
            const response = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/projects/${projectId}/tickets`);
            if (response.ok) {
                const ticketsData = await response.json();
                console.log('Tickets:', ticketsData); // Debugging log
                setTickets(ticketsData);
            } else {
                console.error('Failed to fetch tickets, Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
        setLoading(false);
    };

    fetchTickets();
  }, [projectId]);

  console.log('Rendered Tickets:', tickets); // Debugging log

  if (loading) {
    return <IonLabel>Loading...</IonLabel>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Project Board</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {tickets.map((ticket) => (
              <IonCol key={ticket._id}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{ticket._title}</IonCardTitle>
                    <IonCardSubtitle>{ticket._assigned_to ? `Assigned to: ${ticket._assigned_to}` : 'Unassigned'}</IonCardSubtitle>
                    {/* Additional ticket details can be added here */}
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProjectBoardPage;

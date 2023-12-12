import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonModal
} from '@ionic/react';
import CreateProjectForm from '../components/CreateProjectForm';
import { ProjectProps } from '../models/Project';

const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Retrieve the username from localStorage
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000/api/users/${userId}/projects`);
        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          alert('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert('Error fetching projects');
      }
    } else {
      alert('User ID not found');
    }
    setLoading(false);
  };

  const handleProjectCreation = async () => {
    setShowModal(false);
    await fetchProjects();
  };

  if (loading) {
    return <IonLabel>Loading...</IonLabel>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Projects</IonTitle>
          <IonButton slot="end" onClick={() => setShowModal(true)}>Create New Project</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal isOpen={showModal}>
          {/* Pass username to CreateProjectForm */}
          <CreateProjectForm onProjectCreation={handleProjectCreation} username={username} />
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonModal>
        <IonList>
          {projects.map((project) => (
            <Link to={`/projects/${project._id}`} key={project._id}>
              <IonItem>
                <IonLabel>
                  <h2>{project._title}</h2>
                  <p>{project._description}</p>
                  <p>Created at: {new Date(project._created_at).toLocaleDateString()}</p>
                </IonLabel>
              </IonItem>
            </Link>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProjectListPage;

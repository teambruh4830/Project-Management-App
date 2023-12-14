import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";

const SignInPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const history = useHistory();
  
    const handleInputChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      if (name === 'username') setUsername(value);
      if (name === 'password') setPassword(value);
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const baseUrl = 'http://ec2-52-13-3-131.us-west-2.compute.amazonaws.com:3000';
      const apiEndpoint = isRegistering ? '/api/users/register' : '/api/users/signin';
      const url = `${baseUrl}${apiEndpoint}`;
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
          const data = await response.json();
          alert(data.message);

          // Save the userId in localStorage
          localStorage.setItem('userId', data.userId);
    
          // Save the username in localStorage
          localStorage.setItem('username', username);
    
          if (isRegistering) {
            // Additional logic for post-registration
          } else {
            // Logic for successful sign-in
            history.push('/projects');
          }
        } else if (response.status === 409) {
          alert('Error: User already exists');
        } else if (response.status === 401) {
          alert('Error: Invalid username or password');
        } else {
          const errorText = await response.text();
          alert('Error: ' + errorText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
      }
    };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isRegistering ? "Register" : "Sign In"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="6" offsetMd="3">
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    type="text"
                    name="username"
                    value={username}
                    onIonChange={handleInputChange}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    name="password"
                    value={password}
                    onIonChange={handleInputChange}
                    required
                  />
                </IonItem>
                <IonButton expand="block" type="submit">
                  {isRegistering ? "Register" : "Sign In"}
                </IonButton>
                <IonButton
                  expand="block"
                  fill="clear"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? "Already have an account? Sign In"
                    : "Need an account? Register"}
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;

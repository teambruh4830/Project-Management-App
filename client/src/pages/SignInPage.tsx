import React, { useState } from 'react';
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
  IonLabel
} from '@ionic/react';

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Handle successful sign in/register here
        // For example, store user ID in local storage or context for session management
        if (!isRegistering) {
          // Assuming data.userId is the user's ID
          localStorage.setItem('userId', data.userId);
          // Navigate to a different page or update state to indicate user is signed in
        }
      } else {
        alert('Error: ' + (data.message || 'An error occurred'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isRegistering ? 'Register' : 'Sign In'}</IonTitle>
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
                  {isRegistering ? 'Register' : 'Sign In'}
                </IonButton>
                <IonButton expand="block" fill="clear" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
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

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
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Project Management App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonHeader>
                <IonToolbar>
                  <IonTitle size="large">Backlog</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Story Name</IonCardTitle>
                  <IonCardSubtitle>Dev/Unassigned</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Refactor the project</IonCardTitle>
                  <IonCardSubtitle>Keegan Sims</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Create Documents</IonCardTitle>
                  <IonCardSubtitle>Sam Bloomingdale</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              {/* </IonContent> */}
            </IonCol>
            <IonCol>
              <IonHeader>
                <IonToolbar>
                  <IonTitle size="large">In Progress</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>UI Design</IonCardTitle>
                  <IonCardSubtitle>Brian Tran</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Task Functions</IonCardTitle>
                  <IonCardSubtitle>Camden Murphy</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Task ordering</IonCardTitle>
                  <IonCardSubtitle>Keegan Sims</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Build & bug fix</IonCardTitle>
                  <IonCardSubtitle>Keegan Sims</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonHeader>
                <IonToolbar>
                  <IonTitle size="large">Finished</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Q/A Testing</IonCardTitle>
                  <IonCardSubtitle>Camden Murphy</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                {" "}
                <IonCardHeader>
                  <IonCardTitle>EC2 Set up</IonCardTitle>
                  <IonCardSubtitle>Sam Bloomingdale</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Database Set up</IonCardTitle>
                  <IonCardSubtitle>Sam Bloomingdale</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Express Server</IonCardTitle>
                  <IonCardSubtitle>Sam Bloomingdale</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

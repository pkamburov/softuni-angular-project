import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from './environments/environment';

const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

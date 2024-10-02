import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDRNcC4TbnKTP3iUVnoVjhJ_QMrK0CeW2M",
    authDomain: "rgjobs-88be3.firebaseapp.com",
    projectId: "rgjobs-88be3",
    storageBucket: "rgjobs-88be3.appspot.com",
    messagingSenderId: "985472583440",
    appId: "1:985472583440:web:cac3ba0f7c77a2ed504795",
    measurementId: "G-4XG1HR2ZPE"
  };
  
  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
 // Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
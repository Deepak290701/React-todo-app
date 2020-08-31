import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDbpH_e8DNO0xpRfnIxgH-d2wO_eC0q71s",
    authDomain: "todo-app-c329c.firebaseapp.com",
    databaseURL: "https://todo-app-c329c.firebaseio.com",
    projectId: "todo-app-c329c",
    storageBucket: "todo-app-c329c.appspot.com",
    messagingSenderId: "810913638355",
    appId: "1:810913638355:web:7128ab4203a18a505e3126",
    measurementId: "G-T3E1CM0CEM",
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;

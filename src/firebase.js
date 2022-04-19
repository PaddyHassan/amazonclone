// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDt7q5p4tZVFEmkkFT7-o2vte1wwdn0aWU",
    authDomain: "clone-ad354.firebaseapp.com",
    projectId: "clone-ad354",
    storageBucket: "clone-ad354.appspot.com",
    messagingSenderId: "228339998606",
    appId: "1:228339998606:web:93ecabec992fbabfdd8edf",
    measurementId: "G-20KK564L64"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth };
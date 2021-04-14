// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAmJjPkL6wSR3HB5Z1LDFyuU1YJ1Wq3F54',
  authDomain: 'consumerism-app.firebaseapp.com',
  databaseURL:
    'https://consumerism-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'consumerism-app',
  storageBucket: 'consumerism-app.appspot.com',
  messagingSenderId: '656159019089',
  appId: '1:656159019089:web:6c95cfcc952a0a01c5e870',
  measurementId: 'G-KFFT3N3P7K',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleAuthProvider);
};

export const signOut = () => {
  auth.signOut();
};

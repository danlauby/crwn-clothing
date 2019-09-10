import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0Nq0YoUHlST5fAy35Wvi9Ck1KxiB4W_M",
    authDomain: "crwn-db-159f9.firebaseapp.com",
    databaseURL: "https://crwn-db-159f9.firebaseio.com",
    projectId: "crwn-db-159f9",
    storageBucket: "",
    messagingSenderId: "140696706270",
    appId: "1:140696706270:web:23f13b3c845e2e6fc8f64f"
  };


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

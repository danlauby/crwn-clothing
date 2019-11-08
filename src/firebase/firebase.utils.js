import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

// configurations for connecting to firebase
const config = {
  apiKey: "AIzaSyD0Nq0YoUHlST5fAy35Wvi9Ck1KxiB4W_M",
  authDomain: "crwn-db-159f9.firebaseapp.com",
  databaseURL: "https://crwn-db-159f9.firebaseio.com",
  projectId: "crwn-db-159f9",
  storageBucket: "",
  messagingSenderId: "140696706270",
  appId: "1:140696706270:web:23f13b3c845e2e6fc8f64f"
};

// initialize firebase with congigurations
firebase.initializeApp(config);

// create a user document in firestore asynchronous
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // get UID of current user
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // get snapshot of current user
  const snapShot = await userRef.get()

  // if user doesn't exist in firebase authentication, create new user with username & email
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    // add timestamp to entry
    const createdAt = new Date();

    // asynchronous try/catch block if user doesn't exist set user, else log error
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(err) {
      console.log('Error creating new user: ', err.message);
    }
  }

  return userRef;
}

// programmatically upload data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  // get the collection key
  const collectionRef = firestore.collection(collectionKey);

  // iterate over collection objects with document reference and save collection to firestore as a batch
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// converts collection snapshot array into an object
export const convertCollectionsSnapshotToMap = (collections) => {

  // iterate over each document (collection)
  const transformedCollection = collections.docs.map(doc => {
    // decontruct title & items from each document
    const { title, items } = doc.data();

    return {
      // set routeName as collection title & make it URL friendly
      routeName: encodeURI(title.toLowerCase()),
      // get id of document that firestore automatically generates
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};

// user authentication
export const auth = firebase.auth();

// firestire db
export const firestore = firebase.firestore();


// select how a user will be able to signup or authenticate, a popup modal
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

  
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBjrN50HZbRvXY7OE6ozB0hjN4TPr507hQ",
    authDomain: "crown-db-c89c3.firebaseapp.com",
    databaseURL: "https://crown-db-c89c3.firebaseio.com",
    projectId: "crown-db-c89c3",
    storageBucket: "crown-db-c89c3.appspot.com",
    messagingSenderId: "514206127610",
    appId: "1:514206127610:web:b16ec92af8ad79600e0043",
    measurementId: "G-R0MMSFVGKL"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
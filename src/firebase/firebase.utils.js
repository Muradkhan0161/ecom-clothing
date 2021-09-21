/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAYiiJ0Tztc3cf--eLs7etC1DFUIiCmb2c",
  authDomain: "crwn-db77777.firebaseapp.com",
  projectId: "crwn-db77777",
  storageBucket: "crwn-db77777.appspot.com",
  messagingSenderId: "185515449253",
  appId: "1:185515449253:web:3f3d16e224bbd59c31e64c",
  measurementId: "G-0JX379MHGR",
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
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const auth = getAuth();
export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase;

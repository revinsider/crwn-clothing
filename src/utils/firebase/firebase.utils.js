import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyJX_gyKJjX947pE-z0Hw9u_oldkTa0Gs",
  authDomain: "crwn-clothing-db-c865b.firebaseapp.com",
  projectId: "crwn-clothing-db-c865b",
  storageBucket: "crwn-clothing-db-c865b.appspot.com",
  messagingSenderId: "40004453521",
  appId: "1:40004453521:web:085b21ba8d01916c68eb30",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // if user data does not exists
    // create / set  the document with the data from userAuth in my collecion
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // if user data exists
  return userDocRef;
};

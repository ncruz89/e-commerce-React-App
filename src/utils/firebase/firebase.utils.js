import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Jq_EEGCCIlaLzQG9SVCCWoR1gsfAePw",
  authDomain: "e-commerce-react-app-db.firebaseapp.com",
  projectId: "e-commerce-react-app-db",
  storageBucket: "e-commerce-react-app-db.appspot.com",
  messagingSenderId: "276806747083",
  appId: "1:276806747083:web:b4a9abe933fbd7e6f26c4e",
};

// Initialize Firebase
// firebase boilerplate
initializeApp(firebaseConfig);

// must create a provider to use with firebase login functions
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// retrieves current firebase auth instance
export const auth = getAuth();

// sign in with google pop up function from firebase library
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// sign in with google redirect function from firebase library
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// set db variable using getFirestore function from firebase/firestore - firebase boilerplate
export const db = getFirestore();

// creating collection map - firebase boilerplate
// populating db with product documents in appropriate categories (collections)
// used shop-data.js file populated with store data
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // creates collection reference in db
  const batch = writeBatch(db); // creates batch to house documents in collection

  // goes through objectsToAdd and creates document reference for each category (collection) where the object title is the key
  // batch set uses doc ref and sets the object (contains shop data documents) to the corresponding doc ref key - if there isn't a collection it will automatically create one
  // sets those collections to batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // commits batch to db
  await batch.commit();
  console.log("done");
};

// retrieves categories array from collection
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // for scalability sake, simply returning a categories array
  // now there is only a base form of the shop data and selectors can handle manipulating it
  // this way if another selector wanted to manipulate the data in a different way, it can do so.
};

// creates user document in firebase if user already exists returns userDocRef
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // check if user data exists
  // if user data doesn't exist, create/set the doc with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  // if exists, return userDocRef
  return userDocRef;
};

// function to call firebases createUserWithEmailAndPassword method
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// function to call firebases signInWithEmailAndPassword method
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// function to call firebases signOut method
export const signOutUser = async () => signOut(auth);

// auth observer used in app.js listens to auth state change and runs callback on auth change
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

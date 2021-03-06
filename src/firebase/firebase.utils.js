import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBb2PEMukwbQdD4P_MD_yeOEazhJH-CGN0",
    authDomain: "shop-db-44caf.firebaseapp.com",
    databaseURL: "https://shop-db-44caf.firebaseio.com",
    projectId: "shop-db-44caf",
    storageBucket: "shop-db-44caf.appspot.com",
    messagingSenderId: "415976812386",
    appId: "1:415976812386:web:1f1f269a07f5ac8392063b",
    measurementId: "G-ETQ469MQJH"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
      }catch(error){
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
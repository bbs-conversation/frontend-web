import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8KMFHs1WJFSV5RfybatDYHB7SWt6wc7k',
  authDomain: 'bbs-conversations.firebaseapp.com',
  projectId: 'bbs-conversations',
  storageBucket: 'bbs-conversations.appspot.com',
  messagingSenderId: '767163027634',
  appId: '1:767163027634:web:91b50e8ac5f06613b379ab',
  measurementId: 'G-NSYES0NCBB',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// if (typeof window !== 'undefined') {
//   if (process.env.NODE_ENV === 'development') {
//     db.useEmulator('localhost', 8080);
//   }
// }

const storage = firebase.storage();

// if (process.env.NODE_ENV === 'development') {
//   storage.useEmulator('localhost', 9199);
// }

const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();
const microsoftAuth = new firebase.auth.OAuthProvider('microsoft.com');
microsoftAuth.setCustomParameters({
  tenant: '581747cb-f4f5-49b3-aeec-baad159fc64c',
});

export { auth, db, storage, googleAuth, microsoftAuth };

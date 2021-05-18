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

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, googleAuth };
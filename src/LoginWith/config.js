// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBWFVXmVyUxY2o7SH_7GYPBWpeMUc4ok18',
    authDomain: 'webchat-4704f.firebaseapp.com',
    projectId: 'webchat-4704f',
    storageBucket: 'webchat-4704f.appspot.com',
    messagingSenderId: '765996912619',
    appId: '1:765996912619:web:d9d66aaca44e64f10513ae',
    measurementId: 'G-TDHJDM2P1H',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
export { db, auth };
export default firebase;

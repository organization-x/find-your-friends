import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDEKDFIbbbameAcQprTrCaOfCCF6FSajCI",
    authDomain: "find-my-friends-207e5.firebaseapp.com",
    projectId: "find-my-friends-207e5",
    storageBucket: "find-my-friends-207e5.appspot.com",
    messagingSenderId: "523384189636",
    appId: "1:523384189636:web:fd12e5f6726640aaeacf91",
    measurementId: "G-MH2FB7K1YH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
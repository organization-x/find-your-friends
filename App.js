import React from 'react'
import { Dimensions, Platform } from 'react-native'
import ARScreen from './app/screens/ARScreen'
import FriendsListScreen from './app/screens/FriendsListScreen'
import Navigator from './routes/homeStack'
//import FirebaseStuff from './app/firebaseTest'
import firebase from "firebase";

export default function App () {
  console.log('App Executed')
  console.log('Platform is: ' + Platform.OS + ' Dimensions are: ' + Dimensions.get('screen').scale)

  const firebaseConfig = {
    apiKey: "AIzaSyDEKDFIbbbameAcQprTrCaOfCCF6FSajCI",
    authDomain: "find-my-friends-207e5.firebaseapp.com",
    projectId: "find-my-friends-207e5",
    storageBucket: "find-my-friends-207e5.appspot.com",
    messagingSenderId: "523384189636",
    appId: "1:523384189636:web:fd12e5f6726640aaeacf91",
    measurementId: "G-MH2FB7K1YH"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const heightFlex = Dimensions.get('screen').height

  return (
    <Navigator />
    // <ARScreen />
    // <FriendsListScreen />
  )
}

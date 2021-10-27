import React from 'react'
import { Text, Dimensions, Platform } from 'react-native'
import Navigator from './routes/homeStack'

// import FirebaseStuff from './app/firebaseTest'
import firebase from 'firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firebaseConfig } from './app/firebaseTest'

// firebase.initializeApp(firebaseConfig);

export default function App () {
  console.log('App Executed')
  console.log('Platform is: ' + Platform.OS)
  console.log('Scale is: ' + Dimensions.get('screen').scale + ' Height is: ' + Dimensions.get('screen').height)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }

  // A function that can be used to write data to the database

  /* function writeUserData(userId, name, email, lat, long) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      lattitude : lat,
      longitude: long
    });
  }

  writeUserData("TestUser2", "Tyler", "insertMyEmailHere", 10.442, -49.21); */

  return (
    <Navigator />
  )
}

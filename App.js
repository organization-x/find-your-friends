import React from 'react'
import { Text, Dimensions, Platform } from 'react-native'
import Navigator from './routes/homeStack'
import firebase from 'firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firebaseConfig } from './app/config'

// firebase.initializeApp(firebaseConfig);

export default function App () {
  console.log('App Executed')
  console.log('Platform is: ' + Platform.OS)
  console.log('Scale is: ' + Dimensions.get('screen').scale + ' Height is: ' + Dimensions.get('screen').height + '\n')

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }

  return (
    <Navigator />
  )
}

import React from 'react'
import { Dimensions, Platform } from 'react-native'
import Navigator from './routes/homeStack'

// firebase.initializeApp(firebaseConfig);

export default function App () {
  console.log('App Executed')
  console.log('Platform is: ' + Platform.OS)
  console.log('Scale is: ' + Dimensions.get('screen').scale + ' Height is: ' + Dimensions.get('screen').height + '\n')

  return (
    <Navigator />
  )
}

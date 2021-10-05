import React from 'react'
import { Dimensions, Platform } from 'react-native'
import ARScreen from './app/screens/ARScreen'
import FriendsListScreen from './app/screens/FriendsListScreen'
import Navigator from './routes/homeStack'

export default function App () {
  console.log('App Executed')
  console.log('Platform is: ' + Platform.OS + ' Dimensions are: ' + Dimensions.get('screen').scale)

  const heightFlex = Dimensions.get('screen').height

  return (
    <Navigator />
    // <ARScreen />
    //<FriendsListScreen />
  )
}

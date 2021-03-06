import React, { Component, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

function LoadingScreen ({ navigation }) {
  useEffect(() => {
    checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(
        function (user) {
          console.log('AUTH STATE CHANGED CALLED ')
          if (user) {
            navigation.navigate('ARScreen')
          } else {
            navigation.navigate('LoginScreen')
          }
        }.bind()
      )
    }
    checkIfLoggedIn()
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  )
}
export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

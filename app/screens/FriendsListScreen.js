import React from 'react'
import { Text, Button, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'

function FriendsListScreen (props) {
  return (

    <SafeAreaView style={styles.background}>
      <Button
        title='Add Friends!'
      />

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'green'
  }
})

export default FriendsListScreen

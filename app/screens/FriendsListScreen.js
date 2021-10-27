import React from 'react'
import { Text, Button, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'

function FriendsListScreen ({ navigation }) {
  const ARScreenPressHandler = () => {
    navigation.navigate('ARScreen')
  }

  return (

    <SafeAreaView style={styles.background}>
      <Button
        onPress={ARScreenPressHandler}
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

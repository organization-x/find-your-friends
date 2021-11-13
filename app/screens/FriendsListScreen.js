import React, { useState } from 'react'
import { render } from 'react-dom'
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import { makeFriends, currentUser, getFriends, readLocation } from '../components/FirebaseComponent'

function FriendsListScreen ({ navigation }) {
  const [user, setUser] = useState('')
  const [friends, setFriends] = useState(getFriends)
  const [addedFriend, setAddedFriend] = useState('')
  const [revealCode, setRevealCode] = useState(true)

  const backButtonNavigator = () => {
    navigation.navigate('ARScreen')
  }

  const revealFriendCode = () => {
    // This flips revealCode from true to false or false to true.
    // The code is then revealed

    setRevealCode(!revealCode)
    if (revealCode) {
      setUser('Here is your friend code: ' + currentUser())
    } else {
      setUser('')
    }
  }

  const addFriendHandler = () => {
    makeFriends(addedFriend)
  }

  return (
    <SafeAreaView style={styles.background}>
      <Button
        onPress={backButtonNavigator}
        title='Back Button'
        style={styles.buttons}
      />
      <Button
        onPress={revealFriendCode}
        title='Reveal Friend Code'
        style={styles.buttons}
      />
      <Text>{user}</Text>
      <Text>All your friends: {friends}</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Friend ID!'
        onChangeText={(val) => setAddedFriend(val)}
      />
      <Text>The friend you want to add is: {addedFriend}</Text>
      <Button
        onPress={addFriendHandler}
        title='Add Friend!'
        style={styles.buttons}
      />

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  buttons: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 8,
    margin: 10,
    width: 200
  }
})

export default FriendsListScreen

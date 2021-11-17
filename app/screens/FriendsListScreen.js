import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { View, Text, TextInput, Button, Dimensions, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import { makeFriends, currentUser, getFriends, readLocation, clearFriends} from '../components/FirebaseComponent'

function FriendsListScreen ({ navigation }) {
  const [user, setUser] = useState('')
  const [addedFriend, setAddedFriend] = useState('')
  const [revealCode, setRevealCode] = useState(true)
  const [friends, setFriends] = useState(["Loading...","loading"]);

  const backButtonNavigator = () => {
    navigation.navigate('ARScreen')
  }

  useEffect(() => {
    getFriends().then(x => {
      setFriends(x);
      console.log("Friends is now:" + friends);
    }).catch(error => {
      console.log("error occurred");
    })
  }, [])

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

  const clearFriendsHandler = () =>{
    clearFriends()
  }

  if(friends == null){
    friends = ["No friends"];
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
      <Text>All your friends: {friends.join(', ')}</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Friend ID!'
        onChangeText={(val) => setAddedFriend(val)}
      />
      <Text>The friend you want to add is: {addedFriend}</Text>
      <View style ={styles.buttonsContainer}>
        <Button
          onPress={clearFriendsHandler}
          title='Clear All Friends!'
          style={styles.buttons}
        />

        <Button
          onPress={addFriendHandler}
          title='Add Friend!'
          style={styles.buttons}
        />
      </View>
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
  },
  buttonsContainer:{
    flex: 1,
    flexDirection:'row',
    top: Dimensions.get('screen').width/2
  }

})

export default FriendsListScreen

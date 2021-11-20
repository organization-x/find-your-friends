/*

used for Adding and Removing friends

*/

import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { makeFriends, currentUser, getFriends, clearFriends, writeData } from '../components/FirebaseComponent'
import Clipboard from 'expo-clipboard'

function FriendsListScreen ({ navigation }) {
    const [user, setUser] = useState('')
    const [addedFriend, setAddedFriend] = useState('')
    const [revealCode, setRevealCode] = useState(true)
    const [friends, setFriends] = useState(['Loading...', 'loading'])

    //This ensures that the friend data list exists
    writeData()

    //This is a simple handler, made for the back button, to navigate to the ARScreen
    const backButtonNavigator = () => {
        navigation.navigate('ARScreen')
    }

    //Asynchronous call to getting friends from Firebase 
    useEffect(() => {
        getFriends().then(x => {
            setFriends(x)
            console.log('Friends is now:' + friends)
        }).catch(error => {
            console.log('error occurred')
        })
    }, [])

    // This flips revealCode from true to false or false to true.
    // The code is then revealed
    const revealFriendCode = () => {
        setRevealCode(!revealCode)
        if (revealCode) {
            setUser(currentUser())
        } else {
            setUser('')
        }
    }

    //This handler adds friends. addedFriend is a string that is passed into the makeFriends function
    const addFriendHandler = () => {
        makeFriends(addedFriend)
    }

    //This handler clears all friends. The clearFriends function is called. 
    const clearFriendsHandler = () => {
        clearFriends()
    }

    //This handler copies the friend code to a device's clipboard. 
    const copyFriendCodeHandler = () => {
        Clipboard.setString(currentUser())
        Alert.alert(
        'Friend Code has been copied',
        '',
        [
            {
            text: 'Ok',
            }
        ]
        )
    }

    if (friends == null) {
        friends = ['No friends']
    }

    return (
        <SafeAreaView style={styles.background}>
        <View style={styles.topContainer} />
        <View style={styles.friendCodeContainer}>
            <TouchableOpacity onPress={revealFriendCode} style={styles.button}>
            <Text style={styles.buttonTextFriends}>Show My Friend Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={copyFriendCodeHandler} style={styles.button}>
            <Text style={styles.buttonTextFriends}>Copy My Friend Code</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.screenText}>{user}</Text>
        <Text style={styles.screenText} />
        <Text style={styles.screenText}>My friends: {friends.join(', ')}</Text>
        <TextInput
            style={styles.input}
            placeholder='Enter Friend ID!'
            onChangeText={(val) => setAddedFriend(val)}
        />
        <Text style={styles.screenText}>The friend you want to add is: {addedFriend}</Text>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={backButtonNavigator} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearFriendsHandler} style={styles.button}>
            <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addFriendHandler} style={styles.button}>
            <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>

    )
}

const dim = Dimensions.get('screen').width / 100

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
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    top: Dimensions.get('screen').width / 2
  },
  button: {
    backgroundColor: 'green',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.25
  },
  buttonTextFriends: {
    fontSize: 11.2,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.25
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.25
  },
  screenText: {
    fontSize: 15,
    color: '#000',
    letterSpacing: 0.25
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#DBF1A5',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  topContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#DBF1A5',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0
  },
  friendCodeContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#DBF1A5',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    top: Dimensions.get('screen').width / 2,
    height: 75
  }
})

export default FriendsListScreen

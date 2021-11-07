import React, { useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'

class FirebaseComponent extends React.Component {
  render () {
    return (
      <Text>Firebase user is: {user}</Text>
    )
  }
}

export function writeUserData (lat, long) {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
    // email: email,
    lattitude: lat,
    longitude: long,
    // gmail: result.user.email,
    // profile_picture: result.additionalUserInfo.profile.picture,
    // first_name: result.additionalUserInfo.profile.given_name,
    // last_name: result.additionalUserInfo.profile.family_name,
    last_logged_in: Date.now()
  })
}
<<<<<<< Updated upstream
=======

export function readLocation(user){

    let location;
    firebase.database().ref('/users/' + user).on('value', snapshot => {
      	location = [snapshot.val().lattitude, snapshot.val().longitude];
    });
  
    return location;
}
>>>>>>> Stashed changes

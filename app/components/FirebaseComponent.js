import React from 'react'
import { Text } from 'react-native'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
	  apiKey: 'AIzaSyDEKDFIbbbameAcQprTrCaOfCCF6FSajCI',
	  authDomain: 'find-my-friends-207e5.firebaseapp.com',
	  databaseURL: 'https://find-my-friends-207e5-default-rtdb.firebaseio.com',
	  projectId: 'find-my-friends-207e5',
	  storageBucket: 'find-my-friends-207e5.appspot.com',
	  messagingSenderId: '523384189636',
	  appId: '1:523384189636:web:fd12e5f6726640aaeacf91',
	  measurementId: 'G-MH2FB7K1YH'
  })
} else {
  firebase.app() // if already initialized, use that one
}

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

export function readFriends () {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('/users/' + currentUser()).on('value', snapshot => {
      resolve(snapshot.val().added)
    })
  })
}

export function readLocation (user) {
  return new Promise(function (resolve, reject) { 
    firebase.database().ref('/users/' + user).on('value', snapshot => {
      try{
       
        const long = snapshot.val().lattitude; const lat = snapshot.val().longitude;
        console.log('Location is' + long + ' ' + lat);
        resolve([lat,long]);
      }catch(e){
        resolve(false);
      }
      
    })
  })
}

export function currentUser () {
  return firebase.auth().currentUser.uid
}

export function makeFriends (friendToAdd) {
  let friendsList
  firebase.database().ref('/friends/' + firebase.auth().currentUser.uid + '/added').on('value', snapshot => {
    friendsList = snapshot.val()
  })

  friendsList.push(friendToAdd)

  firebase.database().ref('/friends/' + firebase.auth().currentUser.uid).update({
    added: friendsList
  })
  return 'completed';
}

export function clearFriends(){
  firebase.database().ref('/friends/' + firebase.auth().currentUser.uid).update({
    added: ["No one"]
  })
}

export function getFriends () {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('/friends/' + firebase.auth().currentUser.uid + '/added').on('value', snapshot => {
      const friendsList = snapshot.val()

      // This does not return correctly
      console.log("Friends list in function: " +friendsList);
      resolve(friendsList);
    })
  })
}

//This function is for emergencies only
export function writeData(){
  firebase.database().ref('/friends/' + firebase.auth().currentUser.uid).set({
    added: ["No one"]
  })
}
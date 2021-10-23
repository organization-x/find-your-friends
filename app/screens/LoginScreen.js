import React from 'react'
import { Text, Button, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import firebase from 'firebase'

import * as Google from 'expo-google-app-auth';
import { Component } from 'react';
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!UserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken);
  
        // Sign in with credential from the Google user.
        signInWithCredential(auth, credential).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });

        firebase
          .auth()
          .auth.Auth.signInAndRetrieveDataWithCredential()
          .then(function (result){
            console.log('user signed in');
            firebase 
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name
              })
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

    signInWithGoogleAsync = async() => {
        console.log("Attempting Sign in");
        try {
            const result = await Google.logInAsync({
                androidClientId: '523384189636-omdtfl8j6p7scuqb1rbr1l547272ovh0.apps.googleusercontent.com',
                iosClientId: '523384189636-7ojnd8udgft8kkdsrhu8fs5q789rpf9r.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type == 'success') {
                console.log("Successful Sign in!");
                onSignIn(result);
                //console.log(result.user.email);
                this.props.navigation.navigate('FriendsListScreen');
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
                return { error: true };
        }
    }

    render(){
  return (

    <SafeAreaView style={styles.background}>
      <Button
        style = {styles.button}
        onPress={() => this.signInWithGoogleAsync()}
        title='Login with Google'
      />

    </SafeAreaView>

  )
    }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F4D03F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button:{
    flex: 1,
  }
})

export default LoginScreen

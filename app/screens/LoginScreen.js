import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

import * as GoogleSignIn from 'expo-google-sign-in';

function LoginScreen () {
    const { user, setUser } = useState(null)

    useEffect(()=>{
        initAsync()
    },[])
    async function initAsync(){
        await GoogleSignIn.initAsync({
          clientId: '523384189636-7ojnd8udgft8kkdsrhu8fs5q789rpf9r.apps.googleusercontent.com',
          Android: '523384189636-omdtfl8j6p7scuqb1rbr1l547272ovh0.apps.googleusercontent.com',
          iOS: '523384189636-7ojnd8udgft8kkdsrhu8fs5q789rpf9r.apps.googleusercontent.com',
        })
        _syncUserWithStateAsync()
    }
    async function _syncUserWithStateAsync(){
        const user = await GoogleSignIn.signInSilentAsync();
        setUser(user)

    }
    async function signInAsync () {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                _syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    }
    
    async function signOutAsync(){
        await GoogleSignIn.signOutAsync();
        setUser(null)
    }
    function onPress () {
        if (user) {
            signOutAsync();
        } else {
            signInAsync();
            onSignIn();
        }
    };
    function isUserEqual (googleUser, firebaseUser) {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData
            for (let i = 0; i < providerData.length; i++) {
                if (
                providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                // We don't need to reauth the Firebase connection.
                return true
                }
            }
        }
        return false
    }
    function onSignIn (googleUser) {
        console.log('Google Auth Response', googleUser)
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
            function (firebaseUser) {
                unsubscribe()
                // Check if we are already signed-in Firebase with the correct user.
                if (!isUserEqual(googleUser, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    const credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.idToken,
                        googleUser.accessToken
                    )
                    // Sign in with credential from the Google user.
                    firebase.auth().signInWithCredential(credential).then(function (result) {
                        console.log('user signed in ')
                        if (result.additionalUserInfo.isNewUser) {
                            firebase.database().ref('/users/' + result.user.uid).set({
                                gmail: result.user.email,
                                profile_picture: result.additionalUserInfo.profile.picture,
                                first_name: result.additionalUserInfo.profile.given_name,
                                last_name: result.additionalUserInfo.profile.family_name,
                                lattitude: 0,
                                longitude: 0,
                                created_at: Date.now(),
                                last_logged_in: Date.now()
                            })
                            .then(snapshot => {
                                firebase.database().ref('/friends/' + firebase.auth().currentUser.uid).set({added: [""]})
                            })
                        } else {
                            firebase.database().ref('/users/' + result.user.uid).update({
                                last_logged_in: Date.now()
                            })
                        }
                    }).catch(function (error) {
                        // Handle Errors here.
                        const errorCode = error.code
                        const errorMessage = error.message
                        // The email of the user's account used.
                        const email = error.email
                        // The firebase.auth.AuthCredential type that was used.
                        const credential = error.credential
                        // ...
                    })
                } else {
                    console.log('User already signed-in Firebase.')
                }
            }.bind()
        )
    }
    signInWithGoogleAsync = async () => {
        console.log('attempting Login')
        console.log(firebase.auth().currentUser)

        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                androidClientId: '523384189636-omdtfl8j6p7scuqb1rbr1l547272ovh0.apps.googleusercontent.com',
                iosClientId: '523384189636-7ojnd8udgft8kkdsrhu8fs5q789rpf9r.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            })

            if (result.type === 'success') {
                onSignIn(result)
                return result.accessToken
            } else {
                return { cancelled: true }
            }
        } catch (e) {
            return { error: true }
        }
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4D03F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})

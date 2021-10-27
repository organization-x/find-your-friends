import React from 'react'
import {StyleSheet, ActivityIndicator, View } from 'react-native'
import firebase from 'firebase'

import * as Google from 'expo-google-app-auth';
import { Component } from 'react';

class LoadingScreen extends Component {


    /* writeUserData = (userId, name, email, lat, long) => {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          lattitude : lat,
          longitude: long
        });
      } */

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                //This needs to be replaced with actual numbers
                //writeUserData(user.getIdToken, user.name, user.email, 10.442, -49.21);
                this.props.navigation.navigate('FriendsListScreen');
            }else{
                this.props.navigation.navigate('LoginScreen');
            }
        }).bind(this);
    }

    render(){
        return(
            <View style = {styles.container}>
                <ActivityIndicator size = "large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'green'
  },

  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})

export default LoadingScreen

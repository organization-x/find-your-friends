import React from 'react'
import { Text, Button, ImageBackground, StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native'
import firebase from 'firebase'

import * as Google from 'expo-google-app-auth';
import { Component } from 'react';

class LoadingScreen extends Component {
  
    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('FriendsListScreen');
            }else{
                this.props.navigation.navigate('LoginScreen');
            }
        });
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

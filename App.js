import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Alert, SafeAreaView, Dimensions, Button, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ARScreen from './app/screens/ARScreen';

export default function App() {
  const handlePress = () => console.log("Text pressed");
  const yesPress = () => console.log("Yes was pressed.");
  const noPress = () => console.log("No was pressed.");

  console.log("App Executed");
  console.log("Platform is: " + Platform.OS + " Dimensions are: " + Dimensions.get("screen").scale);

  var heightFlex = Dimensions.get("screen").height;

  return (
      <ARScreen />
  );
}

const containerStyle = {backgroundColor: "orange"};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4B215',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('17%'),
    borderWidth: 2,
    borderColor: 'orange',
    flexDirection: 'column',
    justifyContent: 'space-around' 
  },
  text: {
    color: 'white'
  }
});

const anotherStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('80%'),
    borderWidth: 2,
    borderColor: 'green',
    flexDirection: 'column',
    justifyContent: 'space-around' 
  },
  text: {
    color: 'white'
  }
});
import React from 'react';
import { Dimensions, Platform } from 'react-native';
import ARScreen from './app/screens/ARScreen';

export default function App() {

  console.log("App Executed");
  console.log("Platform is: " + Platform.OS + " Dimensions are: " + Dimensions.get("screen").scale);

  var heightFlex = Dimensions.get("screen").height;

  return (
      <ARScreen />
  );
}
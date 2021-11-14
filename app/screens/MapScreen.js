import React, {Component, useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import LocationComponent from '../components/LocationComponent'
import MapView, { Marker } from 'react-native-maps';
import {readLocation} from '../components/FirebaseComponent'
import * as Location from 'expo-location';

var keys = {"Tyler": "XAcuKHuAXib6JovnqaWpYrJMwRU2", "Alexa": "iRYUmGV2kEagUAazosuLO5UPjOu1", "Asher": "UwEJEtRgFZY0wc7rgBOcXpb4Dln2"}

function loadMarkers(){
        m = []
        for(var i of Object.keys(keys)){
            m.push(<Marker description={i} key={i}
            coordinate={readLocation(keys[i])}>
            <View style={styles.marker}></View>
          </Marker>)
        }
        return m
}

function MapScreen() {

  const [location, setLocation] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);
  const [loaded, setLoaded] = useState('false');

	const ARScreenPressHandler = () => {
    navigation.navigate('ARScreen')
  }

  useEffect(() => {
    _getLocationAsync = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
          seterrorMessage('Permission to access location was denied');
          setLoaded('true');
      } 

      const userlocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setLocation(userlocation);
      seterrorMessage(null);
      setLoaded('true');
   
    };

   	_getLocationAsync();

  });

  if (loaded == 'true') {
    return (
       <View style={styles.container}>
         <MapView 
           style={styles.map}
           region={{
             latitude: location.coords.latitude,
             longitude: location.coords.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421
           }} 
           showsUserLocation={true}
           zoomEnabled={true}>
           {loadMarkers()}
       </ MapView>
       <TouchableOpacity onPress={ARScreenPressHandler} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
     </View>
     );
   } else {
     return (
       <View style={styles.container}>
         <Text>Waiting for current location...</Text>
       </View>
     );
   }
}

export default MapScreen;

const dim = Dimensions.get('screen').width / 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'purple',
    borderRadius: 25
  },
	button: {
    backgroundColor: "green",
		margin: 16,
    bottom:dim*20,
		right:dim*35,
		alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
		letterSpacing: 0.25,
  }, 
});
import React, {Component, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import {writeUserData} from './FirebaseComponent';

function LocationComponent() {

  const [location, setLocation] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);
  const [loaded, setLoaded] = useState('false');

  useEffect(() => {
    
    async function _getLocationAsync () {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
          seterrorMessage('Permission to access location was denied');
          setLoaded('true');
          return;
      } else {
          const userlocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          setLocation(userlocation);
          seterrorMessage(null);
          setLoaded('true');
  
          if (location != null) {
            console.log(JSON.stringify(location));
            console.log("Logging User's Location Information");
            writeUserData(location.coords.latitude,location.coords.longitude);
          }
      }

    };

   	_getLocationAsync();

  }, [loaded]);

  if (loaded == 'true') {
    return (
      null
    );
  } else {
    return (
     <Text>Waiting for current location...</Text>
    );
  }
}

export default LocationComponent;

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
});
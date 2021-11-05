import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import {writeUserData} from './FirebaseComponent';

class LocationComponent extends React.Component{

  state = {
    markers: [
    ],

    coordinate: {
      latitude: 0,
      longitude: 0
    },

    location: null,
    errorMessage: null,
    loaded: false
  }
  
  componentDidMount(){
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        loaded: true
      });
    } 

    const userlocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    this.setState({ location: userlocation, loaded: true, errorMessage: null });

    console.log(JSON.stringify(this.state.location));
    console.log(JSON.stringify(this.state.location.coords.latitude));
    console.log(JSON.stringify(this.state.location.coords.longitude));
    
    console.log("Logging User's Location Information");
    writeUserData(this.state.location.coords.latitude,this.state.location.coords.longitude);
    
  };

  render() {
    if (this.state.loaded) {
      return (
       null
      );
    } else {
      return (
          <Text>Waiting for current location...</Text>
      );
    }
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


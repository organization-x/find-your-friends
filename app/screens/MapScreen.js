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

export default class MapScreen extends Component {
  

  state = {
    location: null,
    errorMessage: null,
    loaded: false
  };

  componentDidMount () {
    this._getLocationAsync();
  };

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

  };
render() {
    
    if (this.state.loaded) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
            zoomEnabled={true}>

            {loadMarkers()}
        </ MapView>
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
}

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
import React, {Component, useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import LocationComponent from '../components/LocationComponent'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

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

            <Marker description="Alexa"
              coordinate={{latitude: 38.856850, longitude: -77.356260}}>
              <View style={styles.marker}></View>
            </Marker>
            <Marker description="Charlotte"
              coordinate={{latitude: 38.857360, longitude: -77.393370}}>
              <View style={styles.marker}></View>
            </Marker>
            <Marker description="Tyler"
              coordinate={{latitude: 38.895756, longitude: -77.372213}}>
              <View style={styles.marker}></View>
            </Marker>
            <Marker description="Asher"
              coordinate={{latitude: 38.906910, longitude: -77.401530}}>
              <View style={styles.marker}></View>
            </Marker>
            <Marker description="Jackson"
              coordinate={{latitude: 38.867182, longitude: -77.366666}}>
              <View style={styles.marker}></View>
            </Marker>
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
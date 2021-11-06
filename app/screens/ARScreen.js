import React, { useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions ,SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import LocationComponent from '../components/LocationComponent'
import {readLocation} from '../components/FirebaseComponent'

import { Magnetometer } from 'expo-sensors'
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window');

var keys = {"Tyler": "XAcuKHuAXib6JovnqaWpYrJMwRU2", "Alexa": "iRYUmGV2kEagUAazosuLO5UPjOu1", "Asher": "UwEJEtRgFZY0wc7rgBOcXpb4Dln2"}

function ARScreen ({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0); 

  

  function angleBetween(thisPos, otherPos){
    return Math.atan2(otherPos[1] - thisPos[0],otherPos[0] - thisPos[1])
  }
   
  function angle (sensor, otherPos) {
    let angle = 0;
    if (sensor) {
      let { x, y, z } = sensor;
   
      var d = Math.atan2(z, x)
      var a = angleBetween(location, otherPos)
     
      if(a > 0 && d<a-Math.PI){d+=2*Math.PI}
      else if(a < 0 && d>Math.PI+a){d-=2*Math.PI}
   
      angle = ((d-a)/Math.PI + 1/2 )*width;
    }
    console.log(angle)
    return angle;
  };

  function renderFriends(){
    var friends = []
    var pos = []
    for(let i of Object.keys(keys)){pos.push(readLocation(i))}
    for(var i of pos){
      friends.push(<View style={{backgroundColor: "#42f572",width:50,height:50,borderRadius:25,position: 'absolute', left: angle(magnetometer, i)-25}} key={i}></View>)
    }
    return friends
  }




  const friendsPressHandler = () => {
    console.log('Friends Button Pressed!')
    navigation.navigate('FriendsListScreen')
  }

  const mapsPressHandler = () =>{
    console.log('Maps Button Pressed!')
    navigation.navigate('MapScreen')
  }

  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()



    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();



    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(data);
      })
    );
 
    return () => {
      if(subscription) {subscription.remove();}
      setSubscription(null);
    };
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        {renderFriends()}
        <View style={styles.touchView}> 
          <TouchableOpacity
            style={styles.mapsTouch}
            onPress={mapsPressHandler}
          >
            <Image
              style={styles.mapsBtn}
              source={require('../assets/map_icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsTouch}
            onPress={friendsPressHandler}
          >
            <Image
              style={styles.settingsBtn}
              source={require('../assets/friends_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <View styles = {styles.viewBottom}/>
        <LocationComponent />
      </Camera>
    </View>
  )
}

const dim = Dimensions.get('screen').width / 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-around'
  },

  viewBottom:{
    flex:1
  },
  camera:{
    flex:1,
    flexDirection:'column',
    justifyContent:"space-around",
    alignItems:'center'
  },
  touchView:{
    flex:1,
    flexDirection:'row',
    top:dim*20,
    
  },  
  settingsTouch:{
    alignSelf:'flex-start',
    left:dim*25
  },
  mapsTouch:{
    alignSelf:'flex-start',
    right:dim*25
  },
  settingsBtn: {
    width: 50,
    height: 50,
    
    // alignSelf: 'flex-end',
    // top: '162.5%',
    //left: (dim * 75),
    //top: (dim * 20)
  },
  mapsBtn:{
    width: 954/ 954*50, //Units are from
    height: 1430/ 954*50,
    // alignSelf: 'flex-end',
    // top: '162.5%',
    //left: (dim * 150),
    //top: (dim * 20)
  },
  background: {
    flex: 1,
    alignItems: 'center'
  }
})

export default ARScreen

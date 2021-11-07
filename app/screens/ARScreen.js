import React, { useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import AakashLocation from '../components/LocationComponent'
import LocationComponent from '../components/LocationComponent'

function ARScreen ({ navigation }) {
<<<<<<< Updated upstream
=======
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [location, setLocation] = useState([0,0]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      
      let { status2 } = await Location.requestForegroundPermissionsAsync();
      if (status2 !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation([location.coords.longitude, location.coords.latitude]);
    })()


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
  

  function angleBetween(thisPos, otherPos){
    return Math.atan2(otherPos[1] - thisPos[0],otherPos[0] - thisPos[1])
  }
   
  function angle(sensor, otherPos) {
    let angle = 0;
    if (sensor) {
      let { x, y, z } = sensor;
   
      var d = Math.atan2(z, x)
      var a = angleBetween(location, otherPos)
     
      if(a > 0 && d<a-Math.PI){d+=2*Math.PI}
      else if(a < 0 && d>Math.PI+a){d-=2*Math.PI}
   
      angle = ((d-a)/Math.PI + 1/2 )*width;
    }
    return angle;
  };

  function renderFriends(){
    var friends = []
    var pos = []
    for(let i of Object.values(keys)){pos.push(readLocation(i))}
    for(var i in pos){
      friends.push(<View style={{backgroundColor: "#42f572",width:50,height:50,borderRadius:25,position: 'absolute', left: angle(magnetometer, pos[i])-25}} key={i}></View>)
    }
    return friends
  }




>>>>>>> Stashed changes
  const friendsPressHandler = () => {
    console.log('Friends Button Pressed!')
    navigation.navigate('FriendsListScreen')
  }

<<<<<<< Updated upstream
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])
=======
  const mapsPressHandler = () =>{
    console.log('Maps Button Pressed!')
    navigation.navigate('MapScreen')
  }
>>>>>>> Stashed changes

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <TouchableOpacity
          onPress={friendsPressHandler}
        >
          <Image
            style={styles.settingsBtn}
            source={require('../assets/friends_icon_1.png')}
          />
        </TouchableOpacity>
        <LocationComponent />
      </Camera>
    </View>
  )
}

const dim = Dimensions.get('screen').width / 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  Placement: {
    backgroundColor: 'green',
    // width: dim,
    // height: dim,
    top: '15%',
    right: '100%'
    // alignSelf: 'flex-end'
  },

  background: {
    flex: 1,
    alignItems: 'center'
  },
  settingsBtn: {
    width: 50,
    height: 50,
    // alignSelf: 'flex-end',
    // top: '162.5%',
    left: (dim * 75),
    top: (dim * 20)
  }
})

export default ARScreen

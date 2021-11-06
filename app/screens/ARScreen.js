import React, { useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions ,SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import LocationComponent from '../components/LocationComponent'
import {readLocation} from '../components/FirebaseComponent'

function ARScreen ({ navigation }) {
  const friendsPressHandler = () => {
    console.log('Friends Button Pressed!')
    navigation.navigate('FriendsListScreen')
  }

  const mapsPressHandler = () =>{
    console.log('Maps Button Pressed!')
    navigation.navigate('MapScreen')
  }

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
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

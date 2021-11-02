import React, { useState, useEffect } from 'react'
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity, View, Pressable, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import firebase from 'firebase'
import AakashLocation from '../components/LocationComponent'
import LocationComponent from '../components/LocationComponent'

function ARScreen ({ navigation }) {
  const friendsPressHandler = () => {
    console.log('Friends Button Pressed!')
    navigation.navigate('FriendsListScreen')
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

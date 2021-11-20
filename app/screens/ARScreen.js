/*
    Main App Screen, displays direction to your friends
*/

import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View, Dimensions, SafeAreaView} from 'react-native'
import { Camera } from 'expo-camera'
import LocationComponent from '../components/LocationComponent'
import { readLocation, readFriends } from '../components/FirebaseComponent'

import { Magnetometer } from 'expo-sensors'
import * as Location from 'expo-location'

const { height, width } = Dimensions.get('window')

// store friend data for use
var friends; var pos = []

function angleBetween (thisPos, otherPos) {
    // takes in two positions ([lat, long]), returns bearing from thisPos to otherPos (in radians)
    return Math.atan(otherPos[0]-thisPos[0], otherPos[1]-thisPos[1])
}

function angle (sensor, thisPos, otherPos) {
    // takes in the magnetometer, your position ([lat, long]), and a friends position ([lat, long]), and returns the bearing to your friend (in screen pixels from the left)
    let angle = width / 2
    if (sensor) {
        const x = sensor[0]; const z = sensor[1]

        let d = Math.atan2(z, x) + Math.PI / 2
        let a = angleBetween(thisPos, otherPos)

        // makes sure the value does't wrap while on screen
        if (a > 0 && d < a - Math.PI) { d += 2 * Math.PI } else if (a < 0 && d > Math.PI + a) { d -= 2 * Math.PI }
        angle = ((d - a) * 2.5 / Math.PI + (1 / 2)) * width
    }
    return angle
}

function ARScreen ({ navigation }) {
    const [hasPermission, setHasPermission] = useState('granted')
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [location, setLocation] = useState([0, 0])
    const [subscription, setSubscription] = useState(null)
    const [magnetometer, setMagnetometer] = useState([0, 0])

    useEffect(() => {
        // get users positions
        async function _getPositionAsync () {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
                setLocation([location.coords.latitude, location.coords.longitude])
                console.log('location', location)
            }
        }
        // init friend positions
        async function _setKeys () {
            readFriends().then(x => { _getFriends(x) })
        }
        async function _getFriends (i) {
            pos = []
            console.log('keys', i)
            for (const k of i) {
                readLocation(k).then(x => {
                    const friend = x
                    if (friend) { pos.push(friend) }
                }).catch(e => console.log('error caught', e))
            }
        }
        //set up the camera background
        async function _startCamera () {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        _getPositionAsync()
        _setKeys()
        _startCamera()

        // start updating the magnetometer
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer([data.x, data.z])
            })
        )
        
        // remove listeners
        return () => {
            if (subscription) {
                subscription.remove()
            }
            setSubscription(null)
        }
    }, [])

    const friendsPressHandler = () => {
        // remove listener
        if (subscription) {
            subscription.remove()
        }
        setSubscription(null)
        // change pages
        navigation.navigate('FriendsListScreen')
    }

    const mapsPressHandler = () => {
        // remove listener
        if (subscription) {
            subscription.remove()
        }
        setSubscription(null)
        // change pages
        navigation.navigate('MapScreen')
    }

    // update the friend values
    friends = []
    for (const i in pos) {
        if (typeof magnetometer === 'object' && typeof location === 'object' && typeof pos[i] === 'object') {
            friends.push(<View key={i} style={{ backgroundColor: '#42f572', width: 50, height: 50, borderRadius: 25, position: 'absolute', left: angle(magnetometer, location, pos[i]) - 25, marginTop: 500 }} />)
        } else {
            console.log('error -', pos[i])
        }
    }

    // camera error messages
    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    // render the screen
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.topContainer} />
            <View style={styles.container}>
                <Camera style={styles.camera} type={type}>
                    <View style={styles.touchView} />
                    <View styles={styles.viewBottom} />
                    <LocationComponent />
                    {friends}
                </Camera>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.mapsTouch} onPress={mapsPressHandler}>
                        <Image style={styles.mapsBtn} source={require('../assets/map_icon.png')} />
                        <Text style={styles.imageText}>Friends Nearby</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.mapsTouch} onPress={mapsPressHandler} />
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.settingsTouch} onPress={friendsPressHandler}>
                        <Image style={styles.settingsBtn} source={require('../assets/friends_icon.png')} />
                        <Text style={styles.imageText}>My Friends</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


// styling 
const dim = Dimensions.get('screen').width / 100 // 1% of the screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    background: {
        flex: 1,
        alignItems: 'center'
    },
    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    touchView: {
        width: width,
        height: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: '#DBF1A5'
    },
    settingsTouch: {
        justifyContent: 'center',
        height: dim * 10
    },
    settingsBtn: {
        width: dim * 15,
        height: dim * 15,
        justifyContent: 'center'
    },
    mapsTouch: {
        justifyContent: 'center',
        height: dim * 15
    },
    mapsBtn: {
        height: dim * 15,
        width: dim * 10
    },
    logo: {
        width: 15,
        height: 15,
        backgroundColor: '#111'

    },
    topContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#DBF1A5',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DBF1A5',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 75,
        backgroundColor: '#DBF1A5',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    button: {
        backgroundColor: 'green',
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.25
    },
    imageText: {
        fontSize: 10,
        color: '#000',
        letterSpacing: 0.25,
        justifyContent: 'space-around'
    },
    viewBottom: {
        flex: 1
    },
})

export default ARScreen

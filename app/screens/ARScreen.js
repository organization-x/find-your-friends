import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { Camera } from 'expo-camera'
import LocationComponent from '../components/LocationComponent'
import { readLocation } from '../components/FirebaseComponent'

import { Magnetometer } from 'expo-sensors'
import * as Location from 'expo-location'

const { height, width } = Dimensions.get('window')

const keys = { Tyler: 'iansdnad2ACJY0RRpC2'}

var friends;
var pos = []

function angleBetween(thisPos, otherPos){
    return Math.atan2(otherPos[0] - thisPos[0], otherPos[1] - thisPos[1])
}
 
function angle (sensor, thisPos, otherPos) {
    let angle = width/2;
    if (sensor) {
        let x = sensor[0]; let z = sensor[1];
    
        var d = Math.atan2(z, x)
        var a = angleBetween(thisPos, otherPos)
        
        if(a > 0 && d<a-Math.PI){d+=2*Math.PI}
        else if(a < 0 && d>Math.PI+a){d-=2*Math.PI}
        angle = ((a-d)/Math.PI+(1/2))*width;
    }
    return angle
};

function ARScreen ({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [location, setLocation] = useState([47.773791, -122.206028])
    const [subscription, setSubscription] = useState(null)
    const [magnetometer, setMagnetometer] = useState(0)

    const [friendPositions, setFriendPositions] = useState([[]])

    useEffect(() => {
        for(var k of Object.values(keys)){
            readLocation(k).then(x=>{
                friendPositions.push(x)
            }).catch(e => console.log(e))
        }

        (async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')

            const { status2 } = await Location.requestForegroundPermissionsAsync()
            if (status2 === 'granted') {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                setLocation(location);
            }

            for(var k of Object.values(keys)){
                await readLocation(k).then(x=>{
                    setFriendPositions(x)
                }).catch(e => console.log(e))
                console.log("setting pos")
                pos.push(friendPositions)
            }
        })()

        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer([data.x, data.z]);
            })
        );

        return () => {
        if (subscription) { subscription.remove() }
            setSubscription(null)
        }
    }, [])

    const friendsPressHandler = () => {
        console.log('Friends Button Pressed!')
        navigation.navigate('FriendsListScreen')
    }

    const mapsPressHandler = () => {
        console.log('Maps Button Pressed!')
        navigation.navigate('MapScreen')
    }
    
    friends = []
    for(var i in pos){
        friends.push(<View key={i} style={{backgroundColor: "#42f572", width:50, height:50, borderRadius:25, position: 'absolute', left: Number(angle(magnetometer, location, pos[i]))-25, marginTop: 500}} />)
    }
    

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    //if (magnetometer===0) {
    //    return <Text>Sensor Error</Text>
    //}

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
            <View styles={styles.logo}><Image styles={styles.logo} source={require("../assets/logo.png")}/></View>
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
            <View styles={styles.viewBottom} />
            <LocationComponent />
            {friends}
        </Camera>
        </View>
    )
}

const dim = Dimensions.get('screen').width / 100

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    viewBottom: {
        flex: 1
    },
    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    camera:{
        flex:1,
        backgroundColor:"#fff",
    },
    touchView:{
        width: width,
        height: dim*20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center',
        backgroundColor:"#555"
    },  
    settingsTouch:{ 
        justifyContent:"center",
        height:dim*20,
    },
    mapsTouch:{
        justifyContent:"center"
    },
    settingsBtn: {
        width: dim*15,
        height: dim*15,
    },
    mapsBtn:{
        height: 715/477*dim*10,
        width:dim*10
    },
    logo:{
        width: 15,
        height: 15,
        backgroundColor:"#111",
        
    },
    background: {
        flex: 1,
        alignItems: 'center'
    }
})

export default ARScreen
import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { Camera } from 'expo-camera'
import LocationComponent from '../components/LocationComponent'
import { readLocation, readFriends } from '../components/FirebaseComponent'

import { Magnetometer } from 'expo-sensors'
import * as Location from 'expo-location'

const { height, width } = Dimensions.get('window')

var friends;

var pos = [];

function angleBetween(thisPos, otherPos){
    return Math.atan2(otherPos[0] - thisPos[0], otherPos[1] - thisPos[1])
}
 
function angle (sensor, thisPos, otherPos) {
    let angle = width/2;
    if (sensor) {
        let x = sensor[0]; let z = sensor[1];
    
        var d = Math.atan2(z, x)
        var a = angleBetween(thisPos, otherPos)
        
        if(a > 0 && d < a-Math.PI){d+=2*Math.PI}
        else if(a < 0 && d > Math.PI+a){d-=2*Math.PI}
        angle = ((a-d) / Math.PI + (1/2)) * width;
    }
    return angle
};

function ARScreen ({ navigation }) {
    const [hasPermission, setHasPermission] = useState("granted")
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [location, setLocation] = useState([0,0])
    const [subscription, setSubscription] = useState(null)
    const [magnetometer, setMagnetometer] = useState([0,0])
    const [keys, setKeys] = useState({})
    
    useEffect(() => {
        (async () => {
            readFriends().then( x=>{ setKeys(x); console.log(keys) })

            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')

            const { status2 } = await Location.requestForegroundPermissionsAsync()
            if (status2 === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            }
            console.log(location)
            
            pos = []
            for(var k of Object.values(keys)){
                readLocation(k).then(x=>{
                    let friend = x
                    if (friend){ pos.push(friend) }
                }).catch(e => console.log("error catch", e))
            }
        })()

        /*setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer([data.x, data.z]);
            })
        );*/

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
        if (typeof magnetometer == "object" && typeof location == "object" && typeof pos[i] == "object"){
            friends.push(<View key={i} style={{backgroundColor: "#42f572", width:50, height:50, borderRadius:25, position: 'absolute', left: angle(magnetometer, location, pos[i])-25, marginTop: 500}} />)
        } else {
            console.log("error -", pos[i])
        }
    }

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
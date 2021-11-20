import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, Dimensions, SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { readLocation, readFriends } from '../components/FirebaseComponent'
import * as Location from 'expo-location'

function MapScreen ({ navigation }) {
    const [location, setLocation] = useState(null)
    const [errorMessage, seterrorMessage] = useState(null)
    const [loaded, setLoaded] = useState('false')
    const [keys, setKeys] = useState({})

    const ARScreenPressHandler = () => {
        navigation.navigate('ARScreen')
    }

    function loadMarkers () {
        m = []
        for (const i of Object.keys(keys)) {
        m.push(
            <Marker
                description={i} key={i}
                coordinate={readLocation(keys[i])}
            >
                <View style={styles.marker} />
            </Marker>)
        }
        return m
    }

    useEffect(() => {
        async function _getLocationAsync () {
            const { status } = await Location.requestForegroundPermissionsAsync()

            async function _setKeys () {
                readFriends().then(x => { setKeys(x) })
            }
            _setKeys()

            if (status !== 'granted') {
                seterrorMessage('Permission to access location was denied')
                setLoaded('true')
            } else {
                const userlocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
                setLocation(userlocation)
                seterrorMessage(null)
                setLoaded('true')

                console.log(JSON.stringify(location))
            }
        }

        _getLocationAsync()
    }, [loaded])

    if (loaded == 'true') {
        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.topContainer} />
                <MapView
                style={styles.map}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation
                zoomEnabled
                >
                {loadMarkers()}
                </MapView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={ARScreenPressHandler} style={styles.button}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Waiting for current location...</Text>
            </View>
        )
    }
}

export default MapScreen

const dim = Dimensions.get('screen').width / 100

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    marker: {
        width: 20,
        height: 20,
        backgroundColor: 'purple',
        borderRadius: 25
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
    topContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#DBF1A5',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    background: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    }
})

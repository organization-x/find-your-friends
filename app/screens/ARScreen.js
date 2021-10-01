import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';

function ARScreen(props) {
    return (
        <ImageBackground 
            style = {styles.background}
            source={require('../assets/WOTR-in-autumn.jpg')}>

            <TouchableOpacity onPress = {settingsPressed}> 
                <Image 
                    style = {styles.settingsBtn}

                    source = {require('../assets/gear.png')
                } />
            </TouchableOpacity>  

            <Text styles = {styles.temporaryARText}>AR Screen Goes Here</Text>        
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems:'center'
    },
    settingsBtn:{
        width : 50,
        height: 50,
        alignSelf:'flex-end',
        top: '162.5%',
        right: '-35%'
    },
    //This is really temporary because it is only for the text. Should be removed when actual Camera gets here.
    temporaryARText:{
        position: 'absolute'
    }
})

const settingsPressed = () => console.log("Settings Button was pressed.");

export default ARScreen;
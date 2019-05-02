import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native'
import firebase from 'firebase'
import config from '../../config/config'

export default class Loading extends React.Component {
    
    componentWillMount() {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                        console.log(user)
                        this.props.navigation.navigate(user ? 'MainScreen' : 'signUp')
                    })
        }, 5000);
    }
  

    render() {
        return (
        
        <View style={styles.container}>
        <StatusBar
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "#48dbfb"
            translucent = {false}
            networkActivityIndicatorVisible = {false}
        />
            <View style={{flex:3}}></View> 
            <View style={{flex:2}}></View> 
            <View style={{flex:1}} >
                <Image source = {require('../../assets/splashCozy.png')} style = {{resizeMode: 'contain'}}/>
            </View>
            <View style={{flex:4}}></View> 
            <View style={{flex:1}}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48dbfb'
  }
})
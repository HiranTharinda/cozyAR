import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }   

    render() {
        return (
        
        <View style={styles.container}>
        <StatusBar
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "#48dbfb"
            translucent = {true}
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
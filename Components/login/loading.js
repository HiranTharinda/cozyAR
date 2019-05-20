import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'


export default class Loading extends React.Component {
    
    componentWillMount() {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                        this.props.navigation.navigate(user ? 'MainScreen' : 'login')
                    })
        }, 5000);
    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle = "light-content"
                hidden = {false}
                backgroundColor = "#181f31"
                translucent = {false}
                networkActivityIndicatorVisible = {false}
            />
            <View style={{flex:1}}></View> 
            <View style={{flex:2}}></View> 
            <View style={{width:'100%',flex:1}} >
                <Image source = {require('../../assets/splashCozy.png')} style = {{resizeMode: 'contain', width:'50%', alignSelf:'center'}}/>
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
        backgroundColor: '#181f31'
  }
})
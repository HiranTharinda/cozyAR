import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer, StackNavigator, createStackNavigator} from 'react-navigation';
import firebase from 'react-native-firebase'

import ArStack from './AppTabNavigator/ArStack'
import HomeStack from './AppTabNavigator/HomeStack'
import StoreStack from './AppTabNavigator/StoreStack'
import ProfileStack from './AppTabNavigator/ProfileStack'
import PostStack from './AppTabNavigator/PostStack'
class MainScreen extends Component{

    state = { currentUser: null }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render(){
        return(<View style={{flex:1}}>
                <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                />
                <AppTabNavigator/>
            </View>
            
        )
    }
}


const BottomTabNavigator = createMaterialTopTabNavigator({
    Home:{
        screen: HomeStack
        
    },
    Search:{
        screen: StoreStack
    },
    AR:{
        screen: ArStack
    },
    Post:{
        screen: PostStack
    },
    Profile:{
        screen: ProfileStack
    }


},{     navigationOptions:{
            header: null,
            title: 'C O Z Y',
            headerTitleStyle: {
            fontFamily: 'INTRO',
            fontWeight: 'bold',
            textAlign:"center", 
        },
        },
        headerMode: 'screen',
        tabBarPosition:'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#2fd7e0',
            inactiveTintColor:'#000000',
            showIcon: true,
            style:{elevation:100, backgroundColor: 'white',},
            indicatorStyle:{backgroundColor:'black'}
    }

});

const AppTabNavigator = createAppContainer(BottomTabNavigator)

export default MainScreen

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
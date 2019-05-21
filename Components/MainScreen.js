import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer, StackNavigator, createStackNavigator} from 'react-navigation';
import firebase from 'react-native-firebase'

import ArStack from './AppTabNavigator/ArStack'
import HomeStack from './AppTabNavigator/HomeStack'
import StoreStack from './AppTabNavigator/StoreStack'
import ProfileStack from './AppTabNavigator/ProfileStack'
import Notification from './AppTabNavigator/Notifications'
class MainScreen extends Component{

    state = { currentUser: null }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render(){
        return(<View style={{flex:1}}>
                <StatusBar
                backgroundColor="#181f31"
                barStyle="light-content"
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
    Notification:{
        screen: Notification
    },
    Profile:{
        screen: ProfileStack
    }


},{     navigationOptions:{
            header: null,
         
        },
        headerMode: 'screen',
        tabBarPosition:'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#f8f8f8',
            inactiveTintColor:'#5a6586',
            showIcon: true,
            style:{ backgroundColor: '#181f31',},
            indicatorStyle:{backgroundColor:'#f8f8f8'}
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
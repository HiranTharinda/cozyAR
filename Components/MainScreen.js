import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {Icon, Title} from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer, StackNavigator} from 'react-navigation';
import CamTab from './AppTabNavigator/CamTab'
import HomeTab from './AppTabNavigator/HomeTab'
import PostTab from './AppTabNavigator/PostTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import firebase from 'react-native-firebase'
class MainScreen extends Component{

    state = { currentUser: null }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    static navigationOptions = {
        
        title: 'C O Z Y',
        headerTitleStyle: {
            fontFamily: 'INTRO',
            fontWeight: 'bold',
            textAlign:"center", 
        flex:1  
        },
    };
    

    render(){
        return(
            <AppTabNavigator/>
        )
    }
}


const BottomTabNavigator = createMaterialTopTabNavigator({
    HomeTab:{
        screen: HomeTab
    },
    SearchTab:{
        screen: SearchTab
    },
    CamTab:{
        screen: CamTab
    },
    PostTab:{
        screen: PostTab
    },
    ProfileTab:{
        screen: ProfileTab
    }
    
},{     
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
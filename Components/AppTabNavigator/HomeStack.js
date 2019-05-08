import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Comments from '../Posts/Comments'
import UserProfile from '../Home/UserProfile'
import HomeTab from '../Home/HomeTab'

class HomeStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-home" style={{color:
            tintColor}}/>
        ) 
    }
    render() {
        return (
            <AppContainer/>
        );
    }
}

const home = createStackNavigator({
    Feed: {
        screen:HomeTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'C O Z Y'
            }
        }
    },
    UserView: {
        screen:UserProfile,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Profile Overview'
            }
        }
    },
    Comments: {
        screen:Comments,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Comments'
            }
        }
    },
})

const AppContainer = createAppContainer(home);

export default HomeStack
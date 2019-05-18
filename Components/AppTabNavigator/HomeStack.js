import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Comments from '../Posts/Comments'
import UserProfile from '../Home/UserProfile'
import HomeTab from '../Home/HomeTab'
import PostTab from '../Posts/PostTab'

class HomeStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon type='Foundation' name = "home" style={{color:
            tintColor, fontSize:27}}/>
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
                headerTitle:'C O Z Y',
                headerTitleStyle: {
                    color:'#ffff',
                    fontWeight: 'bold',
                },
            
                headerStyle: {
                    backgroundColor: '#181f31',
                }
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
    PickImage: {
        screen:PostTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Select a photo',
                
            
                
            }
        }
    },
    
})

const AppContainer = createAppContainer(home);

export default HomeStack
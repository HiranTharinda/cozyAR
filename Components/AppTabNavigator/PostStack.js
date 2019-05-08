import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer, createStackNavigator} from 'react-navigation';

import SendTab from '../Posts/SendTab'
import PostTab from '../Posts/PostTab'

class PostStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-add" style={{color:
            tintColor}}/>
        ) 
    }

    render() {
        return (
            <AppContainer/>
        );
    }
}

const Post = createStackNavigator({
    PickImage: {
        screen:PostTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Select a photo'
            }
        }
    },
    Send: {
        screen:SendTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Share'
            }
        }
    }
})

const AppContainer = createAppContainer(Post);

export default PostStack
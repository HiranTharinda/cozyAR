import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer, createStackNavigator} from 'react-navigation';

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
})

const AppContainer = createAppContainer(Post);

export default PostStack
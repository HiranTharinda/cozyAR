import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon} from 'native-base'
import {createAppContainer, createStackNavigator} from 'react-navigation';
import ProfileSettings from '../Profile/ProfileSettings'
import ProfileTab from '../Profile/ProfileTab'
import PostView from '../Profile/PostView'
class ProfileStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-person" style={{color:
            tintColor}}/>
        ) 
    }

    render() {
        return (
            <AppContainer/>
        );
    }
}

const Profile = createStackNavigator({
    pickImage: {
        screen:ProfileTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Your Profile',
                headerRight: (<View style ={{paddingRight:20}}>
                                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                                    <Icon  name="ios-settings" 
                                            style={{color: 'black'}}/>
                                </TouchableOpacity>
                            </View>)
            }
        }
    },
    settings: {
        screen:ProfileSettings,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Profile Settings'
                
            }
        }
    },
    PostView: {
        screen:PostView,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'View Post'
                
            }
        }
    }

})

const AppContainer = createAppContainer(Profile);

export default ProfileStack
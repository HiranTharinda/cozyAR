import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer, StackNavigator, createStackNavigator} from 'react-navigation';
import firebase from 'react-native-firebase'

import CamTab from './AppTabNavigator/CamTab'
import HomeTab from './AppTabNavigator/HomeTab'
import PostTab from './AppTabNavigator/PostTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import UserProfile from './Home/UserProfile'
import SendTab from './Posts/SendTab'
import Comments from './Posts/Comments'
import ProfileSettings from './Profile/ProfileSettings'

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


HomeTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name = "md-home" style={{color:
        tintColor}}/>
    ) 
}

SearchTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name = "md-search" style={{color:
        tintColor}}/>
    ) 
}

CamTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name = "md-aperture"  style={{color:
        tintColor}}/>
    ) 
}

PostTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name = "md-add" style={{color:
        tintColor}}/>
    ) 
}

ProfileTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name = "md-person" style={{color:
        tintColor}}/>
    ) 
}

const Home = createStackNavigator({
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
    }

})

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
    }

})


const BottomTabNavigator = createMaterialTopTabNavigator({
    HomeTab:{
        screen: Home
        
    },
    SearchTab:{
        screen: SearchTab
    },
    CamTab:{
        screen: CamTab
    },
    PostTab:{
        screen: Post
    },
    ProfileTab:{
        screen: Profile
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
            showLabel: true,
            activeTintColor: '#2fd7e0',
            inactiveTintColor:'#000000',
            showIcon: true,
            style:{elevation:100, backgroundColor: 'white',},
            indicatorStyle:{backgroundColor:'black'}

    }

});
const wrapperStackNaviagtor = createStackNavigator({
    BottomTabNavigator: BottomTabNavigator
})

const AppTabNavigator = createAppContainer(wrapperStackNaviagtor)

export default MainScreen

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
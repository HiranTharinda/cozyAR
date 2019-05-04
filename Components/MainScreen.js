import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar} from "react-native";
import {Icon, Title} from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer, StackNavigator, createStackNavigator} from 'react-navigation';
import CamTab from './AppTabNavigator/CamTab'
import HomeTab from './AppTabNavigator/HomeTab'
import PostTab from './AppTabNavigator/PostTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import firebase from 'react-native-firebase'
import userProfile from './userProfile'
import SendTab from './SendTab'
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

const home = createStackNavigator({
    feed: {
        screen:HomeTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'C O Z Y'
              
            }
        }
    },
    userView: {
        screen:userProfile,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Profile Overview'
              
            }
        }
    }

})

const post = createStackNavigator({
    feed: {
        screen:PostTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Select a photo'
              
            }
        }
    },
    send: {
        screen:SendTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Post'
              
            }
        }
    }

})


const BottomTabNavigator = createMaterialTopTabNavigator({
    HomeTab:{
        screen: home
    },
    SearchTab:{
        screen: SearchTab
    },
    CamTab:{
        screen: CamTab
    },
    PostTab:{
        screen: post,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Products'
            }
        }
      
    },
    ProfileTab:{
        screen: ProfileTab
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
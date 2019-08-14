import React, { Component } from "react";
import { View,TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer,createStackNavigator} from 'react-navigation';
import StartScreen from '../Ar/StartScreen'
import CamTab from "../Ar/CamTab";
import LoadingAR from "../Ar/LoadingAR";
class ArStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon  type='Entypo' name = "camera" style={{
            color: tintColor, fontSize:24}}/>
        ) 
    }

    render() {
        return (
            <AppContainer/>
        );
    }
}

const Store = createStackNavigator({
    StartScreen: {
        screen:StartScreen,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Selected Items'
                
            }
        }
    },
    ArScreen: {
        screen:CamTab,
        navigationOptions:({navigation}) => {
            return{
                
            }
        }
    },
    LoadingAR: {
        screen:LoadingAR,
        navigationOptions:({navigation}) => {
            return{
                
            }
        }
    },
    
    
})

const AppContainer = createAppContainer(Store);

export default ArStack
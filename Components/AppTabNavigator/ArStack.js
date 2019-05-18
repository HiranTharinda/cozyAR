import React, { Component } from "react";
import { View,TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer,createStackNavigator} from 'react-navigation';
import StartScreen from '../Ar/StartScreen'
import CamTab from "../Ar/CamTab";

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
                headerTitle:'Selected Products'
                
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
    
    
})

const AppContainer = createAppContainer(Store);

export default ArStack
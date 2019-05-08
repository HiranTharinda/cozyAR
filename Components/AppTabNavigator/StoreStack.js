import React, { Component } from "react";
import { View,TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer,createStackNavigator} from 'react-navigation';
import ItemProfile from '../Products/Products'
import SearchTab from '../Products/SearchTab'
import SearchScreen from '../Products/SearchScreen'


class StoreStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-search" style={{color:
            tintColor}}/>
        ) 
    }

    render() {
        return (
            <AppContainer/>
        );
    }
}

const Store = createStackNavigator({
    Store: {
        screen:SearchTab,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Store',
                headerRight: (<View style ={{paddingRight:20}}>
                                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                                    <Icon  name="ios-search" 
                                            style={{color: 'black'}}/>
                                </TouchableOpacity>
                            </View>)
            }
        }
    },
    ItemProfile: {
        screen:ItemProfile,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Product Details'
                
            }
        }
    },
    SearchScreen: {
        screen:SearchScreen,
        navigationOptions:({navigation}) => {
            return{
                header: null
            }
        }
    }
})

const AppContainer = createAppContainer(Store);

export default StoreStack
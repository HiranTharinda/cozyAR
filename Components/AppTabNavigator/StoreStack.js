import React, { Component } from "react";
import { View,TouchableOpacity} from "react-native";
import {Icon, Title} from 'native-base'
import {createAppContainer,createStackNavigator} from 'react-navigation';
import ItemProfile from '../Products/ItemProfile'
import SearchTab from '../Products/SearchTab'
import SearchScreen from '../Products/SearchScreen'
import Reviews from '../Products/Reviews'
import CategoryRender from '../Products/CategoryRender'

class StoreStack extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon type='FontAwesome5' name = "shopping-bag" style={{color:
            tintColor,fontSize:23}}/>
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
    },
    ReviewScreen: {
        screen:Reviews,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Reviews'
            }
        }
    },
    Category: {
        screen:CategoryRender,
        navigationOptions:({navigation}) => {
            return{
                headerTitle:'Products'
            }
        }
    },
})

const AppContainer = createAppContainer(Store);

export default StoreStack
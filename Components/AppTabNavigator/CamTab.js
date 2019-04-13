import React, { Component } from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View, Text, StyleSheet } from "react-native";
import {Icon} from 'native-base'
import App from '../../js/app';
var reducers = require('../../js/redux/reducers');

let store = createStore(reducers);

class CamTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "ios-aperture" style={{color:
            tintColor}}/>
        ) 
    };

    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default CamTab;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});





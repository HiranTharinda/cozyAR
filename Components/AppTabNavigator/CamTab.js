import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Icon} from 'native-base'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from '../../js/app';

var reducers = require('../../js/redux/reducers');

let store = createStore(reducers);

class CamTab extends Component{

    render(){
        return(
                // <View>
                // <Text>Doi</Text>
                // </View>
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





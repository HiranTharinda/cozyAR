import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";


import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from '../../js/app';

var reducers = require('../../js/redux/reducers');
import vid from '../../assets/VID-20190303-WA0029.mp4'
let store = createStore(reducers);

class CamTab extends Component{

    render(){
        return(
          <Provider store={store}>
            <App />
          </Provider>
        );
    }
}


var styles = StyleSheet.create({
  backgroundVideo: {
    width:300,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default CamTab;





/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var reducers = require('./js/redux/reducers');
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import MainScreen from './Components/MainScreen'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {
  AppRegistry
} from 'react-native';

let store = createStore(reducers);

export default class Root extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

const AppStackNavigator = createStackNavigator({

  Main: {
    screen: MainScreen
  }
})

const AppContainer = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent('cozy', () => Root);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

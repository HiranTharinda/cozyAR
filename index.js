import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { YellowBox, StyleSheet, Platform, Image, Text, View } from 'react-native';
import { AppRegistry} from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
var reducers = require('./js/redux/reducers');

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

import MainScreen from './Components/MainScreen'
import loading from './Components/login/loading'
import signUp from './Components/login/signup'
import login from './Components/login/login'

let store = createStore(reducers);

export default class Root extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

const AppStackNavigator = (createSwitchNavigator(
  {
    loading,
    signUp,
    login,
    MainScreen,
  },
  {
    initialRouteName: 'loading'
  }
));

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

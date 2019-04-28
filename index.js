

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var reducers = require('./js/redux/reducers');
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import MainScreen from './Components/MainScreen'
import { YellowBox, StyleSheet, Platform, Image, Text, View } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { AppRegistry} from 'react-native';

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

const AppStackNavigator = createAppContainer(createSwitchNavigator(
  {
  loading,
  signUp,
  login,
  MainScreen
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

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import firebase from 'firebase'
import { SocialIcon } from 'react-native-elements'
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager} from 'react-native-fbsdk'
import config from '../../config/config'
var options 
import {Expo} from 'expo'


export default class Login extends React.Component {


  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('MainScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleLogin')
  }

  async loginWithFacebook () {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1484093631730528',
      {permissions: ['public_profile']}
    );console.log('handldseLogin');
      if(type === 'success'){
        const credentials = firebase.auth().FacebookAuthProvider.credential(token);
        firebase.auth.signInWithCredential(credentials).catch((error) => {
          console.log('error', error);
        })
      }
  }
  
  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 1, width: 300}}></View>
        <View style = {{flex: 4, width: 190}}> 
          <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>HEY! WELCOME BACK.</Text>
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}/>
          <TextInput
            ecureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}/>
          <Button color = '#54a0ff' title="Login" onPress={this.handleLogin} />
          <Text style={{fontWeight:"900",textAlign: 'center'}}></Text>
          <Text style={{fontWeight:"900",textAlign: 'center'}}>or</Text>
          <View style={{flexDirection:"row", width:100, alignContent:"center",alignItems:"center", paddingHorizontal:27}}>
            <SocialIcon
              style = {{width:53}}
              button
              onPress ={this.loginWithFacebook}
              type='facebook'
              raised = 'true'/>
            <SocialIcon
              button
              raised = 'true'
              style = {{width:53, backgroundColor:"#ff6b6b"}}
              type='google'/>
          </View>
        </View>
        <View style = {{flex: 1}}> 
          <Text>Don't have an account?</Text>
          <Button color="#ff6b6b"
                  title="Sign Up"
                  onPress={() => this.props.navigation.navigate('signUp')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0,
    marginTop: 8
  },

})

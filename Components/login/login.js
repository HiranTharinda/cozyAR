import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import { SocialIcon } from 'react-native-elements'
import FBSDK, { AccessToken, LoginManager}  from 'react-native-fbsdk'

var options 
var config = {
  apiKey: 'AIzaSyDYmkq3R7SpWBYiUEKCU8N2SSG-6ojzuc0',
  authDomain: ' cozy-67b69.firebaseio.com/',
  databaseURL: 'https://cozy-67b69.firebaseio.com/'
}
const firebaseRef = firebase.initializeApp(config)

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

  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result){
      if (result.isCancelled){
        console.log('login was cancelled');
      }else {
        AccessToken.getCurrentAccessToken().then((AccessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(AccessTokenData.accessToken)
          firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) =>{
              //promise success
          },(error) =>{
            //promise rejected
            console.log(error)
          })
        },(error => {
          console.log('some error'+ error)
        }))
        
      }
    }, function(error){
      console.log('An error occurred' + error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                />
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
              onPress ={() => this.onLoginOrRegister()}
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

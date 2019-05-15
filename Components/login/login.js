import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar,  KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'
import { SocialIcon, Button } from 'react-native-elements'
import FBSDK, { AccessToken, LoginManager}  from 'react-native-fbsdk'

var options 


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
        <View style = {{flex: 4, width: 190, alignContent:'center', alignItems:'center'}}> 
          <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>HEY! WELCOME BACK.</Text>
          <SocialIcon
              style = {{width:180, height:40}}
              button
              onPress ={() => this.onLoginOrRegister()}
              type='facebook'
              raised = 'true'/>
          <Text></Text>
          <Text style={{fontWeight:"900",textAlign: 'center'}}>or</Text>   
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
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}/>
          <Text> </Text>
          <Button  title="Login" onPress={this.handleLogin} buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#54a0ff'}} />
          <Text></Text>
          <Text style={{fontWeight:"normal",textAlign: 'center'}}>Don't have an account?</Text>   
          <Text></Text>
          <Button 
                  title="Sign Up"
                  onPress={() => this.props.navigation.navigate('signUp')}
                  buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}  
                  />
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

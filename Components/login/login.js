import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar,  KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'
import {Icon, Card, CardItem, } from 'native-base'
import { Button } from 'react-native-elements'
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
        <View style = {{flex: 1, width: 300,}}></View>
        <View style = {{flex: 6, width: 190, alignContent:'center', alignItems:'center'}}>
        <Card style ={{borderRadius: 40,width:270, height:'80%'}}>
          <CardItem style ={{width:270, height:'90%',borderRadius: 40}}>
            <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}>  
              <Text></Text>
              <Text></Text>
              <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>HEY! WELCOME BACK.</Text>
              <Text></Text>
              <Text> </Text>
              <Button icon={
                      <Icon
                          name="facebook"
                          size={15}
                          style ={{color:"#ffffff"}}
                          type ='Entypo'
                      />}
                  title="Login"
                  onPress ={() => this.onLoginOrRegister()}
                  raised = 'true'
                  buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#4267b2'}}  
                  />
              <Text></Text>
              <Text style={{fontWeight:"900",textAlign: 'center'}}>or</Text>   
              {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
              </Text>}
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="   Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}/>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="   Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}/>
              <Text> </Text>
              <Button  title="Login" onPress={this.handleLogin} buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#54a0ff'}} />
              <Text></Text>
              <Text style={{fontWeight:"normal",textAlign: 'center'}}>Don't have an account?</Text>   
              <Text></Text>
              <Button 
                  title="Sign Up"
                  titleStyle={{ color: 'grey' }}
                  onPress={() => this.props.navigation.navigate('signUp')}
                  buttonStyle={{height: 40, width: 80,color:'grey', borderRadius: 30, backgroundColor:'white', borderColor:'grey',borderWidth:1}}  
                  />
              <Text></Text>
              </View>
            </CardItem>
          </Card>
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
    width: 180,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 8
  },

})

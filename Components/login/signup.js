import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import FBSDK, { AccessToken, LoginManager}  from 'react-native-fbsdk'
import { SocialIcon, Button } from 'react-native-elements'

export default class SignUp extends React.Component {

  state = { name:'', email: '', password: '', errorMessage: null }

handleSignUp = () => {
  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.createUserNormal())
      .then(() => this.props.navigation.navigate('MainScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  
  console.log('handleSignUp')
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
            firebase.auth().onAuthStateChanged(user => {
              console.log(user)
              var userId = firebase.auth().currentUser.uid
              var userObj = {
                avatar: user.photoURL,
                email: user.email,
                name: user.displayName,
              }
              firebase.database().ref('/users/'+userId).set(userObj)
          })
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
        <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}> 
          <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>CREATE A NEW ACCOUNT.</Text>
          <SocialIcon
              style = {{width:180, height:40}}
              button
              onPress ={() => this.onLoginOrRegister()}
              type='facebook'
              raised = 'true'/>
          <Text></Text>
          <Text style={{fontWeight:"normal",textAlign: 'center'}}>or</Text>
          <TextInput
            placeholder="Name"
            autoCapitalize="none"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            style={styles.textInput}/>
            {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}/>
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}/>
          <Text> </Text>
          <Button title="Sign Up" onPress={this.handleSignUp} buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}} />
          <Text></Text>
          <Text style={{fontWeight:"normal",textAlign: 'center'}}>Already have an account?</Text>
          <Text></Text>
          <Button 
                  title="Login"
                  onPress={() => this.props.navigation.navigate('login')}
                  buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#54a0ff'}}  
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
    backgroundColor: '#FFFFFF'
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0,
    marginTop: 8
  },
})
import React from 'react'
import {Alert, StyleSheet, Text, TextInput, View, Image, StatusBar } from 'react-native'
import {Icon, Card, CardItem, } from 'native-base'
import FBSDK, { AccessToken, LoginManager}  from 'react-native-fbsdk'
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {

  state = { name:'', email: '', password: '', cpassword: '', errorMessage: null }

handleSignUp = () => {
  if(this.state.password == this.state.cpassword){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() =>this.createUserNormal())
      .then(() => this.props.navigation.navigate('MainScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
      firebase.auth().onAuthStateChanged(user => { 
      var userId = user.uid
      var userObj = {
              avatar: "https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/dummy%2Fdummy.jpg?alt=media&token=d1959d9b-437e-491c-ad9f-8016a7827dbc",
              email: user.email,
              name: this.state.name,
            }
      firebase.database().ref('/users/'+userId).set(userObj)
          })
  }else{
    Alert.alert("Passwords do not match")
  }
  
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
        <View style = {{flex: 6, width: 230, alignContent:'center', alignItems:'center'}}> 
        <Card style ={{borderRadius: 40,width:270, height:'80%'}}>
          <CardItem style ={{width:270, height:'100%',borderRadius: 40}}>
        <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}> 
        <Text></Text>
        <Text></Text>
          <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>CREATE A NEW ACCOUNT.</Text>
          <Text></Text>
          <Text> </Text>
          <Button icon={
                      <Icon
                          name="facebook"
                          size={15}
                          style ={{color:"#ffffff"}}
                          type ='Entypo'
                      />}
                  title="Signup"
                  onPress ={() => this.onLoginOrRegister()}
                  raised = 'true'
                  buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#4267b2'}}  
                  />
          <Text></Text>
          <Text style={{fontWeight:"normal",textAlign: 'center'}}>or</Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="   Name"
            autoCapitalize="none"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            style={styles.textInput}/>
            {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="   Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}/>
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry
            placeholder="   Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}/>
            <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry
            placeholder="   Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={cpassword => this.setState({ cpassword })}
            value={this.state.cpassword}/>
          <Text> </Text>
          <Button title="Sign Up" onPress={this.handleSignUp} buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}} />
          <Text></Text>
          <Text style={{fontWeight:"normal",textAlign: 'center'}}>Already have an account?</Text>
          <Text></Text>
          <Button 
                  title="Login"
                  titleStyle={{ color: 'grey' }}
                  onPress={() => this.props.navigation.navigate('login')}
                  buttonStyle={{height: 40, width: 80,color:'grey', borderRadius: 30, backgroundColor:'white', borderColor:'grey',borderWidth:1}}  
                  />
                  <Text> </Text>
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
    backgroundColor: '#FFFFFF'
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
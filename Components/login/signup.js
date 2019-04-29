import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,Image } from 'react-native'
import firebase from 'react-native-firebase'
import { SocialIcon } from 'react-native-elements'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

handleSignUp = () => {
  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('MainScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}
render() {
    return (
      <View style={styles.container}>
      <View style = {{flex: 1, width: 300}}></View>
      <View style = {{flex: 4, width: 190}}> 
        <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>CREATE A NEW ACCOUNT.</Text>
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
        />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        
        <Button color="#ff6b6b" title="Sign Up" onPress={this.handleSignUp} />
        <Text style={{fontWeight:"900",textAlign: 'center'}}></Text>
        <Text style={{fontWeight:"900",textAlign: 'center'}}>or</Text>
        <SocialIcon
              title='Sign Up With Facebook'
              button
              type='facebook'
              raised
        /></View>
        <View style = {{flex: 1}}>
        <Text>Already have an account?</Text>
        <Button color = '#54a0ff'
          title="Login"
          onPress={() => this.props.navigation.navigate('login')}
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
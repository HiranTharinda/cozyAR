import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { SocialIcon } from 'react-native-elements'

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
  render() {
    return (
      <View style={styles.container}>
      
      <View style = {{flex: 1, width: 300}}>
      </View>
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
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        
        <Button color = '#54a0ff' title="Login"  onPress={this.handleLogin} />
        <Text style={{fontWeight:"900",textAlign: 'center'}}></Text>
        <Text style={{fontWeight:"900",textAlign: 'center'}}>or</Text>
        <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
              raised
        />
        </View>

        <View style = {{flex: 1}}> 
        <Text>Don't have an account?</Text>
        <Button color="#ff6b6b"
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('signUp')}
        /></View>
        
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
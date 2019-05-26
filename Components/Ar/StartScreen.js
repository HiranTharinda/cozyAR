import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar,  KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'
import {Icon, Card, CardItem, } from 'native-base'
import { Button } from 'react-native-elements'



class StartScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
            <View style = {{flex: 2, width: 300}}></View>
            <View style = {{flex: 4, width: 190, alignContent:'center', alignItems:'center'}}>
              <Card style ={{borderRadius: 40,width:240, height:'70%'}}>
                <CardItem style ={{borderRadius: 40,width:240, height:'90%'}}>
                  <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}>  
                    <Text></Text>
                    <Text style={{fontWeight:"900", fontSize:37,textAlign: 'center'}}>EXPERIENCE AUGMENTED REALITY!</Text>
                    <Text></Text>
                    <Button icon={
                      <Icon
                        name="video-camera"
                        size={15}
                        style ={{color:"#ffffff"}}
                        type ='Entypo'
                      />}
                      title="Now!"
                      onPress={() => this.props.navigation.navigate('ArScreen')}
                      raised = 'true'
                      buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}  
                      />
                    <Text></Text>
                    <Text></Text>
                  </View>
                </CardItem>
              </Card>
            </View>
          <View style = {{flex: 1, width: 300}}></View>
        </View>
      )
    }
}

export default StartScreen


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ffffff'
    }
});
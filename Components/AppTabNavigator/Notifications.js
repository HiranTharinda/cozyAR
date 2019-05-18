import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, StatusBar,  KeyboardAvoidingView } from 'react-native'

import {Icon, Card, CardItem, } from 'native-base'
import { Button } from 'react-native-elements'



class Notifications extends React.Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon type='Foundation' name = "heart" style={{color:
            tintColor, fontSize:27}}/>
        ) 
    }

    render(){
        return(
            <View style = {{flex: 5, width: 120, alignContent:'center', alignItems:'center', position:'absolute', paddingBottom:60}}> 
<Text style={{fontWeight:"900", fontSize:35,textAlign: 'center', fontFamily:'Pacifico'}}>NOTIFICATIONS UNDER CONSTRUCTION</Text>
<Text style={{fontWeight:"900", fontSize:11,textAlign: 'center', fontFamily:'Pacifico'}}></Text>
<Button 
        title="Photo"
        onPress={() => this.props.navigation.navigate('ArScreen')}
        buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}/>
</View>
        )
    }


}

export default Notifications
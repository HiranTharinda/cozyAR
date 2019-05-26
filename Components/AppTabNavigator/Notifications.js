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
            <View style={styles.container}>
            <View style = {{flex: 2, width: 300}}></View>
            <View style = {{flex: 4, width: 190, alignContent:'center', alignItems:'center'}}>
                <Card style ={{borderRadius: 40,width:240, height:'70%'}}>
                    <CardItem style ={{borderRadius: 40,width:240, height:'90%'}}>
                    <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}>  
                        <Text></Text>
                        <Text style={{fontWeight:"900", fontSize:34,textAlign: 'center'}}>NOTIFICATIONS WILL BE HERE!</Text>
                        <Text></Text>
                        <Button icon={
                        <Icon
                        name="video-camera"
                        size={15}
                        style ={{color:"#ffffff"}}
                        type ='Entypo'
                        />}
                        title="Now!"
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

export default Notifications

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ffffff'
    }
});
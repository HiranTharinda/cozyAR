import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {Icon, Picker} from 'native-base'
import {ImagePicker} from 'react-native-image-picker'
class PostTab extends Component{
  


    render(){
        return(
            <View style = {styles.container}>
                <Text>Send it man</Text>
            </View>
        );
    }
}

export default PostTab;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
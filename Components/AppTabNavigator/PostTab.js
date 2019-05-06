import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {Icon, Picker} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';

class PostTab extends Component{
    
    constructor(props){
        super(props)
        this.state={
            imageId: this.uniqueId()
        }
    }

    componentDidMount = () => {
        this.handleChoosePhoto()
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
    }

    navi = () => {
        this.props.navigation.navigate('userProfile')
        //promise rejected
        console.log('ff')
    }

    render(){
        return(
            <View style = {styles.container}>
                <Button title='Pick' raised onPress={() => this.props.navigation.navigate('Send')}></Button>
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
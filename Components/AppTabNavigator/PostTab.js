import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Icon} from 'native-base'
class PostTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "ios-add" style={{color:
            tintColor}}/>
        ) 
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text>PostTab</Text>
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
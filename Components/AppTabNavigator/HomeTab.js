import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Icon, Container, Content} from 'native-base'
import CardComponent from '../CardComponent'
class HomeTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "ios-home" style={{color:
            tintColor}}/>
        ) 
    }

    render(){
        return(
            <Container style={StyleSheet.container}>
                <Content>
                    <CardComponent imageSource="1" likes="101"/>
                    <CardComponent imageSource="2" likes="103"/>
                    <CardComponent imageSource="3" likes="104"/>
                </Content>
            </Container>
        );
    }
}

export default HomeTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
});
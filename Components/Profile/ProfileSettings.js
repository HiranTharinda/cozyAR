import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import firebase from 'react-native-firebase'

class ProfileSettings extends Component{

    render(){
        return(
 
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content>
                <View style ={{paddingTop: 100, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                             
                                   
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 30, paddingTop: 15}}>
                           
                                <View style ={{flex:2, paddingHorizontal:10,alignItems: 'center'}}>
                                    <Text style = {{ fontWeight: 'bold', fontSize:30}}> Hiran Tharinda </Text>
                                    <Text> Freelancer | Student </Text>
                                    <Button transparent >
                                    <Icon name="ios-send" onPress={() => firebase.auth().signOut()}
                                    style={{color: 'black'}}/>
                                    </Button>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card>
                            <CardItem>
                                
                            </CardItem>
                        </Card>
                       
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ProfileSettings;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
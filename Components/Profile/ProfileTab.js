import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import firebase from 'react-native-firebase'

class ProfileTab extends Component{
    state = {name:''}
    
    constructor(props){
        super(props)
    }

    fetchProfileData = (userId) => {
        var that = this;
        firebase.database().ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    name: data.name,
                    avatar: data.avatar
            })
            console.log(data)
        })
    }

    componentDidMount = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                that.fetchProfileData(user.uid)
            }
        })
    }

    render(){
        return(
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content> 
                    <View style ={{paddingTop: 5, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center',paddingTop: 95}}>
                                <Image source = {{uri:this.state.avatar}}
                                    style={{ width:110, height:110, borderRadius: 55,}}/>
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 30, paddingTop: 15}}>
                                <View style ={{flex:2, paddingHorizontal:10,alignItems: 'center'}}>
                                    <Text style = {{ fontWeight: 'bold', fontSize:30}}>{this.state.name}</Text>
                                    <Text></Text>
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

export default ProfileTab;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
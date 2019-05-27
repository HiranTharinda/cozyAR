import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import PhotoGrid from './PhotoGrid/PhotoGrid'
import firebase from 'react-native-firebase'
class ProfileTab extends Component{
    state = {name:''}
    
    constructor(props){
        super(props)
    }

    fetchProfileData = () => {
        var that = this;
        userId = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(userId).on('value', function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    name: data.name,
                    avatar: data.avatar,
                    status: data.status
            })
          
        })
    }

    componentDidMount = () => {
        this.fetchProfileData()
    }

    render(){
        return(
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content> 
                    <View style ={{flex:2, height:'25%',paddingTop: 0, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column',height:'100%'}}>
                            <View style = {{flex: 1, alignItems: 'center',paddingTop: 30}}>
                                <Image source = {{uri:this.state.avatar}}
                                    style={{ width:110, height:110, borderRadius: 55,}}/>
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 20, paddingTop: 15}}>
                                <View style ={{flex:2, paddingHorizontal:10,alignItems: 'center'}}>
                                    <Text style = {{ fontWeight: 'bold', fontSize:30}}>{this.state.name}</Text>
                                    <Text style = {{ fontWeight: 'normal', fontSize:20}}>{this.state.status}</Text>
                                    <Text></Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{flex:4,backgroundColor:'#ffffff'}}>
                        <Card style = {{height:'100%'}}>
                            <CardItem>
                            <PhotoGrid isUser={true} userId={firebase.auth().currentUser.uid} navigation={this.props.navigation}/>
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
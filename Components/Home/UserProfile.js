import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import firebase from 'react-native-firebase'
import PhotoGridForPreview from '../Profile/PhotoGrid/PhotoGridForPreview'
class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false
        }
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if(params){
            if(params.userId){
                this.setState({
                    userId: params.userId
                })
                this.fetchUserInfo(params.userId)
            }
        }
    }

    fetchUserInfo = (userId) => {
        var that = this;
        firebase.database().ref('users').child(userId).child('name').on('value',function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({name:data});
        })

        firebase.database().ref('users').child(userId).child('avatar').on('value',function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({avatar:data,loaded:true});
        })
    }

    componentDidMount =() => {
        this.checkParams()
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                {this.state.loaded == false ? (
                    <View><Text>Loading</Text></View>
                ):(
                    <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content>
                <View style ={{paddingTop: 100, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                            <Image source = {{uri:this.state.avatar}}
                                    style={{ width:110, height:110, borderRadius: 55,}}/>
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 30, paddingTop: 15}}>
                                <View style ={{flex:2, paddingHorizontal:10,alignItems: 'center'}}>
                                    <Text style = {{ fontWeight: 'bold', fontSize:30}}> {this.state.name} </Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card>
                            <CardItem>
                                <PhotoGridForPreview isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
                            </CardItem>
                        </Card>
                       
                    </View>
                </Content>
            </Container>
                )}
            </View>
            
        );
    }
}

export default UserProfile;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
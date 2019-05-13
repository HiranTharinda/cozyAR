import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, TextInput } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import firebase from 'react-native-firebase'

class ProfileSettings extends Component{

    state = {name:''}
    
    constructor(props){
        super(props)
      
    }

    fetchProfileData = () => {
        var that = this;
        userId = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    name: data.name,
                    avatar: data.avatar,
                    email:data.email
            })
            console.log(data)
        })
    }

    componentDidMount = () => {
        this.fetchProfileData()
    }

    render(){
        return(
 
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
                                  
                                    <Button transparent >
                                    <Icon name="ios-send" onPress={() => firebase.auth().signOut()}
                                    style={{color: 'black'}}/>
                                    </Button>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card transparent>
                            <CardItem >
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Name</Text>
                            <TextInput
                            underlineColorAndroid="transparent"
                            editable={true}
                            placeholder={this.state.name}
                            onChangeText={(text) => this.setState({name: text})}
                            style = {{width:'90%',fontSize:20,textAlign:'right'}}> 
                            </TextInput>    
                            </CardItem>
                            <CardItem >
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Email</Text>
                            <TextInput
                            underlineColorAndroid="transparent"
                            editable={false}
                            placeholder={this.state.email}
                            style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:45}}> 
                            </TextInput>    
                                </CardItem>
                                <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Password</Text>
                            <TextInput
                            secureTextEntry
                            underlineColorAndroid="transparent"
                            editable={false}
                            placeholder={'dsdsd'}
                            style = {{width:'90%',fontSize:20, textAlign:'right', paddingRight:45}}> 
                            </TextInput>    
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
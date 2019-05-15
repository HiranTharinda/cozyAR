import React, { Component } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView,TouchableOpacity, TextInput, ScrollView} from "react-native";
import {Card, CardItem, Body, Right} from 'native-base'
import {Button,Rating} from 'react-native-elements'
import ShowReviews from './showReviews'
import firebase from 'react-native-firebase'

class ItemProfile extends Component{
    constructor(props){
        super(props)
        this.state ={
            loading:false,
            rating:3
        }
    }
    checkParams = () => {
        var params = this.props.navigation.state.params;
        if(params){
            if(params.itemId){
                this.setState({
                    itemId: params.itemId
                   
                })
                this.fetchItemInfo(params.itemId)
            }
        }
    }

    fetchItemInfo = (itemId) => {
        var that = this;
        firebase.database().ref('products').child(itemId).child('name').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemName:data});
        }).catch(error => console.log(error));

        firebase.database().ref('products').child(itemId).child('price').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemPrice:data});
        }).catch(error => console.log(error));
        
        firebase.database().ref('products').child(itemId).child('image').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemImage:data});
        }).catch(error => console.log(error));
        
        firebase.database().ref('products').child(itemId).child('description').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemDescription:data});
        }).catch(error => console.log(error));
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
                    <Card style = {{height:'100%'}}>
                        <CardItem cardBody style={{height:'30%'}}>
                            <Image source={{uri:this.state.itemImage}} style={
                                {height:650, width:null, flex:1}}/>
                            <Rating imageSize={20}
                                    startingValue={3}
                                    style={{position:'absolute'}}/>
                        </CardItem>
                        <CardItem style={{height:20,paddingTop:20}}>
                                <Text style = {{fontWeight:"bold",fontSize:30}}>
                                    {this.state.itemName}
                                </Text>
                            <Right>
                                <Text style = {{fontWeight:"normal",fontSize:30, color:'#2fd7e0',textAlign:'right'}}>
                                    {this.state.itemPrice}
                                </Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style = {{fontWeight:"normal",fontSize:15, color:'Blue'}}>
                                    {this.state.itemDescription}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{height:'35%',paddingTop:20}}>
                            <ShowReviews itemId={this.state.itemId} navigation={this.props.navigation}/>
                        </CardItem>
                        <CardItem>
                            <Button onPress={() => this.props.navigation.navigate('ReviewScreen',{noInput:false})}
                                    title = "Make a Review"
                                    buttonStyle={{height: 60, width: 180, borderRadius: 35, backgroundColor:'#54a0ff'}}  
                                    />
                            <Text> </Text>
                            <Button onPress={() => this.props.navigation.navigate('signUp')}
                                    title="Place it!"
                                    buttonStyle={{height: 60, width: 180, borderRadius: 35, backgroundColor:'#ff6b6b'}}  
                                    />
                        </CardItem>
                    </Card>
                )}
            </View>
        );
    }
}

export default ItemProfile;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
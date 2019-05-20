
import React, { Component } from "react";
import { Dimensions,View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import {Button,Rating} from 'react-native-elements'
import firebase from 'react-native-firebase'
import Category from "./Categories";

const itemWidth = Dimensions.get('window').width

class CategoryRender extends Component{

    constructor(props){
        super(props);
        this.state = {
            item_list: [],
            ar_que: [],
            refresh: false,
            loading: true,
            liked: false
        }
    }

    componentDidMount = () => {
        this. checkParams()
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        console.log(params)
        this.setState({
            categoryId: params.categoryId
        })
        this.loadFeed(params.categoryId)
    }
    

    pluralCheck = (s) => {
        if (s == 1){
            return ' ago'
        }else {
            return 's ago'
        }
    }

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000)
        var seconds = Math.floor((new Date() - a) / 1000)
        var interval = Math.floor(seconds/31536000)
        if(interval > 1){
            return interval + ' year' +this.pluralCheck(interval)
        }
        interval = Math.floor(seconds / 2592000);
        if(interval > 1){
            return interval + ' month' +this.pluralCheck(interval)
        }
        interval = Math.floor(seconds / 86400);
        if(interval > 1){
            return interval + ' day' +this.pluralCheck(interval)
        }
        interval = Math.floor(seconds / 3600);
        if(interval > 1){
            return interval + ' hour' +this.pluralCheck(interval)
        }
        interval = Math.ceil(seconds / 60);
        if(interval > 1){
            return interval + ' minute' +this.pluralCheck(interval)
        } return Math.floor(seconds) + 'second' +this.pluralCheck(interval)
    }

    addToFlatlist = (item_list, data, item) => {
        var that = this
        var itemObj = data[item];
                        console.log(data)
                        item_list.push({
                            id:item,
                            itemName:itemObj.name,
                            itemPrice: itemObj.price,
                            itemImage:itemObj.image,
                            itemModel:itemObj.model,
                            itemDescription: itemObj.description,
                            itemRating:itemObj.rating
                        });
                        that.setState({
                            refresh: false,
                            loading: false
                        })
                
    }

    loadFeed = (categoryId) => {
        this.setState({
            refresh:true,
            item_list: []
        })
        var that = this;
        console.log(categoryId)
        firebase.database().ref('categories').child(categoryId).child('products').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val();
                var item_list= that.state.item_list;
                console.log(item_list)
                for(var item in data){
                    that.addToFlatlist(item_list, data, item)
                }
        })
    }

    loadNew = () => {
        this. loadFeed()
    }

    
    render(){
        return(
            <FlatList
                refreshing ={this.state.refresh}
                onRefresh = {this.loadNew}
                data ={this.state.item_list}
                keyExtractor={(item, index)=>index.toString}
                numColumns = {2}
                style = {{flex:2,backgroundColor:'#ffffff', height:'75%'}}
                renderItem = {({item, index}) => (
                    <View key ={index} style={{paddingHorizontal:5,paddingTop:10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ItemProfile',{itemId:item.id})}>
                            <Card  style={{width:itemWidth/2-15, borderRadius:30}}>
                                <CardItem style={{height:160}} cardBody>
                                    <Image source={{uri:item.itemImage}} style={ 
                                        {resizeMode:'cover',height:100, width:200,paddingBottom:40, flex:1}}/>
                                    <Text style = {{fontWeight:"bold",fontSize:13,position:'absolute',paddingLeft:10, paddingTop:125}}>
                                        {item.itemName} 
                                    </Text>
                                    <Text style = {{fontWeight:"normal",fontSize:13,position:'absolute',paddingLeft:80, paddingTop:125, textAlign:'right'}}>
                                        {item.itemPrice}
                                    </Text>
                                    <Rating
                                        imageSize={20}
                                        readonly                          
                                        startingValue={item.itemRating}
                                        style={{position:'absolute',paddingLeft:60,paddingRight:10, paddingBottom:125}}
                                    />
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View> 
                )}
            >
            </FlatList>
        )    
    }
}
export default CategoryRender;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    thumbnail:{
        marginHorizontal:5,
        borderColor:"#2fd7e0",
        borderWidth:3,
        borderRadius:10,
        width:80,
        height:60
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#181f31',
        borderRadius: 30,
        elevation: 8
    }
});


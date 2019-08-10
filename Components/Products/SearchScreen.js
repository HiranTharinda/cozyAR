
import React, { Component } from "react";
import { Dimensions,ScrollView, View, Text, StyleSheet, Image, TextInput, ActivityIndicator,FlatList, TouchableOpacity, StatusBar} from "react-native";
import { Button,Rating } from 'react-native-elements'
import {Icon, Content, Container, Header, Left,Card, CardItem, Body, Right, Row, Thumbnail} from 'native-base'
import SearchBar from 'react-native-searchbar';
import firebase from 'react-native-firebase'
const itemWidth = Dimensions.get('window').width
const itemHeight = Dimensions.get('window').height

class SearchScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            item_list: [],
            refresh: false,
            loading: true,
            liked: false
        }
    }


    handleSearch = (text) => {
        console.log("text",text)
        this.setState({ query: text });
        this.loadFeed(text)
        
    }


  


    addToFlatlist = (item_list, data, item) => {

        var that = this
        var itemObj = data[item];
                        item_list.push({
                            id:item,
                            itemName:itemObj.name,
                            itemPrice: itemObj.price,
                            itemImage:itemObj.image,
                            itemModel:itemObj.model,
                            itemDescription: itemObj.description,
                            itemCode:itemObj.code,
                            itemStock:itemObj.stock,
                            itemRating:itemObj.rating
                        });
                        that.setState({
                            refresh: false,
                            loading: false
                        })
    }

    loadFeed = (SearchText) => {
        this.setState({
            refresh:true,
            item_list: []
        })
        var that = this;
    
        firebase.database().ref('products').orderByChild('name').startAt(`%${SearchText}%`).endAt(SearchText+"\uf8ff").once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val();
                var item_list= that.state.item_list;
                for(var item in data){
                    that.addToFlatlist(item_list, data, item)
                }
        })
    }

    loadNew = () => {
 
    }

    render() {
        return (
          
            <View style={styles.container}>
            <SearchBar
                placeholder = "Type Here..."
                handleChangeText = {this.handleSearch}
                showOnLoad
                onBack = {() =>this.props.navigation.navigate('Store')}
                />
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
            
        </View>
        );
    }
}

export default SearchScreen;


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



import React, { Component } from "react";
import { Dimensions,View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import {Button,Rating} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase'

const itemWidth = Dimensions.get('window').width
const itemHeight = Dimensions.get('window').height

class  Category extends Component{

    constructor(props){
        super(props);
        this.state = {
            category_list: [],
            ar_que: [],
            refresh: false,
            loading: true,
        }
    }

    componentDidMount = () => {
        this.loadFeed();
        
    }

    addToFlatlist = (category_list, data, category) => {
        var that = this
        var categoryObj = data[category];
        category_list.push({
                    id:category,
                    catelogName: categoryObj.name,
                    catelogImage: categoryObj.image
            });
            that.setState({
                    refresh: false,
                    loading: false
                    })
    }

    loadFeed = () => {
        this.setState({
            refresh:true,
            category_list: []
        })
        var that = this;
        firebase.database().ref('categories').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val();
                var category_list= that.state.category_list;
                console.log(category_list)
                for(var category in data){
                    that.addToFlatlist(category_list, data, category)
                }
        })
    }

    loadNew = () => {
        this. loadFeed()
    }

    
    render(){
        return(
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal ={true}
                refreshing ={this.state.refresh}
                onRefresh = {this.loadNew}
                data ={this.state.category_list}
                keyExtractor={(item, index)=>index.toString}
                style = {{flex:1,backgroundColor:'#ffffff'}}
                renderItem = {({item, index}) => (
                    <View key ={index} style={{paddingHorizontal:5,paddingTop:10,height:itemHeight/3-10}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Category',{categoryId:item.id})}>
                            <Card  style={{width:itemWidth,height:itemHeight/4, borderRadius:30}}>
                                <CardItem style={{height:195,borderRadius:30}} cardBody>
                                    <Image source={{uri:item.catelogImage}} style={ 
                                        {resizeMode:'contain',height:200, width:200,paddingBottom:40, flex:1}}/>
                                    <Text style = {{fontWeight:"bold",fontSize:13,position:'absolute',paddingLeft:10, paddingTop:225}}>
                                        {item.catelogName} 
                                    </Text>
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

export default withNavigation(Category);

const styles = StyleSheet.create({
    thumbnail:{
        marginHorizontal:5,
        borderColor:"#2fd7e0",
        borderWidth:3,
        borderRadius:10,
        width:80,
        height:60
    }
});
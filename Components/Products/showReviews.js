import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import firebase from 'react-native-firebase'

class ShowReviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            review_list: [],
            refresh: false,
            loading: true,
            liked: false,
            rating:4
        }
    }
    componentDidMount = () => {
        this.checkParams()
        
    }

    checkParams = () => {
        const {noInput,itemId} = this.props
        console.log(itemId)
        this.fetchReview(itemId)
        this.setState({
            noInput:noInput
        })
    }

    addReviewToList = (review_list, data, review) => {
        console.log(review_list, data, review)
        var that = this
        var reviewObj = data [review]
        firebase.database().ref('users').child(reviewObj.author).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
            review_list.push({
                id: review,
                comment:reviewObj.comment,
                posted: that.timeConverter(reviewObj.posted),
                author: data.name,
                avatar: data.avatar,
                authorId: reviewObj.author
            });
            that.setState({
                refresh:false,
                loading:false
            })
        })
    }

    fetchReview = (reviewId) => {
        var that = this
        firebase.database().ref('reviews').child(reviewId).orderByChild('posted').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null)
            if (exists){
                data = snapshot.val()
                var review_list = that.state.review_list
                for( var review in data){
                    that.addReviewToList(review_list,data,review)
                }
            }else{
                that.setState({
                    review_list:[]
                })
            }
        }).catch(error => console.log(error))
    }

    pluralCheck = (s) => {
        if (s == 1){
            return ' ago'
        }else {
            return 's ago'
        }
    }

    reloadReviewList = () => {
        this.setState({
            review_list: []
        })
        this.fetchReview(this.state.itemId)
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
        interval = Math.floor(seconds / 60);
        if(interval > 1){
            return interval + ' minute' +this.pluralCheck(interval)
        } return Math.floor(seconds) + 'second' +this.pluralCheck(interval)
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this.state.review_list.length == 0 ? (
                    <View style={{alignContent:'center', alignItems:'center'}}> 
        </View>
                ):(
                    <FlatList
                        refreshing ={this.state.refresh}
                        onRefresh = {this.reloadReviewList}
                        data ={this.state.review_list}
                        keyExtractor={(item, index)=>index.toString}
                        style = {{flex:1,backgroundColor:'#ffffff'}}
                        renderItem = {({item, index}) => (
                        <View key ={index}>
                            <Card  style = {{borderRadius: 30}}>
                                <CardItem bordered style={{ borderRadius: 30 }}>
                                    <Left>
                                        <Thumbnail source={{uri:item.avatar}} style={{height:35,width:35}}/>
                                        <Body>
                                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('UserView', {userId: item.authorId})}>
                                            <Text style = {{fontWeight:"bold"}}>{item.author}<Text style={{fontWeight:'normal'}}> {item.comment}</Text></Text>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:11}}>{item.posted}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </View>
                        )}
                    >
                    </FlatList>
                )}
            </View>               
        )    
    }
}

export default ShowReviews;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    likedTrue:{
        color: 'red',
        fontSize: 32
    },
    likedFalse: {
        color: 'black',
        fontSize: 32
    },
    lottie: {
        width: 100,
        height: 100,
    },
});


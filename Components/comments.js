import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableHighlight, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import firebase from 'react-native-firebase'




class comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment_list: [],
            refresh: false,
            loading: true,
            liked: false
        }
    }
    componentDidMount = () => {
        this.checkParams()
    

    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if(params){
            if(params.photoId){
                this.setState({
                    photoId: params.photoId
                })
                this.fetchComments(params.photoId)
            }
        }
    }


    addCommentToList = (comment_list, data, comment) => {
        console.log(comment_list, data, comment)
        var that = this
        var commentObj = data [comment]
        firebase.database().ref('users').child(commentObj.author).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()

            comment_list.push({
                id: comment,
                comment:commentObj.comment,
                posted: that.timeConverter(commentObj.posted),
                username: data.username,
                avatar: data.avatar,
                authorId: commentObj.author

            });

            that.setState({
                refresh:false,
                loading:false
            })

            
        })
    }


    fetchComments = (photoId) => {
        var that = this

        firebase.database().ref('comments').child(photoId).orderByChild('posted').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null)
            if (exists){
                data = snapshot.val()
                var comment_list = that.state.comment_list

                for( var comment in data){
                    that.addCommentToList(comment_list,data,comment)
                }

            }else{
                that.setState({
                    comment_list:[]
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
        } return Math.floor(seconds) + 'seconds' +this.pluralCheck(interval)
    }


    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }


    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    }


    



    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-home" style={{color:
            tintColor}}/>
        ) 
    }

    likeButton = () => {
        if (this.state.liked){
            this.setState({
                liked: false
            })
        }else{
            this.setState({
                liked: true
            })
        }
        
    }
    

    render(){
        return(
            <View style={{flex:1}}>
                {this.state.comment_list.length == 0 ? (
                    <View style={{alignContent:'center', alignItems:'center'}}><Text>No Comments Yet!</Text></View>
                ):(
                    <FlatList
            
            refreshing ={this.state.refresh}
            onRefresh = {this.loadNew}
            data ={this.state.comment_list}
            keyExtractor={(item, index)=>index.toString}
            style = {{flex:1,backgroundColor:'#ffffff'}}
            renderItem = {({item, index}) => (
            <View key ={index}>
            <Card>
                <CardItem>
                <Left>
                        <Thumbnail source={{uri:item.avatar}} style={{height:35,width:35, borderColor:"#2fd7e0", borderWidth:1}}/>
                        <Body>
                        
                            <TouchableHighlight onPress = {() => this.props.navigation.navigate('userView', {userId: item.authorId})}>
                                <Text style = {{fontWeight:"bold"}}>{item.username}<Text style={{fontWeight:'normal'}}> {item.comment}</Text></Text>
                            </TouchableHighlight>
                            
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
        
   



export default comments;

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

    }
});


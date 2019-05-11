import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import firebase from 'react-native-firebase'

class Comments extends Component{
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
                author: data.name,
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

    postComment = () => {
        var comment = this.state.comment
        if(comment != ''){
            var imageId = this.state.photoId
            var userId = firebase.auth().currentUser.uid;
            var commentId = this.uniqueId()
            var dateTime = Date.now()
            var timestamp = Math.floor(dateTime /  1000)

            this.setState({
                comment: ''
            })

            var commentObj = {
                posted: timestamp,
                author: userId,
                comment: comment
            }

            firebase.database().ref('/comments/'+imageId+'/'+commentId).set(commentObj)
            //reload the comment
            this.reloadCommentList();
        }else{
            
        }
    }

    reloadCommentList = () => {
        this.setState({
            comment_list: []
        })
        this.fetchComments(this.state.photoId)
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

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
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
                    <View style={{alignContent:'center', alignItems:'center'}}> 
        </View>
                ):(
                    <FlatList
                        refreshing ={this.state.refresh}
                        onRefresh = {this.loadNew}
                        data ={this.state.comment_list}
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
                <KeyboardAvoidingView behavior="padding" enabled stlye={{borderTopWidth:'1', borderTopColor:'grey', padding:10, marginBottom:15}}>
                        <Card>
                            <CardItem>
                            <TextInput
                            underlineColorAndroid="transparent"
                            editable={true}
                            placeholder={'Enter a comment here...'}
                            onChangeText={(text) => this.setState({comment: text})}
                            style = {{width:'90%'}}> 
                            </TextInput>    
                        <Right>
                            <TouchableOpacity>
                                <Icon type="MaterialCommunityIcons" name="comment" onPress={() => this.postComment()}
                                    style={{color: 'black'}}/>
                            </TouchableOpacity>
                        </Right>
                        </CardItem>
                    </Card>
                </KeyboardAvoidingView>   
            </View>               
        )    
    }
}

export default Comments;

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


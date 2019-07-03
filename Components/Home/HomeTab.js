import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import Video from 'react-native-video';
import firebase, { Firebase } from 'react-native-firebase'
import blu from '../../assets/VID-20190303-WA0029.mp4'

class HomeTab extends Component{

    constructor(props){
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
            liked: []
        }
    }

    componentDidMount = () => {
        this.loadFeed();
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
        } return Math.floor(seconds) + ' second' +this.pluralCheck(interval)
    }

    addToFlatlist = (photo_feed, data, photo) => {
        var that = this
        var photoObj = data[photo];
                    firebase.database().ref('users').child(photoObj.author).once('value').then(function(snapshot){
                        const exists = (snapshot.val() !== null)
                        if(exists) data = snapshot.val();
                        
                        photo_feed.push({
                            id: photo,
                            url: photoObj.url,
                            caption: photoObj.caption,
                            posted: that.timeConverter(photoObj.posted),
                            author: data.name,
                            avatar: data.avatar,
                            likes:photoObj.likes,
                            authorId:photoObj.author,
                            flag:photoObj.flag
                            
                        });
                        that.setState({
                            refresh: false,
                            loading: false
                        })
                    })
    }

    loadFeed = () => {
        this.setState({
            refresh:true,
            photo_feed: []
        })
        var that = this;
    
        firebase.database().ref('photos').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            
            if(exists) data = snapshot.val();
                var photo_feed = that.state.photo_feed;
                console.log(data)
                for(var photo in data){
                    that.addToFlatlist(photo_feed, data, photo)
                }
        })
    }

    loadNew = () => {
        this. loadFeed()
    }


    // removeLike = (photoId) => {
    //     var that = this
    //     var userId = firebase.auth().currentUser.uid;
    //     loadRef = firebase.database().ref('photos').child(photoId)
    //     loadRef.on('value', function(snapshot){
    //         const exists = (snapshot.val() !== null)
    //         if(exists) data = snapshot.val();
    //         that.setState({
    //             likes : data.likes
    //         })
    //     })
    //     if(this.state.likes == 0){
    //         var userObj = {
    //             likes: this.state.likes
    //         }
    //     }else{
    //         var sum = this.state.likes - 1
    //         var userObj = {
    //             likes: sum
    //         }
    //     }
    
    //     firebase.database().ref('/photos/'+photoId).update(userObj)
    // }

    // addLike = (photoId) => {
    //     var that = this
    //     var userId = firebase.auth().currentUser.uid;
    //     loadRef = firebase.database().ref('photos').child(photoId)
    //     loadRef.on('value', function(snapshot){
    //         const exists = (snapshot.val() !== null)
    //         that.setState({
    //             likes : data.likes
    //         })
    //     })
    //     var sum = this.state.likes + 1
    //     var userObj = {
    //         likes: sum
    //     }
    //     firebase.database().ref('/photos/'+photoId).update(userObj)
    // }

    // likeChecker = (photoId) => {
    //     console.log(photoId)
    //     var userId = firebase.auth().currentUser.uid;
    //     firebase.database().ref('users').child(userId).child('liked').on('value',function(snapshot){
    //         const exists = (snapshot.val() !== null)
    //         if(exists) data = snapshot.val();
            
            
                
    //     })
        
    // }
    
    likebutton = () => {
        console.log(firebase.auth().currentUser.uid)
        firebase.database().ref('likes').once('value', snapshot => {
                if(snapshot.hasChild(firebase.auth().currentUser.uid)) {
                    console.log('yei')
                } else {
                    console.log('Nope')
                }
        });
    }

    render() {
    return(
    <View style={styles.container}>
        <FlatList
            refreshing ={this.state.refresh}
            onRefresh = {this.loadNew}
            data ={this.state.photo_feed}
            keyExtractor={(item, index)=>index.toString}
            style = {{flex:1,backgroundColor:'#ffffff'}}
            renderItem = {({item, index}) => (
                <View key ={index}>
                    <Card transparent>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri:item.avatar}} style={{height:35,width:35}}/>
                                <Body>
                                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('UserView', {userId: item.authorId})}>
                                        <Text style = {{fontFamily:'Roboto-Bold'}}>
                                            {item.author}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:11}}>{item.posted}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        {item.flag == false ? (
                            <Image source={{uri:item.url}} style={
                                {height:350, width:null, flex:1}}/>
                            ) : (
                            <View style={{flex:1}}>
                                <Video
                                    source={blu}
                                    resizeMode="cover"
                                    repeat={true}
                                />
                            </View> 
                            )}
                            <CardItem style={{height: 45}}>
                                <Left>
                                    <Button transparent onPress = {() => this.likebutton()}>
                                        <Icon type = 'Foundation' name="heart"
                                            style={styles.likedTrue}/>
                                    </Button>
                                    <Button transparent onPress = {()=> this.props.navigation.navigate('Comments',{photoId:item.id})}>
                                        <Icon type = 'MaterialCommunityIcons' name="comment"
                                            style={{color: '#5a6586', fontSize: 30}}/>
                                    </Button>
                                </Left>
                            </CardItem>
                            <CardItem style={{height:20}}>
                                <Text>
                                    {item.likes} likes
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        <Text style = {{fontWeight:"900"}}>{item.author} </Text>
                                        {item.caption}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View> 
                )}
            >
        </FlatList>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PickImage')} style={styles.fab}>
            <Icon type='MaterialIcons' name = "add-box" style={{color:'#f8f8f8'}}/>
        </TouchableOpacity>
    </View>
        )    
    }

}

export default HomeTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    likedTrue:{
        color: '#ff6b6b',
        fontSize: 32
    },
    likedFalse: {
        color: '#5a6586',
        fontSize: 32
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
      },
     
});
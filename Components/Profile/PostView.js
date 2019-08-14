import React, { Component } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Image, FlatList,Dimensions, StatusBar, TouchableOpacity} from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import Video from 'react-native-video';
import firebase from 'react-native-firebase'
import Like from '../Home/Like'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class PostView extends Component{

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
        const {userId, postId} = this.props.navigation.state.params;
        console.log(postId)
       this.getData(postId)
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

    getData(postId){
        var that =  this
        firebase.database().ref('photos').child(postId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val();
            firebase.database().ref('users').child(data.author).once('value').then(function(snapshot){
                const existss = (snapshot.val() !== null)
                if(existss) datas = snapshot.val();
                that.setState({
                    author:datas.name,
                    img:datas.avatar,
                    url: data.url,
                    caption: data.caption,
                    flag: data.flag,
                    posted: that.timeConverter(data.posted),
                    loading: false
                })
        })
        })
    }


    render() {
    return(
    <View style={styles.container}>

    
    {this.state.loading == true ? (
        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center'}}>
        <ActivityIndicator size="large" color="#000" style={{paddingTop:30}} />
        </View>
    ):(
    <Card>
    <CardItem>
                            <Left>
                            <Thumbnail source={{uri:this.state.img}} style={{height:35,width:35}}/>
                                <Body>
                                        <Text style = {{fontFamily:'Roboto-Bold'}}>
                                            {this.state.author}
                                        </Text>
        
                                    <Text style={{fontSize:11}}>{this.state.posted}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <View>
                        {this.state.flag == false  ? (
                            <View style = {{height:400}}>
                            <Image source={{uri:this.state.url}} style={
                                {height:350, width:null, flex:1}}/></View>
                            ) : (
                                <View style = {{height:400}}>
                                <Video
                                    source={{uri:this.state.url}}
                                    resizeMode="cover"
                                    repeat={true}
                                    controls ={false}
                                    style={{
                                        position: 'absolute',
                                        height: 400,
                                        width: screenWidth,
                                        }}
                                /></View>
                            )}
                            </View>
                            <CardItem>
                                <Body>
                                    <Text>
                                        <Text style = {{fontWeight:"900"}}>{this.state.author} </Text>
                                        {this.state.caption}
                                    </Text>
                                </Body>
                            </CardItem>
                            </Card>)}
                        
                   </View>
 
    )

}
}
export default PostView;

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
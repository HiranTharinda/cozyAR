import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import {Icon, Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base'
import firebase from 'react-native-firebase'


class HomeTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
            liked: false
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
        interval = Math.floor(seconds / 60);
        if(interval > 1){
            return interval + ' minute' +this.pluralCheck(interval)
        } return Math.floor(seconds) + 'seconds' +this.pluralCheck(interval)
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
                for(var photos in data){
                    var photoObj = data[photos];
                    firebase.database().ref('users').child(photoObj.author).once('value').then(function(snapshot){
                        const exists = (snapshot.val() !== null)
                        if(exists) data = snapshot.val();
                        photo_feed.push({
                            id: photos,
                            url: photoObj.url,
                            caption: photoObj.caption,
                            posted: that.timeConverter(photoObj.posted),
                            author: data.username,
                            likes: data.likes
                        });
                        that.setState({
                            refresh: false,
                            loading: false
                        })
                    }).catch(error => console.log(error));
                }
        }).catch(error => console.log(error));
    }

    loadNew = () => {  
        this.loadFeed()
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-home" style={{color:
            tintColor}}/>
        ) 
    }

    

    render(){
        return(
            
            
            <FlatList
            refreshing ={this.state.refresh}
            onRefresh = {this.loadNew}
            data ={this.state.photo_feed}
            keyExtractor={(item, index)=>index.toString}
            style = {{flex:1}}
            renderItem = {({item, index}) => (
            <View>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/propic.jpg')} style={{height:35,width:35}}/>
                        <Body>
                            <Text>
                                {item.author}
                            </Text>
                            <Text note>{item.posted}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri:item.url}} style={
                        {height:350, width:null, flex:1}
                    }/>
                </CardItem>
                <CardItem style={{height: 45}}>
                    <Left>
                        <Button transparent>
                            <Icon name="ios-heart"
                            style={{color: 'black'}}/>
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles"
                            style={{color: 'black'}}/>
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send"
                            style={{color: 'black'}}/>
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
                            <Text style = {{fontWeight:"900"}}>Tharinda </Text>
                                {item.caption}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
            </View> 
           )}
            >
            </FlatList>
        
         
        )    
        
    }
}
        
   



export default HomeTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
});
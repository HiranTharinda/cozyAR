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
            loading: true
        }
    }
    
    componentDidMount = () => {
        this.loadFeed();
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
                for(var photo in data){
                    var photoObj = data[photo];
                    firebase.database().ref('photos').child(photoObj.author).once('value').then(function(snapshot){
                        photo_feed.push({
                            id: photo,
                            url: photoObj.url,
                            caption: photoObj.posted,
                            posted: photoObj.posted,
                            author: data.username
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
                                Hiran
                            </Text>
                            <Text note>March 24, 2019</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri:'https://source.unsplash.com/random/1600x900'}} style={
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
                        {100} likes
                    </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style = {{fontWeight:"900"}}>Tharinda </Text>
                                is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type 
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
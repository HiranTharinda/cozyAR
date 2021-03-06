import React, { Component } from "react";
import {ActivityIndicator, Dimensions,View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity} from "react-native";
import firebase from 'react-native-firebase'
import Video from 'react-native-video';
const itemWidth = Dimensions.get('window').width

class PhotoGridForPreview extends Component{
    constructor(props){
        super(props)
        this.state = {
            photo_feed: [],
            refresh:false,
            loading:true
        }

    }

    componentDidMount = () => {
        const {isUser, userId} = this.props
        if(isUser == true){
            this.loadFeed(userId)
        }else{
            this.loadFeed('')
        }
    }

    addToFlatlist = (photo_feed, data, photo) => {
        var that = this
        var photoObj = data[photo];
                    firebase.database().ref('users').child(photoObj.author).on('value',function(snapshot){
                        const exists = (snapshot.val() !== null)
                        if(exists) data = snapshot.val();
                        photo_feed.push({
                            id: photo,
                            url: photoObj.url,
                            
                        });
                        that.setState({
                            refresh: false,
                            loading: false
                        })
                    })
    }

    loadFeed = (userId) => {
        this.setState({
            refresh:true,
            photo_feed: []
        })
        var that = this;
        var loadRef = firebase.database().ref('photos')
        if(userId != ''){
            loadRef = firebase.database().ref('users').child(userId).child('photos')
        }    
        loadRef.orderByChild('posted').on('value', function(snapshot){
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

    viewPhoto = (photoId) => {
        
    }

    render(){
        return(
            <View>
            {this.state.loading == true ? (
                <View>
                <ActivityIndicator size="large" color="#000" />
                </View>
            ):(
                <FlatList
                refreshing ={this.state.refresh}
                onRefresh = {this.loadNew}
                data ={this.state.photo_feed}
                numColumns = {3}
                keyExtractor={(item, index)=>index.toString}
                style = {{flex:1,backgroundColor:'#ffffff'}}
                renderItem = {({item, index}) => (
                    <View key ={index} itemWidth={itemWidth/3} style={{borderWidth:1, borderColor:'#ffffff'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PostView', {postId: item.id})}>
                        {item.flag == false ? (
                            <Image source={{uri:item.url}} style={
                                {height:itemWidth/3-13, width:itemWidth/3-13, flex:1}}/>
                            ) : (
                                <View style = {{height:itemWidth/3-13,width:itemWidth/3-13,flex:1}}>
                                <Video
                                    source={{uri:item.url}}
                                    resizeMode="cover"
                                    repeat={true}
                                    controls ={false}
                                    style={{
                                        position: 'absolute',
                                        height:itemWidth/3-13,
                                        width:itemWidth/3-13
                                        }}
                                /></View>
                            )}
                        </TouchableOpacity>            
                    </View> 
                )}
            >
            </FlatList>
            )}
   
            </View>
        )    
    }
    
}

export default PhotoGridForPreview
import React, { Component } from "react";
import { Dimensions,View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity} from "react-native";
import firebase from 'react-native-firebase'
const itemWidth = Dimensions.get('window').width

class PhotoGrid extends Component{
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
        console.log(isUser)
        console.log(userId)
        if(isUser == true){
            this.loadFeed(userId)
            console.log(isUser)
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

    deletePhoto = (photoId) => {
        console.log(photoId)
        console.log(userId)
        firebase.database().ref('/photos/'+photoId).remove()
        firebase.database().ref('/users/'+userId+'/photos/'+photoId).remove()
        firebase.database().ref('/comments/'+photoId).remove()
        this.setState({
            refresh:true,
            photo_feed: []
        })
        
    }

    render(){
        return(
            <FlatList
                refreshing ={this.state.refresh}
                onRefresh = {this.loadNew}
                data ={this.state.photo_feed}
                numColumns = {3}
                keyExtractor={(item, index)=>index.toString}
                style = {{flex:1,backgroundColor:'#ffffff'}}
                renderItem = {({item, index}) => (
                    <View key ={index} itemWidth={itemWidth/3} style={{borderWidth:1, borderColor:'#ffffff'}}>
                        <TouchableOpacity onPress={() => this.deletePhoto(item.id)}>
                                <Image source={{uri:item.url}} style={
                                    {height:itemWidth/3-13, width:itemWidth/3-13, flex:1}}/>
                        </TouchableOpacity>            
                    </View> 
                )}
            >
            </FlatList>
        )    
    }
    
}

export default PhotoGrid
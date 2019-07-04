import React, { Component } from "react";
import { StyleSheet, Text, View} from "react-native";
import {Icon, Button} from 'native-base'
import firebase from 'react-native-firebase'


class Like extends Component{
    constructor(props){
        super(props)
        this.state = {
            liked:null,
            likes:null,
            newlikes:null
        }

    }

    componentDidMount = () => {
        const {itemId, likes, liked} = this.props
        this.setState({
            liked:this.props.liked,
            likes:this.props.likes,
            newlikes: this.props.likes
        })
        console.log(itemId)
        console.log(likes)
        console.log(liked)
    
    }

    likebutton = (photoId,likes) => {
        console.log(firebase.auth().currentUser.uid)
        firebase.database().ref('likes').child(photoId).once('value', snapshot => {
                if(snapshot.hasChild(firebase.auth().currentUser.uid)) {
                    firebase.database().ref('likes').child(photoId).child(firebase.auth().currentUser.uid).remove();
                    this.setState({
                        liked: false,
                        newlikes:likes-1
                    })

                } else {
                    console.log('Nope')
                    firebase.database().ref('likes').child(photoId).child(firebase.auth().currentUser.uid).set('liked')
                    
                    this.setState({
                        liked: true,
                        newlikes:likes
                    })
                }
        });
    }

    render(){
        return(
            <View style = {{flexDirection:'row'}}>
            <Text style = {{paddingTop:12, paddingRight:8}}>{this.state.newlikes}</Text>
            <Button transparent onPress = {() => this.likebutton(this.props.itemId, this.props.likes)}>
            {this.state.liked == true ? (<Icon type = 'Foundation' name="heart"
            style={styles.likedTrue}/>):(<Icon type = 'Foundation' name="heart"
            style={styles.likedFalse}/>)}
            </Button>
            </View>
        )    
    }
    
}

export default Like

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
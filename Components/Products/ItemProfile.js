import React, { Component } from "react";
import {Alert, View, Text, StyleSheet, Image, KeyboardAvoidingView,TouchableOpacity, TextInput, ScrollView} from "react-native";
import {Card, CardItem, Body, Right} from 'native-base'
import {Button,Rating} from 'react-native-elements'
import ShowReviews from './showReviews'
import firebase from 'react-native-firebase'
import * as LoadingConstants from '../../js/redux/LoadingStateConstants';
class ItemProfile extends Component{
    constructor(props){
        super(props)
        this.state ={ 
            sum: null,
            rating: null,
            loading:false,
            itemId:'',
            arArray:[],
            objId: this.uniqueId(),
            
        }
    }
    checkParams = () => {
        var params = this.props.navigation.state.params;
        if(params){
            if(params.itemId){
                this.setState({
                    itemId: params.itemId
                
                })
                this.fetchItemInfo(params.itemId)
                this.getRating(params.itemId)
            }
        }
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

    fetchItemInfo = (itemId) => {
        var that = this;
        firebase.database().ref('products').child(itemId).child('name').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemName:data});
        })

        firebase.database().ref('products').child(itemId).child('price').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemPrice:data});
        })
        //import obj url
        firebase.database().ref('products').child(itemId).child('image').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemImage:data});
        })
        
        firebase.database().ref('products').child(itemId).child('description').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
                that.setState({itemDescription:data});
        })
    }
  
    ratingCompleted = (rating) => {
        firebase.database().ref('reviewsRating').child(this.state.itemId).child(firebase.auth().currentUser.uid).child('value').set(rating);
        this.averageReview(this.state.itemId)
      }


      averageReview(itemId){
    
        firebase.database().ref('reviewsRating').child(itemId).once('value').then(function(snapshot){
            var ratingsNo = snapshot.numChildren()
            var sum = 0
            if (ratingsNo > 0){
                firebase.database().ref('reviewsRating').child(itemId).once('value').then(function(snapshot){
                    const exists = (snapshot.val() !== null)
                    data = snapshot.val()
                    for(var user in data){
                        var userObj = data[user];
                        sum = sum + userObj.value 
                        console.log(sum)
                    }
               
                    var Average = sum/ratingsNo
                    console.log(Average)
                    firebase.database().ref('products').child(itemId).child('rating').set(Average);
                })
            }
        })
    }

      
    getRating = (itemId) => {
        var that = this;
     
        console.log(itemId)
        firebase.database().ref('reviewsRating').child(itemId).child(firebase.auth().currentUser.uid).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            data = snapshot.val()
            console.log(data)
            that.setState({
                rate: data.value
            })
            
        
        })
    
    }

  

    placeIt = () => {
        var name = this.state.itemName
        var image = this.state.itemImage
        var url = "https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FSofa.obj?alt=media&token=4ca9e40d-8c54-4b53-b610-314de89c13be"
        var userId = firebase.auth().currentUser.uid;
        var Obj = {
            name: name,
            selected: "false",
            loading: "LoadingConstants.NONE",
            icon_img: image,
            obj: url,
            materials: "null",
            animation:'{name:"01", delay:0, loop:true, run:true}',
            scale: "[0.2, 0.2, 0.2]",
            position : "[0, 5*0.05, 10]",
            type : "OBJ",
            physics: "undefined",
            ref_pointer: "undefined",
            shadow_width: "60.5",
            shadow_height: "60.5",
            spotlight_position_y: "100",
            lighting_mode: "IBL",
            resources: "[require('../res/sofa/materials.mtl')]",
        }
        firebase.database().ref('/ArArray/'+userId+'/'+this.state.itemId).set(Obj)
        Alert.alert("Successfully added to the Augmented Reality Experience")
    }

    addToFlatlist = (arArray, data, obj) => {

    }

    componentDidMount =() => {
        this.checkParams()
        
    }

 
    render(){
        return(
            <View style = {{flex: 1}}>
                {this.state.loaded == false ? (
                    <View><Text>Loading</Text></View>
                ):( 
                    <Card style = {{height:'100%'}}>
                    <CardItem cardBody style={{height:'5%'}}>
                    <Rating imageSize={20}
                            type="heart"
                            startingValue={this.state.rate}
                            onFinishRating={this.ratingCompleted}
                            style={{position:'absolute', alignItems:'center',paddingLeft:10}}/>
                    </CardItem>
                        <CardItem cardBody style={{height:'30%'}}>
                            <Image source={{uri:this.state.itemImage}} style={
                                {height:650, width:null, flex:1, resizeMode:'contain'}}/>
                        </CardItem>
                        <CardItem style={{height:20,paddingTop:20}}>
                                <Text style = {{fontWeight:"bold",fontSize:30}}>
                                    {this.state.itemName}
                                </Text>
                            <Right>
                                <Text style = {{fontWeight:"normal",fontSize:30, color:'#ff6b6b',textAlign:'right'}}>
                                    {this.state.itemPrice}
                                </Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style = {{fontWeight:"normal",fontSize:15, color:'Blue'}}>
                                    {this.state.itemDescription}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{height:'35%',paddingTop:20}}>
                            <ShowReviews itemId={this.state.itemId} navigation={this.props.navigation}/>
                        </CardItem>
                        <CardItem>
                            <Button onPress={() => this.props.navigation.navigate('ReviewScreen',{itemId:this.state.itemId})}
                                    title = "Make a Review"
                                    titleStyle={{ color: 'grey' }}
                                    buttonStyle={{height: 60, width: 180,color:'grey', borderRadius: 35,color:'grey', backgroundColor:'white', borderColor:'grey',borderWidth:1}} 
                                    />
                            <Text> </Text>
                            <Button onPress={() => this.placeIt()}
                                    title="Place it!"
                                    buttonStyle={{height: 60, width: 180, borderRadius: 35, backgroundColor:'#ff6b6b'}}  
                                    />
                        </CardItem>
                    </Card>
                )}
            </View>
        );
    }
}


  

export default ItemProfile;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
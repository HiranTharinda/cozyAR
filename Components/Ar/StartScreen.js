import React from 'react'
import {Dimensions, StyleSheet, Text, TextInput, View, Image, StatusBar,  KeyboardAvoidingView,  FlatList, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import {Icon, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import { Button } from 'react-native-elements'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class StartScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        review_list: [],
        refresh: false,
        loading: true,
    }
}
componentDidMount = () => {
  this.fetchReview(firebase.auth().currentUser.uid)
    
}



  addReviewToList = (review_list, data, review) => {
    console.log(review_list, data, review)
    var that = this
    var reviewObj = data [review]
        review_list.push({
            id: review,
            name: reviewObj.name,
            img: reviewObj.icon_img
        });
        that.setState({
            refresh:false,
            loading:false
        })
}

  fetchReview = (userId) => {
    var that = this
    firebase.database().ref('ArArray').child(userId).on('value', function(snapshot) {
        const exists = (snapshot.val() !== null)
        that.setState({
          refresh:true,
          review_list: []
      })
        if (exists){
            data = snapshot.val()
            var review_list = that.state.review_list
            for( var review in data){
                that.addReviewToList(review_list,data,review)
            }
        }else{
            that.setState({
                review_list:[]
            })
        }
    })
}




  deleteReview = (ArId) => {
    userId = firebase.auth().currentUser.uid
    firebase.database().ref('/ArArray/'+userId+'/'+ArId).remove()

}

goToStore(){
  this.props.navigation.goBack
  this.props.navigation.navigate('Search')
}


    render(){
        return(
            <View style={styles.container}>
            <Image source ={require('../../assets/FormatFactory88591.jpg')} style={{width:screenWidth}} resizeMode="contain"></Image>
            
            <View style={{width:screenWidth, position:'absolute', alignContent:'center',alignItems:'center'}}>
            {this.state.review_list.length == 0 ?  (
                <View><Text>Please Add Furniture from the store.</Text></View>
            ):(
              <FlatList
              refreshing ={this.state.refresh}
              onRefresh = {this.loadNew}
              data ={this.state.review_list}
              keyExtractor={(item, index)=>index.toString}
              contentContainerStyle = {{alignItems:'center',}}
              style = {{flex:1,backgroundColor:'#ffffff', alignContent:'center',borderRadius: 30, width: screenWidth/2, height:screenHeight/3}}
              renderItem = {({item, index}) => (
              <View  key ={index}>
               <TouchableOpacity onLongPress = {() => this.deleteReview(item.id)}>
                  <Card  style = {{borderRadius: 30, width: screenWidth/2.3}}>
                      <CardItem bordered style={{ borderRadius: 30 }}>
                          <Left>
                              <Thumbnail source={{uri:item.img}} style={{height:35,width:35}}/>
                              <Body>
                              <TouchableOpacity>
                                  <Text style = {{fontWeight:"bold"}}>{item.name}</Text>
                              </TouchableOpacity>
                              </Body>
                          </Left>
                      </CardItem>
                  </Card>
                  </TouchableOpacity>
              </View>
              )}
          >
          </FlatList>
            )}
             
            


            <View style = {{flex: 4, width: 190, alignContent:'center', alignItems:'center',  paddingTop:20 }}>
            {this.state.review_list.length == 0 ?  (
              <View></View>
          ):(
                    <Button icon={
                      <Icon
                        name="video-camera"
                        size={15}
                        style ={{color:"#ffffff"}}
                        type ='Entypo'
                      />}
                      title=" Start!"
                      onPress={() => this.props.navigation.navigate('ArScreen')}
                      raised = 'true'
                      buttonStyle={{height:60, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}  
                      />
                      )}
            </View>
            </View>
          <View style = {{flex: 1, width: 300}}></View>
        </View>
      )
    }
}

export default StartScreen


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ffffff'
    }
});
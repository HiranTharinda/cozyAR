import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button,Card, CardItem} from 'native-base'
import firebase from 'react-native-firebase'

var images = [

    require('../../assets/feed_images/1.jpg'),

    require('../../assets/feed_images/2.jpg'),

    require('../../assets/feed_images/3.jpg'),

    require('../../assets/feed_images/4.jpg'),

    require('../../assets/feed_images/5.jpg'),

    require('../../assets/feed_images/6.jpg'),

    require('../../assets/feed_images/7.jpg'),

    require('../../assets/feed_images/8.jpg'),

    require('../../assets/feed_images/9.jpg'),

    require('../../assets/feed_images/10.jpg'),

    require('../../assets/feed_images/11.jpg'),

    require('../../assets/feed_images/12.jpg'),

] 





var { width } = Dimensions.get('window')
class ProfileTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-person" style={{color:
            tintColor}}/>
        ) 
    }
    
    renderSectionOne = () => 

    {

        return images.map((image, index) => {

            return (

                <View key={index} style = {[ {width:(width)/3},{height:(width)/3},{ marginBottom: 2},

                index % 3 !== 0 ?{paddingLeft: 2} : { paddingLeft: 0}]}>

                    <Image style = {{ flex:1, width:undefined,height:undefined}}

                    source = {image}/>

                </View>

            )

        })

    }

    render(){
        return(
            
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content>
                <View style ={{paddingTop: 100, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                                <Image source = {require('../../assets/propic.jpg')}
                                    style={{ width:110, height:110, borderRadius: 55,}}/>
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 30, paddingTop: 15}}>
                           
                                <View style ={{flex:2, paddingHorizontal:10,alignItems: 'center'}}>
                                    <Text style = {{ fontWeight: 'bold', fontSize:30}}> Hiran Tharinda </Text>
                                    <Text> Freelancer | Student </Text>
                                    <Button transparent onPress={() => firebase.auth().signOut()} >
                                    <Icon name="ios-send"
                                    style={{color: 'black'}}/>
                                    </Button>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card>
                            <CardItem>
                                {this.renderSectionOne()}
                            </CardItem>
                        </Card>
                       
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ProfileTab;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
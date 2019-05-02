import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from "react-native";
import {Icon, Content, Container, Button} from 'native-base'
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
    
    constructor(props)
    {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
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

    renderSection = () => {
        if (this.state.activeIndex == 0){
            
            return(
                <View style = {{ flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.renderSectionOne()}
                </View>
            )
        }
    }

    render(){
        return(
            
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content>
                <View style ={{paddingTop: 10, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'row'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                                <Image source = {require('../../assets/propic.jpg')}
                                    style={{ width:110, height:110, borderRadius: 55,}}/>
                            </View>
                            <View style = {{ flex: 2, flexDirection: "column", paddingBottom: 30, paddingTop: 15}}>
                                <View style = {{flex:2, flexDirection: 'row'}}>
                                    <Button bordered dark onPress={() => firebase.auth().signOut()}  
                                        style={{ flex: 3, marginLeft: 10,
                                        justifyContent: 'center', height:30}}>
                                        <Text> Logout </Text>
                                    </Button>
                                    <Button bordered dark style = {{flex: 2, height: 30,
                                        marginRight:5, marginLeft: 5, 'justifyContent': 'center'}}>
                                        <Icon name = "settings"/>
                                    </Button>
                                </View>
                                <View style ={{flex:2, paddingHorizontal:10}}>
                                    <Text style = {{ fontWeight: 'bold'}}> Hiran Tharinda </Text>
                                    <Text> Freelancer | Student </Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#3b3b3b'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', borderTopWidth:1, borderTopColor:"#c8d6e5"}}>
                            <Button
                                transparent
                                onPress = {()=>this.segmentClicked(0)}
                                active={this.state.activeIndex == 0}
                                >
                                    <Icon name="apps" style = {[this.state.activeIndex == 0? {}:
                                    {color: '#ffffff'},this.state.activeIndex == 1? {}:
                                    {color: '#2fd7e0'}]}/>
                                </Button>
                                <Button
                                transparent
                                onPress = {()=>this.segmentClicked(1)}
                                active={this.state.activeIndex == 1}
                                >
                                    <Icon name="settings" style = {[this.state.activeIndex == 0? {}:
                                    {color: '#2fd7e0'},
                                    this.state.activeIndex == 1? {}:
                                    {color: '#ffffff'}]}/>
                                </Button>
                        </View>
                        {this.renderSection()}
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
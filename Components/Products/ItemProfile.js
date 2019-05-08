import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon} from 'native-base'
class ItemProfile extends Component{

    render(){
        return(
            <Card>
                <CardItem>
                    <Left>
                       
                        <Body>
                            <Text>
                                Hiran
                            </Text>
                            <Text note>March 24, 2019</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                  
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
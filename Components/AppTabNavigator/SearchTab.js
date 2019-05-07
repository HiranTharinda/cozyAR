
import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, StatusBar} from "react-native";
import { SearchBar, Button } from 'react-native-elements'
import {Icon, Content, Container, Header, Left, Body, Right, Row, Thumbnail} from 'native-base'


class SearchTab extends Component{

    render(){
        return(
            <Container>
                <View style={{flex:1,}}>
      
                </View>
            </Container>
        );
    }
}

export default SearchTab;

const styles = StyleSheet.create({
    thumbnail:{
        marginHorizontal:5,
        borderColor:"#2fd7e0",
        borderWidth:3,
        borderRadius:10,
        width:80,
        height:60
    }
});
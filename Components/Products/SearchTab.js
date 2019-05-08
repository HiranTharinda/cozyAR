
import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, StatusBar} from "react-native";
import { Button } from 'react-native-elements'
import {Icon, Content, Container, Header, Left, Body, Right, Row, Thumbnail} from 'native-base'
import SearchBar from 'react-native-searchbar';

class SearchTab extends Component{

    constructor(props) {
        super(props);
            this.state = {
                results: []
            };
            this._handleResults = this._handleResults.bind(this)
    }
    
    _handleResults(results) {
        this.setState({ results });
    }

    render() {
        return (
            <View>
                <SearchBar
                ref={(ref) => this.searchBar = ref}
                handleResults={this._handleResults}
                showOnLoad
            />
            </View>
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
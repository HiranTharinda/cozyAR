
import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native";
import { SearchBar } from 'react-native-elements'
import {Icon, Content, Container, Header, Left, Body, Right, Button} from 'native-base'
import GooglePoly from '../../api/GooglePoly'
import ApiKeys from '../../constants/ApiKeys';
import { AssetThumb } from '../AssetThumb'
import _ from 'lodash'

class SearchTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "ios-search" style={{color:
            tintColor}}/>
        ) 
    }

    constructor(props) {
        super(props);

        this.googlePoly = new GooglePoly(ApiKeys.GooglePoly)
        this.googlePoly.getSearchResults("duck","").then (function(assets){
            
        })

        this.state = {
            searchQuery:"",
            currentResults: []
        }
    }


    onSearchChangeText = (text) => {
        this.setState({searchQuery: text});

        
    }

    onSearchPress = () => {
        var keywords = this.state.searchQuery
        this.googlePoly.setSearchParams(keywords)

        this.googlePoly.getSearchResults().then(function(assets){
            this.setState({currentResults: this.googlePoly.currentResults})
        }.bind(this))
    }

    onLoadMorePress = () => {
        this.googlePoly.getSearchResults().then(function(assets){
            this.setState({currentResults: this.googlePoly.currentResults})    
        }.bind(this))
    }

    renderCurrentResults() {
        if (this.state.currentResults.length == 0){
            return (
            <View style={{flex:1, alignItems:"center"}}>
                    <ActivityIndicator animating size= "large"/>
            </View>
            )
        }
        var results = []
        for (var i = 0; i < this.state.currentResults.length; i+=3){
            if (i == this.state.currentResults.length -1){
                results.push(<AssetThumb asset={this.state.currentResults[i]} key={i}/>)
            break
            }

            results.push(
                <View style = {{flexDirection:"row"}} key={"row"+i}>
                    <AssetThumb asset={this.state.currentResults[i]} key={i}/>
                    <AssetThumb asset={this.state.currentResults[i+1]} key={i+1}/>
                    <AssetThumb asset={this.state.currentResults[i+2]} key={i+2}/>
                </View>
            )
            
        }
        return (
            <View style = {{flex:1, alignItems: "center"}}>
                {results}
            </View>
        )
        
    }

    render(){
        return(
            <Container>
                <SearchBar lightTheme round
                    placeholder="Type Here..."
                    onChangeText={this.onSearchChangeText}
                    value={this.state.searchQuery}/>
                <Button light onPress={this.onSearchPress}><Text>search</Text></Button>
                <ScrollView>
                    {this.renderCurrentResults()}
                    <Button light onPress={this.onLoadMorePress}><Text>Load More...</Text></Button>
                </ScrollView>
            </Container>
        );
    }
}

export default SearchTab;


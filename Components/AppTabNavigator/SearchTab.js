
import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, StatusBar} from "react-native";
import { SearchBar, Button } from 'react-native-elements'
import {Icon, Content, Container, Header, Left, Body, Right, Row, Thumbnail} from 'native-base'
import GooglePoly from '../../api/GooglePoly'
import ApiKeys from '../../constants/ApiKeys';
import { AssetThumb } from '../AssetThumb'
import _ from 'lodash'

class SearchTab extends Component{

  

    constructor(props) {
        super(props);

        this.googlePoly = new GooglePoly(ApiKeys.GooglePoly)
        this.googlePoly.getSearchResults("","").then (function(assets){
            
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
                <Button title="Load More"
                            onPress={this.onLoadMorePress}
                            containerStyle={{justifyContent:"center",alignItems:"center"}}
                            buttonStyle={{width:100,backgroundColor:"#bcc6cf"}}
                            >
                    </Button>
            </View>
        )
        
    }

    render(){
        return(
            
            <Container>
            <View style={{flex:1,}}>
                <View style={{flexDirection:"column"}}>
                    <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style = {{paddingHorizontal: 5, paddingVertical:5}}
                    >
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail} source={require("../../assets/searchCatogories/1.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/2.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/3.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/4.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/5.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/6.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail style={styles.thumbnail}  source={require("../../assets/searchCatogories/7.jpg")}></Thumbnail>
                        </TouchableOpacity>
                        
                    </ScrollView>
                </View>
                <View style={{flex:1, flexDirection:"row",height:60}}>
                    <SearchBar lightTheme
                                containerStyle={{width:350,height:50,backgroundColor:"#ffffff"}}
                                inputContainerStyle={{height:30,backgroundColor:"#ffffff"}}
                                placeholder="Type Here..."
                                onChangeText={this.onSearchChangeText}
                                value={this.state.searchQuery}/>
                    <Button 
                        icon={
                            <Icon
                                name="checkmark"
                                size={15}
                                color="white"
                                />
                            }
                        onPress={this.onSearchPress}
                        containerStyle={{justifyContent:"center",alignItems:"center",width:70,height:48,backgroundColor:"#ffffff"}}
                        buttonStyle={{width:70,backgroundColor:"#ffffff"}}
                        raised
                        >
                ></Button>
                </View>
                <View style={{flex:8}}>
                    <ScrollView>
                        {this.renderCurrentResults()}
                  
                    </ScrollView>
                </View>
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
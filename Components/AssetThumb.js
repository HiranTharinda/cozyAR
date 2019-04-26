import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

export default class AssetThumb extends React.Component {

    static defaultProps = {
        asset: {},
        onPress: function(
            
        ) {}
    }
    render(){
        return(
            <TouchableOpacity style = {styles.container} onPress={this.props.onPress}>
                <Image source = {{uri:this.props.asset.thumbnail.url}} style ={styles.thumbnail}/>
                <Text style={styles.displayName}>{this.props.asset.displayName}</Text>
                
            </TouchableOpacity>    
        ) 
    }
}



export { AssetThumb}

const styles = StyleSheet.create({
        thumbnail: {width:125, height:125},
        container: {alignItems: "center",paddingHorizontal: 3},
        displayName: {fontWeight: "bold"},
        authorName: {},
})
import React, { Component } from "react";
import { ActivityIndicator ,View, Text, StyleSheet, Image, Button, TextInput} from "react-native";
import {Icon, Picker} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase'




class PostTab extends Component{
    
    constructor(props){
        super(props)
        this.state={
            photoSelected: false,
            imageId: this.uniqueId(),
            uploading: false,
            uri:'',
            caption: '',
            progress: 0
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

    handleChoosePhoto = () => {
      
        //Open up the Image Picker
        ImagePicker.openPicker({
            width:1000,
            height:1000,
            cropping: true
            }).then(image => {
                this.setState({
                    photoSelected: true,
                    imageId: this.uniqueId(),
                    uri: image.path
                })
                //Creating reference to the this
               
        }); if(this.state.photoSelected){

        }else{
            this.setState({
                photoSelected:false
            })
        }
    }

    uploadPublish = () => {
        if(this.state.uploading == false){
            if(this.state.caption != ''){
                this.uploadTheImage()
            }else{
                alert('Please enter a Caption..')
            }
        }else{
            console.log('Ignore its uploading')
        }
       
    }

    uploadTheImage = () =>{
        var that = this
        //Getting userId, imageId and path of the image we are going to upload
        var userId = firebase.auth().currentUser.uid
        var imageId = this.state.imageId
        var imagePath = this.state.uri
        // Getting the format of the image
        var re = /(?:\.([^.]+))?$/
        var ext = re.exec(imagePath)[1]
        //Setting the format of the image
        this.setState({
                currentFileType: ext,
                uploading:true,
            })
        //Building the file path
        var FilePath = imageId+'.'+that.state.currentFileType
        let mime = 'image/jpg'
        //Creating a reference to the firebase storage
        const uploadTask = firebase.storage().ref('user/'+userId+'/img').child(FilePath).put(imagePath, {contentType: mime})     
        
        uploadTask.on('state_changed', function(snapshot){
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log('Upload is '+progress+'% complete')
            that.setState({
                progress:progress
            })
        },function(error){
            console.log('error with upload'+error)
        },function(){
            that.setState({
                progress:100
            });

            const ref = firebase.storage().ref('user/'+userId+'/img').child(FilePath)
            const url = ref.getDownloadURL().then((url) => {
                that.processUpload(url)
            });
            
     
        })
              
    }

    processUpload = (imageUrl) => {
        var imageId = this.state.imageId
        var userId = firebase.auth().currentUser.uid
        var caption = this.state.caption
        var dateTime = Date.now()
        var timestamp = Math.floor(dateTime/1000)
        var photoObj ={
            author:userId,
            caption:caption,
            posted:timestamp,
            url:imageUrl
            
        }
        //Update database
        firebase.database().ref('/photos/'+imageId).set(photoObj)
        // database.ref('/users/'+userId+'/photos/'+imageId).set(photoObj)
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <Image resizeMode = 'contain' source = {require('../../assets/postBack.jpg')} style ={{ width:'100%', height:'110%'}}/>
                {this.state.photoSelected == true ? (
                    <View style = {{flex: 5, width: 120, alignContent:'center', alignItems:'center', position:'absolute', paddingBottom:60}}> 
                    <Image source ={{uri:this.state.uri}} style = {{width:200,height:200}}></Image>
                    <TextInput
                            editable={true}
                            placeholder={'Enter a comment here...'}
                            onChangeText={(text) => this.setState({caption: text})}
                            style = {{marginVertical:10, height: 50, padding: 50}}> 
                    </TextInput>
                    <Button 
                            title="Share"
                            onPress={() => this.uploadPublish()}
                            buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}  
                    />
                      {this.state.uploading == true ? (
                        <View>
                            <Text>
                                {this.state.progress}%
                            </Text>
                            {this.state.progress != 100 ?(
                                <ActivityIndicator size='small' color = 'black'></ActivityIndicator>
                            ):(
                                <Text>Processing</Text>
                            )}
                        </View>
                      ):(
                        <View></View>
                      )}  
                </View>
                ) : (
                    <View style = {{flex: 5, width: 120, alignContent:'center', alignItems:'center', position:'absolute', paddingBottom:60}}> 
                    <Text style={{fontWeight:"900", fontSize:35,textAlign: 'center', fontFamily:'Pacifico'}}>SHARE WHAT YOU LOVE</Text>
                    <Text style={{fontWeight:"900", fontSize:11,textAlign: 'center', fontFamily:'Pacifico'}}></Text>
                    <Button 
                            title="NOW!"
                            onPress={() => this.handleChoosePhoto()}
                            buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}/>
                </View>
                )}
            </View>
        )
    }
}

export default PostTab;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
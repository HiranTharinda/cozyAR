import React, { Component } from "react";
import { ActivityIndicator ,View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import {Button} from 'react-native-elements'
import {Icon, Picker, Card, CardItem, Thumbnail, Body, Left, Right,} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
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
            progress: 0,
            video:null
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
                    video:false,
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

    //Photo
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
            url:imageUrl,
            flag: false
            
        }
        //Update database
        firebase.database().ref('/photos/'+imageId).set(photoObj)
        firebase.database().ref('/users/'+userId+'/photos/'+imageId).set(photoObj)
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false,
            video:null
        })
        this.props.navigation.navigate('Feed')
    }
    
    //Video
    handleChooseVideo = () => {
        //Open up the Image Picker
        ImagePicker.openPicker({
            mediaType: "video",
            }).then(video => {
                this.setState({
                    photoSelected: true,
                    video:true,
                    imageId: this.uniqueId(),
                    uri: video.path
                })
                
                //Creating reference to the this
        }); if(this.state.photoSelected){

        }else{
            this.setState({
                photoSelected:false
            })
        }
    }


    uploadPublishVideo = () => {
        if(this.state.uploading == false){
            if(this.state.caption != ''){
                this.uploadTheVideo()
            }else{
                alert('Please enter a Caption..')
            }
        }else{
            console.log('Ignore its uploading')
        }
    }

    uploadTheVideo = () =>{
        var that = this
        //Getting userId, imageId and path of the image we are going to upload
        var userId = firebase.auth().currentUser.uid
        var imageId = this.state.imageId
        var imagePath = this.state.uri
        // Getting the format of the image
        var re = /(?:\.([^.]+))?$/
        var ext = 'mp4'
        //Setting the format of the image
        this.setState({
                currentFileType: ext,
                uploading:true,
            })
        //Building the file path
        var FilePath = imageId+'.'+that.state.currentFileType
        let mime = 'video/mp4'
        //Creating a reference to the firebase storage
        const uploadTask = firebase.storage().ref('user/'+userId+'/vid').child(FilePath).put(imagePath, {contentType: mime})     
        
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
            const ref = firebase.storage().ref('user/'+userId+'/vid').child(FilePath)
            const url = ref.getDownloadURL().then((url) => {
                that.processUploadVideo(url)
            });
        })
    }

    processUploadVideo = (imageUrl) => {
        var imageId = this.state.imageId
        var userId = firebase.auth().currentUser.uid
        var caption = this.state.caption
        var dateTime = Date.now()
        var timestamp = Math.floor(dateTime/1000)
        var photoObj ={
            author:userId,
            caption:caption,
            posted:timestamp,
            url:imageUrl,
            flag: true
            
        }
        //Update database
        firebase.database().ref('/photos/'+imageId).set(photoObj)
        firebase.database().ref('/users/'+userId+'/photos/'+imageId).set(photoObj)
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false,
            video:null
        })
        this.props.navigation.navigate('Feed')
    }

    cancelButton = () => {
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false,
            video:null
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                {this.state.photoSelected == true ? (
                    <View style = {{flex: 5, width: '100%',height:'100%', alignContent:'center', alignItems:'center', position:'absolute', paddingBottom:300}}> 
                        <View style = {{width:'100%',height:'100%'}}>
                        {this.state.video == false? (<View style = {{width:'100%',height:'100%'}}>
                            <Image resizeMode = 'contain' source ={{uri:this.state.uri}} style = {{width:'100%',height:'100%', minHeight:'100%'}}></Image>
                            <TouchableOpacity style = {{position:'absolute', alignSelf:'flex-end',padding:10,}}>
                                <Icon type='MaterialIcons' name="cancel" onPress={() => this.cancelButton()}
                                    style={{color: 'black'}}/>
                            </TouchableOpacity>
                            <KeyboardAvoidingView>
                            <Card style = {{width:'100%',height:70, alignContent:'center',alignItems:'baseline', alignSelf:'baseline'}}>
                            <CardItem>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    placeholder={'Write a caption...'}
                                    onChangeText={(text) => this.setState({caption: text})}
                                    style = {{width:'90%'}}> 
                                </TextInput>    
                                <Right>
                                    {this.state.uploading == true ? (
                                        <ActivityIndicator size='small' color = 'black'></ActivityIndicator>
                                        ):(
                                        <View>
                                            <TouchableOpacity>
                                                <Icon type="MaterialCommunityIcons" name="comment" onPress={() => this.uploadPublish()}
                                                    style={{color: 'black'}}/>
                                            </TouchableOpacity>
                                        </View>
                                        )}  
                                </Right>
                        </CardItem>
                    </Card>
                    </KeyboardAvoidingView>
                   </View>
                    ):(
                    <View>
                        <Video
                            source={{uri:this.state.uri}}
                            resizeMode="cover"
                            repeat={true}
                        />
                        <Card style = {{width:'100%',height:70}}>
                            <CardItem>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    placeholder={'Write a caption...'}
                                    onChangeText={(text) => this.setState({caption: text})}
                                    style = {{width:'90%'}}> 
                                </TextInput>    
                                <Right>
                                    {this.state.uploading == true ? (
                                        <ActivityIndicator size='small' color = 'black'></ActivityIndicator>
                                        ):(
                                        <View>
                                            <TouchableOpacity>
                                                <Icon type="MaterialCommunityIcons" name="comment" onPress={() => this.uploadPublishVideo()}
                                                    style={{color: 'black'}}/>
                                            </TouchableOpacity>
                                        </View>
                                        )}  
                                </Right>
                        </CardItem>
                    </Card>
                    <TouchableOpacity style = {{position:'absolute', alignSelf:'flex-end',padding:10}}>
                                <Icon type='MaterialIcons' name="cancel" onPress={() => this.cancelButton()}
                                    style={{color: 'white'}}/>
                    </TouchableOpacity></View>
                    )}
                    </View>
                </View>
                ) : (
                <View style={styles.container}>
                    <View style = {{flex: 2, width: 300}}></View>
                    <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}>
                        <Card style ={{borderRadius: 40,width:240, height:'70%'}}>
                            <CardItem style ={{borderRadius: 40,width:240, height:'90%'}}>
                                <View style = {{flex: 5, width: 190, alignContent:'center', alignItems:'center'}}>  
                                    <Text></Text>
                                    <Text style={{fontWeight:"900", fontSize:40,textAlign: 'center'}}>SHARE WHAT YOU LOVE.</Text>
                                    <Text></Text>
                                    <Button icon={
                                        <Icon
                                        name="camera"
                                        size={15}
                                        style ={{color:"#ffffff"}}
                                        type ='Entypo'
                                        />}
                                    title="Photo"
                                    onPress={() => this.handleChoosePhoto()}
                                    raised = 'true'
                                    buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#181f31'}}  
                                    />
                                    <Text></Text>
                                    <Button icon={
                                        <Icon
                                        name="video-camera"
                                        size={15}
                                        style ={{color:"#ffffff"}}
                                        type ='Entypo'
                                    />}
                                    title="Video"
                                    onPress={() => this.handleChooseVideo()}
                                    raised = 'true'
                                    buttonStyle={{height: 40, width: 180, borderRadius: 30, backgroundColor:'#ff6b6b'}}  
                                    />
                                    <Text></Text>
                                    <Text></Text>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                <View style = {{flex: 1, width: 300}}></View>
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
    justifyContent: 'center',
    backgroundColor:'#ffffff'
    }
});
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, TextInput, TouchableOpacity } from "react-native";
import {Icon, Content, Container,Card, CardItem} from 'native-base'
import {Button} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase'
class ProfileSettings extends Component{

    state = {name:''}
    
    constructor(props){
        super(props)
        this.state={
            photoSelected: false,
            imageId: this.uniqueId(),
            uploading: false,
            uri:'',
            progress: 0
        }
    }

    updateProfiledata = () => {
        var name = this.state.name
        console.log(name)
        var userId = firebase.auth().currentUser.uid;
        var userObj = {
            name: name
        }
        firebase.database().ref('/users/'+userId).update(userObj)
    }

    fetchProfileData = () => {
        var that = this;
        userId = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    name: data.name,
                    avatar: data.avatar,
                    email:data.email
            })
            console.log(data)
        })
    }

    componentDidMount = () => {
        this.fetchProfileData()
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
                this.uploadPublish()
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
        
                this.uploadTheImage()
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
        const uploadTask = firebase.storage().ref('user/'+userId+'/profile').child(FilePath).put(imagePath, {contentType: mime})     
        
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

            const ref = firebase.storage().ref('user/'+userId+'/profile/').child(FilePath)
            const url = ref.getDownloadURL().then((url) => {
                that.processUpload(url)
            });
        })
    }

    processUpload = (imageUrl) => {
        var imageId = this.state.imageId
        var userId = firebase.auth().currentUser.uid
        var photoObj ={
            avatar:imageUrl
        }
        //Update database
        firebase.database().ref('/users/'+userId).update(photoObj)
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false
        })
    }
    
    cancelButton = () => {
        this.setState({
            uploading: false,
            photoSelected:false,
            caption:false
        })
    }





    render(){
        return(
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
                <Content>
                    <View style ={{paddingTop: 100, paddingBottom:10, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                    <Image source = {{uri:this.state.avatar}}
                                                style={{ width:110, height:110, borderRadius: 55,}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card transparent>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Name</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    value={this.state.name}
                                    onChangeText={(text) => this.setState({name: text})}
                                    style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:10}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Email</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    value = {this.state.email}
                                    style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:10}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Password</Text>
                                <TextInput
                                    secureTextEntry
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    placeholder={'dsdsd'}
                                    style = {{width:'90%',fontSize:20, textAlign:'right', paddingRight:45}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem>
                                <Button onPress={() => firebase.auth().signOut()}
                                    title = "Make a Review"
                                    buttonStyle={{height: 60, width: 180, borderRadius: 35, backgroundColor:'#54a0ff'}}  
                                    />
                                    <Text> </Text>
                                <Button 
                                    title="Save"
                                    onPress={() => this.updateProfiledata()}
                                    buttonStyle={{height: 60, width: 180, borderRadius: 35, backgroundColor:'#ff6b6b'}}  
                                />
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ProfileSettings;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
    }
});
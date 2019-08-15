import React, { Component } from "react";
import {Alert, View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, TextInput, TouchableOpacity } from "react-native";
import {Icon, Content, Container,Card, CardItem} from 'native-base'
import {Button} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase'
import CameraRoll from "@react-native-community/cameraroll";
import ViewShot from "react-native-view-shot";
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
        var status = this.state.status
        console.log(name)
        var userId = firebase.auth().currentUser.uid;
        var userObj = {
            name: name,
            status: status
        }
        firebase.database().ref('/users/'+userId).update(userObj)
        Alert.alert("Profile updated successfully")
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    changePassword = () => {
        if(this.state.npwd == this.state.cnpwd != null && this.state.cpwd != null){
            this.reauthenticate(this.state.cpwd).then(() =>{
                var user = firebase.auth().currentUser
            user.updatePassword(this.state.npwd).then(() => {
                Alert.alert("Your password has been changed successfully!")
            }).catch((error) => {
                Alert.alert(error.message)
            })
            }).catch((error) =>{
                Alert.alert(error.message)
            })
        }else{
            Alert.alert("Passwords do not match!")
        }
        
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
                    email:data.email,
                    status: data.status
            })
          
        })
    }

    componentDidMount = () => {
        this.fetchProfileData()
            this.refs.viewShot.capture().then(uri => {
              console.log("do something with ", uri);
              CameraRoll.saveToCameraRoll(uri)
           });
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
                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>

                    <View style ={{paddingTop: 50, paddingBottom:50, paddingRight:20, paddingLeft:20}}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style = {{flex: 1, alignItems: 'center'}}>
                                <Image source = {{uri:this.state.avatar}}
                                    style={{ width:200, height:200, borderRadius: 100}}/>
                                <TouchableOpacity style = {{position:'absolute', alignSelf:'center',paddingTop:200}}>
                                    <Icon type='Entypo' name="circle-with-plus" onPress={() => this.handleChoosePhoto()}
                                        style={{color: '#4267b2', fontSize:35,}}/>
                                </TouchableOpacity>            
                                <View style = {{flex:1}}></View>
                            </View>
                        </View>
                    </View>
                    </ViewShot>
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <Card style={{height:'100%'}}>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Name</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    value={this.state.name}
                                    onChangeText={(text) => this.setState({name: text})}
                                    style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:30}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Status</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    value={this.state.status}
                                    onChangeText={(text) => this.setState({status: text})}
                                    style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:35}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Email</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    value = {firebase.auth().currentUser.email}
                                    style = {{width:'90%',fontSize:20,textAlign:'right', paddingRight:32}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem style ={{justifyContent: 'flex-end'}}>
                            <Button 
                                    title="Save"
                                    onPress={() => this.updateProfiledata()}
                                    buttonStyle={{height: 40, width: 120, borderRadius: 35, backgroundColor:'#4267b2'}}  
                                />
                                </CardItem>
                            <CardItem >
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Current Password</Text>
                                <TextInput
                                    secureTextEntry
                                    underlineColorAndroid="transparent"
                                    editable={true}
                                    onChangeText={(text) => this.setState({cpwd: text})}
                                    placeholder={'*******'}
                                    style = {{width:'90%',fontSize:20, textAlign:'right', paddingRight:130}}> 
                                </TextInput>    
                            </CardItem>
                            <CardItem >
                            <Text style={{fontSize:20, fontWeight:'bold'}}>New Password</Text>
                            <TextInput
                                secureTextEntry
                                underlineColorAndroid="transparent"
                                editable={true}
                                onChangeText={(text) => this.setState({npwd: text})}
                                placeholder={'*******'}
                                style = {{width:'90%',fontSize:20, textAlign:'right', paddingRight:105}}> 
                            </TextInput>    
                        </CardItem>
                        <CardItem >
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Confirm Password</Text>
                        <TextInput
                            secureTextEntry
                            underlineColorAndroid="transparent"
                            editable={true}
                            onChangeText={(text) => this.setState({cnpwd: text})}
                            placeholder={'*******'}
                            style = {{width:'90%',fontSize:20, textAlign:'right', paddingRight:135}}> 
                        </TextInput>
                    </CardItem>
                            <CardItem style ={{justifyContent: 'flex-end'}}>
                            <Button onPress={() => this.changePassword()}
                            title = "Change Password"
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{height: 40, width: 120,color:'grey', borderRadius: 35, backgroundColor:'#4267b2'}}  
                            />
                            </CardItem>
                            <CardItem style ={{justifyContent: 'flex-start'}}>
                                <Button onPress={() => firebase.auth().signOut()}
                                    title = "Logout"
                                    titleStyle={{ color: 'grey' }}
                                    buttonStyle={{height: 40, width: 120,color:'grey', borderRadius: 35, backgroundColor:'white', borderColor:'grey',borderWidth:1}}  
                                    />
                                    <Text> </Text>
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
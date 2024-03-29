/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addModelWithIndex, removeAll, removeModelWithUUID, changeModelLoadState, changeItemClickState, switchListMode, removeARObject, displayUIScreen} from './redux/actions';
import TimerMixin from 'react-timer-mixin';

import * as LoadingConstants from './redux/LoadingStateConstants';
import * as UIConstants from './redux/UIConstants';
import renderIf from './helpers/renderIf';
import ButtonComponent from './component/ButtonComponent';
import RecordButton from './component/RecordButton';
import ContextMenuButton from './component/ContextMenuButton';
import SuccessAnimation from './component/SuccessAnimation';
import ShareScreenButton from './component/ShareScreenButtonComponent';
import FigmentListView from './component/FigmentListView';
import ARInitializationUI from './component/ARInitializationUI.js';
import * as ModelData from  './model/ModelItems';
import CameraRoll from "@react-native-community/cameraroll";

const kObjSelectMode = 1;


const kPreviewTypePhoto = 1;
const kPreviewTypeVideo = 2;


import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ActionSheetIOS,
  Alert,
  Button,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  ViroARSceneNavigator,
  ViroConstants,
} from 'react-viro';

import Share from 'react-native-share';
import Video from 'react-native-video';

// AR Scene that's rendered on the MAIN Screen. App state changes propagate to figment.js via redux 
var InitialScene = require('./figment');
/**
 * Entry point of the app. This class also connects and orchestrates the interaction between 2D UI component and 3D Viro components using redux
 */
export class App extends Component {

  constructor(props) {
    
    super(props);
    
    this._renderShareScreen = this._renderShareScreen.bind(this);
    this._renderRecord = this._renderRecord.bind(this);
    this._startRecording = this._startRecording.bind(this);
    this._stopRecording = this._stopRecording.bind(this);
    this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
    this._onListItemLoaded = this._onListItemLoaded.bind(this);
    this._onListPressed = this._onListPressed.bind(this);
    this._getListItems = this._getListItems.bind(this);
    this._saveToCameraRoll = this._saveToCameraRoll.bind(this);

    this._takeScreenshot = this._takeScreenshot.bind(this);

    this._onItemClickedInScene = this._onItemClickedInScene.bind(this);
    this._onContextMenuRemoveButtonPressed = this._onContextMenuRemoveButtonPressed.bind(this);
    this._startStopWatch = this._startStopWatch.bind(this);
    this._getLoadingforModelIndex = this._getLoadingforModelIndex.bind(this);
    this._constructListArrayModel = this._constructListArrayModel.bind(this);
    this._onContextClearAll = this._onContextClearAll.bind(this);
    this.requestAudioPermission = this.requestAudioPermission.bind(this);
    this.requestWriteAccessPermission = this.requestWriteAccessPermission.bind(this);
    this.requestReadAccessPermission = this.requestReadAccessPermission.bind(this);

    this.state = {
      currentModeSelected:kObjSelectMode,
      videoUrl: null,
      haveSavedMedia: false,
      playPreview : false,
      viroAppProps: {loadingObjectCallback: this._onListItemLoaded, clickStateCallback: this._onItemClickedInScene},
      showPhotosSelector : false,
      previewType: kPreviewTypeVideo,
      lastSelectedPortalUUID: -1,
      timer:null,
      hours: '00',
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
      recordStartTimeInMillis: 0,
      cameraPermission:false,
      audioPermission:false,
      writeAccessPermission:false,
      readAccessPermission:false,
      screenshot_count:0,
    };
  }

  // This render() function renders the AR Scene in <ViroARSceneNavigator> with the <ViroARScene> defined in figment.js
  // Rest of the components in <View> ... </View> render 2D UI components (React-Native)
  render() {
      return (
        <View style={localStyles.flex}>
          
          <ViroARSceneNavigator style={localStyles.arView} 
                                apiKey="E27B52CE-59E8-4CEA-A788-C212505E06F6"
                                initialScene={{scene: InitialScene}}  
                                ref={this._setARNavigatorRef} 
                                viroAppProps={this.state.viroAppProps}/>

          {/* AR Initialization animation shown to the user for moving device around to get AR Tracking working*/}
          <ARInitializationUI style={{position: 'absolute', top: 20, left: 0, right: 0, width: '100%', height: 140, flexDirection:'column', justifyContent: 'space-between', alignItems: 'center'}}/>

          {/* ListView at the bottom of the screen */}
          {renderIf(this.props.currentScreen != UIConstants.SHOW_SHARE_SCREEN,
            <View style={localStyles.listView}>
              <FigmentListView items={this._getListItems()} onPress={this._onListPressed} />
            </View>
            )}

          {/* 2D UI buttons on top right of the app, that appear when a 3D object is tapped in the AR Scene */}
          {this._renderContextMenu()}
      

          {/* 2D UI for sharing rendered after user finishes taking a video / screenshot */}
          {this._renderShareScreen()}


          {/* Buttons and their behavior for recording videos and screenshots at the bottom of the screen */}
          {this._renderRecord()}
        </View>
      );
  }

  async requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'Cozy Audio Permission',
          'message': 'Cozy needs to access your audio ' +
                     'so you can record videos with audio of ' + 
                     'your augmented scenes.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          audioPermission:true,
        });
      } else {
        this.setState({
          cameraPermission:false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

  async requestWriteAccessPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cozy Audio Permission',
          'message': 'Cozy needs to access your photos / videos ' +
                     'so you can record videos and photos of' + 
                     'your augmented scenes.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          writeAccessPermission:true,
        });
      } else {
        this.setState({
          writeAccessPermission:false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

  async requestReadAccessPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Cozy Audio Permission',
          'message': 'Cozy needs to access your audio ' +
                     'so you can view your own images in portals.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          readAccessPermission:true,
        });
      } else {
        this.setState({
          readAccessPermission:false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

// Context Menu is the collection of three buttons that appear on the top right with "Remove object (or Portal)", "Clear All" and "Photo Selector (Only for Portals)"
_renderContextMenu() {
  var selectedItemIndex = this.props.currentItemSelectionIndex;
  var clickState = this.props.currentItemClickState;
  var totalHeight = 120;
  if(this.props.currentSelectedItemType != UIConstants.LIST_MODE_PORTAL) {
      totalHeight = 80;
  }
  if (selectedItemIndex != -1 && clickState == 2) {
    // If a valid object (or portal) was clicked, reset the items "click state" after 3.5 seconds 
    // So that the item can "clicked" again.
    TimerMixin.setTimeout(
      () => {
        this.props.dispatchChangeItemClickState(-1, '', '');
      },
      3500
    );
  }
    return (
      <View style={{flex:1, position:'absolute', flexDirection:'column', justifyContent: 'space-between', alignItems: 'flex-end', top:'25%', right:10,width:80, height:220}}>
        <View style={{flex:.45, flexDirection:'column', justifyContent: 'space-between',alignItems: 'flex-end', right:0, top:20, width:80}}>
          {renderIf(this.props.currentItemSelectionIndex != -1 && (this.state.showPhotosSelector==false),
            <ContextMenuButton onPress={this._onContextMenuRemoveButtonPressed} 
                    stateImageArray={[require("./res/btn_trash.png")]}
                    style={localStyles.previewScreenButtons} />
          )}

          {renderIf(this.props.currentItemSelectionIndex != -1 && (this.state.showPhotosSelector==false),
            <ContextMenuButton onPress={this._onContextClearAll}
                    stateImageArray={[require("./res/btn_clear_all.png")]}
                    style={localStyles.previewScreenButtons} />
          )}

        </View>
        <View style={{flex:.2, flexDirection:'column', justifyContent: 'flex-end',alignItems: 'flex-end', width:80}}>
          {renderIf(this.props.currentItemSelectionIndex != -1 && (this.props.currentSelectedItemType == UIConstants.LIST_MODE_PORTAL) && (this.state.showPhotosSelector==false),
            <ContextMenuButton onPress={()=>{this.setState({showPhotosSelector:true, lastSelectedPortalUUID:this.props.currentItemSelectionIndex})}} 
                    stateImageArray={[require("./res/btn_add_pic_v2.png")]}
                    style={localStyles.previewScreenButtonsAddPic} />
          )}
        </View>
      </View>

  );
}

// Remove button from Context Menu pressed
_onContextMenuRemoveButtonPressed() {
  var index = this.props.currentItemSelectionIndex;
  if (this.props.currentItemSelectionIndex != -1 && this.props.currentItemClickState != '') {
    // if the clicked object was an object, then remove the object
    if (this.props.currentSelectedItemType == UIConstants.LIST_MODE_MODEL) {
      this.props.dispatchRemoveModelWithUUID(index);
    }


    }

    // Reset click states of objects
    this.props.dispatchChangeItemClickState(-1, '', '');

  
}

// Clear All button was pressed
_onContextClearAll() {
    Alert.alert(
      "Remove All Objects",
      "Are you sure you want to clear the entire scene?",
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => this.props.dispatchRemoveAll()},
      ],
    );
}



// Helper function called while initializing <ViroARSceneNavigator>
_setARNavigatorRef(ARNavigator){
  this._arNavigator = ARNavigator;
}

// Render UI for Share Screen, shown after taking a video / image screenshot
_renderShareScreen() {
  if(this.props.currentScreen == UIConstants.SHOW_SHARE_SCREEN) {
    return (
      <View style={localStyles.shareScreenContainerTransparent} >

        {/* If previewType == photo, show the image on share screen*/}
        {renderIf(this.state.previewType == kPreviewTypePhoto,
          <Image source={{uri:this.state.videoUrl}} style={localStyles.backgroundImage} resizeMethod={'resize'}/>)}

        {/* If previewType == video, play the video on share screen*/}
        {/* With react-native-video, if you turn repeat to true and then onEnd pause
            the video, you'll end up with black screen. So we set repeat to false
            and instead seek to 0 when we want to play the video again (seeking will auto start
            the video player too*/}
        {renderIf(this.state.previewType == kPreviewTypeVideo, 
          <Video ref={(ref) => {this.player = ref}}
            source={{uri : this.state.videoUrl}} paused={!this.state.playPreview}
            repeat={false} style={localStyles.backgroundVideo}
            onEnd={()=>{this.setState({playPreview : false})}} />
        )}

        {/* Overlay Play button on top of video, after playing it once. Clicking this button would seek video to 0 and play it again */}
        {renderIf(!this.state.playPreview && (this.state.previewType == kPreviewTypeVideo),
          <View style={{position:'absolute', flex:1, flexDirection:'column', 
                width:90, top:0,bottom:0,
                alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{this.player.seek(0); this.setState({ playPreview : true })}} style={localStyles.previewPlayButtonContainer} underlayColor="#00000000">
              <Image source={require("./res/btn_play.png")} style={localStyles.previewPlayButton} />
            </TouchableOpacity>
         </View>
        )}

        {/* Close button -> Takes user back to main screen */}
        <View style={{position:'absolute', left:20, top:20, width:30, height:30}}>
          <ShareScreenButton onPress={()=>{this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN)}}
            buttonState={'off'}
            stateImageArray={[require("./res/btn_close.png"), require("./res/btn_close.png")]} 
            style={localStyles.previewScreenButtonClose} />
        </View>

        {/* Button to save media to camera roll */}
        <View style={{position:'absolute', left:20, bottom:20, width:40, height:40}}>
          <ShareScreenButton onPress={()=>{this._saveToCameraRoll()}}
          buttonState={this.state.haveSavedMedia ? 'on': 'off'}
          stateImageArray={[require("./res/btn_saved.png"), require("./res/btn_save.png")]} 
          style={localStyles.previewScreenButtonShare} />
        </View>

        {/* Save to media operation success indicator */}
        {renderIf(this.state.haveSavedMedia,
            <SuccessAnimation onPress={()=>{}} 
                    stateImageArray={[require("./res/icon_success.png")]}
                    style={localStyles.previewSavedSuccess} />
        )}
      </View>
    )
  }
}


// Render UI for Video Recording and taking Screenshots
_renderRecord() {
  var recordViews = [];
  // Recording time at top of the screen showing video length
  if(this.props.currentScreen == UIConstants.SHOW_RECORDING_SCREEN) {
    recordViews.push(
      <View key="record_timeline" style={{position: 'absolute', backgroundColor: '#00000066', left: 0, right: 0, top: 0, height:34,  alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={localStyles.recordingTimeText}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Text>
      </View>
    );
  }

  if (this.props.currentScreen != UIConstants.SHOW_SHARE_SCREEN && this.state.showPhotosSelector != true) {

  // View containing buttons for video recording, taking screenshot
  recordViews.push(
    <View key="record_two_button_container" style={{position: 'absolute', flex:1, flexDirection:'row', left: 0, right: 0, bottom: 80, justifyContent: 'center', alignItems: 'center', height: 58}}>
        <View key="record_container" style={{position:'absolute', flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', width:58, height: 58, top:0, bottom:0}}>
          <RecordButton
            key="record_button" onPress={()=>{(this.props.currentScreen==UIConstants.SHOW_MAIN_SCREEN) ? this._startRecording(): this._stopRecording()}}
            buttonState={(this.props.currentScreen==UIConstants.SHOW_MAIN_SCREEN) ? 'off':'on'}
            stateImageArray={[require("./res/btn_stop.png"), require("./res/btn_record.png")]}
            style={localStyles.recordIcon}
            />
        </View>

        <View key="screenshot_container" style={{flex:1, position: 'absolute', flexDirection:'row', justifyContent: 'center', alignItems: 'center', width:58, height: 58, top:0, bottom:0, transform: [{'translate': [80,0, 0]}]}}>
         {renderIf(this.props.currentScreen!=UIConstants.SHOW_RECORDING_SCREEN,
            <ButtonComponent
              key="camera_button" onPress={()=>{this._takeScreenshot()}}
              buttonState={(this.props.currentScreen==UIConstants.SHOW_MAIN_SCREEN) ? 'off':'on'}
              stateImageArray={[require("./res/btn_camera.png"), require("./res/btn_camera.png")]}
              style={localStyles.cameraIcon}
            />)}
         </View>
      </View>);
}
  return recordViews;
}

_takeScreenshot() {
  // check for write permissions, if not then request
  if (!this.state.writeAccessPermission) {
    this.requestWriteAccessPermission();
  }
  this._arNavigator._takeScreenshot("figment_still_" + this.state.screenshot_count, false).then((retDict)=>{

    if (!retDict.success) {
      if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
        this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
      }
    }
    let currentCount = this.state.screenshot_count + 1;
    this.setState({
      videoUrl: "file://" + retDict.url,
      haveSavedMedia : false,
      playPreview : false,
      previewType: kPreviewTypePhoto,
      screenshot_count: currentCount,
    });
    this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);
  });
}

_startRecording() {
  // check for audio permissions, if not then request
  if (!this.state.audioPermission) {
    this.requestAudioPermission();
  }
  this._arNavigator._startVideoRecording("figment_video", false,
     (errorCode)=>{
      this._displayVideoRecordAlert("Recording Error", "Please allow video and audio permissions!" + errorCode);
      this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN);
      });
  this.props.dispatchDisplayUIScreen(UIConstants.SHOW_RECORDING_SCREEN);

  this._startStopWatch();
}

// Stopwatch at the top while recording
_startStopWatch() {

  let timer = TimerMixin.setInterval(() => {

    var seconds = (Number(this.state.seconds) + 1).toString(),
        minutes = this.state.minutes,
        hours = this.state.hours;

    if ( Number(this.state.seconds) == 59) {
      minutes = (Number(this.state.minutes) + 1).toString();
      seconds = '00';
    }

    if ( Number(this.state.minutes) == 59) {
      hours = (Number(this.state.hours) + 1).toString();
      minutes = '00';
      seconds = '00';
    }

    this.setState({
      hours: hours.length == 1 ? '0' + hours: hours,
      minutes : minutes.length == 1 ? '0' + minutes: minutes,
      seconds : seconds.length == 1 ? '0' + seconds: seconds,
    });
  }, 1000);
  this.setState({
    timer: timer,
    recordStartTimeInMillis: (new Date).getTime(),
  });
}

_stopRecording() {
  const recordTimeInMillis = (new Date).getTime() - this.state.recordStartTimeInMillis;
  this._arNavigator._stopVideoRecording().then((retDict)=>{
    if (!retDict.success) {
      if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
        this._displayVideoRecordAlert("Recording Error", "Please allow camera record permissions!" + errorCode);
      }
    }
    this.setState({
      videoUrl: "file://" + retDict.url,
      haveSavedMedia : false,
      playPreview : true,
      previewType: kPreviewTypeVideo,
    });
    this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);

    // Stop stop watch at the top
    clearInterval(this.state.timer);
    this.setState({
        hours: '00',
        minutes: '00',
        seconds: '00',
        miliseconds: '00',
      });

  });
}

_saveToCameraRoll() {
  if (this.state.videoUrl != undefined && !this.state.haveSavedMedia) {
    this.setState({
      haveSavedMedia : true
    })
  }
  CameraRoll.saveToCameraRoll(this.state.videoUrl);
}

_displayVideoRecordAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN)},
    ],
    { cancelable: false }
  )
}

// Dispatch correct event to redux for adding AR Objects, Portals and Effects in the scene 
_onListPressed(index) {
  if(this.props.listMode == UIConstants.LIST_MODE_MODEL) {
    this.props.dispatchAddModel(index);
  }
}

// Dispath correct event to redux for handling load states of Objects and Portals
_onListItemLoaded(index, loadState) {
  if(this.props.listMode == UIConstants.LIST_MODE_MODEL) {
    this.props.dispatchChangeModelLoadState(index, loadState);
  }
}

// When an AR object (Object or Portal) in the scene is clicked; 
// dispatch this event to redux -> which results in context menu appearing on top left
_onItemClickedInScene(index, clickState, itemType) {
  this.props.dispatchChangeItemClickState(index, clickState, itemType);
}

// Load data source for listview based on listview modes
_getListItems() {
  console.log(global.ModelItems)
  if(this.props.listMode == UIConstants.LIST_MODE_MODEL) {
    return this._constructListArrayModel(global.ModelItems, this.props.modelItems);
  }else{

  }
    return null
  } 
    


// Helper to construct listview items
_constructListArrayModel(sourceArray, items) {
    var listArrayModel = [];
    for(var i =0; i<sourceArray.length; i++) {
        listArrayModel.push({icon_img:sourceArray[i].icon_img, loading:this._getLoadingforModelIndex(i, items)})
    }
  return listArrayModel;
}

// Helper to determine which listview item to show the Loading spinner if an AR object or portal is being added to the scene

_getLoadingforModelIndex(index, items) {

  if(items == null || items == undefined) {

    return LoadingConstants.NONE;

  }

  var loadingConstant = LoadingConstants.NONE;



  Object.keys(items).forEach(function(currentKey) {

    if(items[currentKey] != null && items[currentKey] != undefined) {

      if(items[currentKey].loading != LoadingConstants.NONE && items[currentKey].index == index){

        loadingConstant = items[currentKey].loading;

      }

    }

  });



  return loadingConstant;

}

async _openShareActionSheet() {

  let contentType = this.state.previewType == kPreviewTypeVideo ? 'video/mp4' : 'image/png';

  await Share.open({

     subject: "#FigmentAR",

     message: "#FigmentAR",

     url: this.state.videoUrl,

     type: contentType,

  });

}

}




App.propTypes =  {
  objIndex: PropTypes.number.isRequired,
}

App.defaultProps =  {
  objIndex: -1,
}

var localStyles = StyleSheet.create({
  flex : {
    flex : 1,
  },
  arView: {
    flex:1,
  },
  listView: {
    flex:1,
    height : 72,
    width : '100%',
    position : 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom : 0,
    backgroundColor: '#000000aa'
  },
  topPhotoBar: {
    backgroundColor: '#000000aa',
    height : 50,
    width : '100%',
    position : 'absolute',
    top : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    textAlign: 'right',
    color: '#d6d6d6',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    marginRight:10,
    backgroundColor: '#00000000',
    flex:1,
  },
  photosText: {
    textAlign: 'center',
    color: '#d6d6d6',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    backgroundColor: '#00000000',
    flex:1,
  },
  previewScreenButtons: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewScreenButtonsAddPic: {
    height: 32,
    width: 37,
  },
  previewScreenButtonClose: {
    position:'absolute',
    height: 23,
    width: 23,
  },
  previewScreenButtonShare: {
    position:'absolute',
    height: 35,
    width: 35,
  },
  screenIcon: {
    position : 'absolute',
    height: 58,
    width: 58,
  },
    recordIcon: {
    position : 'absolute',
    height: 58,
    width: 58,
    top: 10,
    left: 10,
  },
  cameraIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: 25,
    left: 25,
  },
  recordingTimeText: {
    textAlign: 'center',
    color: '#d6d6d6',
    fontFamily: 'Helvetica Neue',
    fontSize:16,
  },
  previewPlayButtonContainer: {
    position: 'absolute',
    left:0,
    right:0,
    height:90,
  },
  previewPlayButton : {
    position: 'absolute',
    height : 90,
    width : 90,
    left:0,
    alignSelf: 'center',
  },
  previewSavedSuccess : {
    position: 'absolute',
    height : 115,
    width: 100,
    alignSelf: 'center',
  },
  shareScreenContainerTransparent: {
    position : 'absolute',
    flex:1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems:'center',
    backgroundColor : '#000000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode:'stretch',
  },
  photosSelectorStyle : {
    position: 'absolute',
    width: '100%',
    height : '40%',
    bottom : 0
  }
});

// -- REDUX STORE
function selectProps(store) {
  return {
    modelItems: store.arobjects.modelItems,
    currentScreen: store.ui.currentScreen,
    listMode: store.ui.listMode,
    listTitle: store.ui.listTitle,
    currentItemSelectionIndex: store.ui.currentItemSelectionIndex,
    currentItemClickState: store.ui.currentItemClickState,
    currentSelectedItemType: store.ui.currentSelectedItemType,
  };
}

// -- dispatch REDUX ACTIONS map
const mapDispatchToProps = (dispatch) => {
  return {

    dispatchAddModel: (index) => dispatch(addModelWithIndex(index)),
    dispatchRemoveModelWithUUID: (uuid) => dispatch(removeModelWithUUID(uuid)),
    dispatchRemoveAll:() => dispatch(removeAll()),
    dispatchChangeModelLoadState:(index, loadState) =>dispatch(changeModelLoadState(index, loadState)),
    dispatchDisplayUIScreen: (uiScreenState) => dispatch(displayUIScreen(uiScreenState)),
    dispatchSwitchListMode: (listMode, listTitle) =>dispatch(switchListMode(listMode, listTitle)),
    dispatchChangeItemClickState:(index, clickState, itemType) =>dispatch(changeItemClickState(index, clickState, itemType)),
  }
}

export default connect(selectProps, mapDispatchToProps)(App)

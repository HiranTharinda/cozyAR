import * as LoadingConstants from '../redux/LoadingStateConstants';
var firebase = require("../../firebase");
var POSITION_OFFSET = .05 // 5 cm
var firebaseConfig = {
  apiKey: "AIzaSyDYmkq3R7SpWBYiUEKCU8N2SSG-6ojzuc0",
  authDomain: "cozy-67b69.firebaseapp.com",
  databaseURL: "https://cozy-67b69.firebaseio.com",
  projectId: "cozy-67b69",
  storageBucket: "cozy-67b69.appspot.com",
  messagingSenderId: "657817307838",
  appId: "1:657817307838:web:57232ba97ae73dd9"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);




var ModelItems = [
  {
  "name": "dragon_anim",
  "selected": false,
  "loading": LoadingConstants.NONE,
  "icon_img":{uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/item%2Fitem8%2F580b57fcd9996e24bc43c25b.jpg?alt=media&token=04707df7-0858-41b2-9d19-0a11df34bb5f"},
  "obj": {uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FSofa_01.obj?alt=media&token=c9cea19d-ef67-4cb9-a72b-e5fd9517d182"},
  "materials": null,
  "animation":{name:"01", delay:0, loop:true, run:true},
  "scale": [0.2, 0.2, 0.2],
  "position" : [0, 5*POSITION_OFFSET, 10],
  "type" : "OBJ",
  "physics": undefined,
  "ref_pointer": undefined,
  "shadow_width": 60.5,
  "shadow_height": 60.5,
  "spotlight_position_y": 100,
  "lighting_mode": "IBL",
  "resources": [require('../res/sofa/materials.mtl')],
},
{
  "name": "dragon_anim",
  "selected": false,
  "loading": LoadingConstants.NONE,
  "icon_img":{uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/item%2Fitem10%2FSleeper-Sofa-PNG-Image.jpg?alt=media&token=39a4c3f3-2460-4ca5-9c65-019731211319"},
  "obj": {uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FSofa.obj?alt=media&token=4ca9e40d-8c54-4b53-b610-314de89c13be"},
  "materials": null,
  "animation":{name:"01", delay:0, loop:true, run:true},
  "scale": [.2, .2, .2],
  "position" : [0, 5*POSITION_OFFSET, 0],
  "type" : "OBJ",
  "physics": undefined,
  "ref_pointer": undefined,
  "shadow_width": 60.5,
  "shadow_height": 60.5,
  "spotlight_position_y": 100,
  "lighting_mode": "IBL",
  "resources": [require('../res/sofa/materials.mtl')],
},
{
  "name": "dragon_anim",
  "selected": false,
  "loading": LoadingConstants.NONE,
  "icon_img":{uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/item%2Fitem11%2Fsofa_PNG6923.jpg?alt=media&token=022b916f-271f-40dd-ba51-612551a62602"},
  "obj": {uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FWood_Table.obj?alt=media&token=64b13ad7-d7af-4772-ae2d-32cdf729b725"},
  "materials": null,
  "animation":{name:"01", delay:0, loop:true, run:true},
  "scale": [1, 1, 1],
  "position" : [0, 5*POSITION_OFFSET, 0],
  "type" : "OBJ",
  "physics": undefined,
  "ref_pointer": undefined,
  "shadow_width": 60.5,
  "shadow_height": 60.5,
  "spotlight_position_y": 100,
  "lighting_mode": "IBL",
  "resources": [require('../res/sofa/materials.mtl')],
},
{
  "name": "dragon_anim",
  "selected": false,
  "loading": LoadingConstants.NONE,
  "icon_img":{uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/item%2Fitem22%2Fbed-1.jpg?alt=media&token=5e28b1a9-3619-4cff-9081-a3812d736f3c"},
  "obj": {uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FFree%20model%20Drawer(Final)%20.obj?alt=media&token=c073cb9a-9d78-487b-8c44-d56c59c6e312"},
  "materials": null,
  "animation":{name:"01", delay:0, loop:true, run:true},
  "scale": [.2, .2, .2],
  "position" : [0, 5*POSITION_OFFSET, 0],
  "type" : "OBJ",
  "physics": undefined,
  "ref_pointer": undefined,
  "shadow_width": 60.5,
  "shadow_height": 60.5,
  "spotlight_position_y": 100,
  "lighting_mode": "IBL",
  "resources": [require('../res/sofa/materials.mtl')],
},
]
module.exports = {

  getModelArray: function(uid) {
    var ModelItems = []
    let p = new Promise((resolve) => firebase.database().ref('ArArray').child(uid).once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null)
        data = snapshot.val()
        for(var obj in data){
          var ArObj = data[obj]
          ModelItems.push({
            name: ArObj.name,
            selected: false,
            loading: LoadingConstants.NONE,
            icon_img: {uri:ArObj.icon_img},
            obj: {uri:ArObj.obj},
            materials: null,
            animation:{name:"01", delay:0, loop:true, run:true},
            scale: [0.2, 0.2, 0.2],
            position : [0, 5*0.05, 10],
            type : "OBJ",
            physics: undefined,
            ref_pointer: undefined,
            shadow_width: 60.5,
            shadow_height: 60.5,
            spotlight_position_y: 100,
            lighting_mode: "IBL",
        })
        }
        resolve(ModelItems)
      }))
      return p
  }

};

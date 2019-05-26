
import * as LoadingConstants from '../redux/LoadingStateConstants';

var POSITION_OFFSET = .05 // 5 cm

/**
 * Data model for 3D Objects provided as input to ModelItemRenderer. The schema is as follows:
 * name - string key used to identify / retreive this model from this model array
 * selected - Is this model currently selected by the user. Used in identifying which model to execute action from Context Menu (example - remove action)
 * loading - initial loading state. Can toggle to LOADING, LOADED, ERROR when user tries to add the model to the system
 * icon_img - the icon that will be shown on the listview at the bottom for this model
 * obj - path for VRX format obj for this model checked in locally
 * materials - materials used in the VRX model (Currently unused since moving to VRX format)
 * animation - VRX skeletal animations that are baked in to the model definition itself
 * scale - initial scale of the model 
 * position - initial position of the model. Primarily used to configure how close to the ground this model should be rendered (cloud rendered higher, pumpkin renderer lower)
 * type - VRX / OBJ format
 * physics - props for physics body of the model
 * shadow_width - width of the shadow plane to be configured depending on size of the model
 * shadow_height - height of the shadow plane to be configured depending on size of the model
 * spotlight_position_y - height above the object, where the spotlight should be placed at. Different for each model depending on size of the model
 * lighting_model - lighting model for this object
 * resources - all the materials (textures) used in this object, that are checked in locally.
 */
var ModelItems = [
  {
  "name": "dragon_anim",
  "selected": false,
  "loading": LoadingConstants.NONE,
  "icon_img":{uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/item%2Fitem8%2F580b57fcd9996e24bc43c25b.jpg?alt=media&token=04707df7-0858-41b2-9d19-0a11df34bb5f"},
  "obj": {uri:"https://firebasestorage.googleapis.com/v0/b/cozy-67b69.appspot.com/o/models%2FSofa_01.obj?alt=media&token=c9cea19d-ef67-4cb9-a72b-e5fd9517d182"},
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
  getModelArray: function() {
    return ModelItems;
  }
};

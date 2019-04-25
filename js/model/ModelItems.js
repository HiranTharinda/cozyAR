/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 
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
    "icon_img":require("../res/sofaBlue/sofaBlue.png"),
    "obj": require("../res/sofaBlue/sofaBlue.vrx"),
    "materials": null,
    "animation":{name:"02", delay:0, loop:true, run:true},
    "scale": [0.1, 0.1, 0.1],
    "position" : [0, 10*POSITION_OFFSET, 0],
    "type" : "VRX",
    "physics": undefined,
    "ref_pointer": undefined,
    "shadow_width": 10.5,
    "shadow_height": 10.5,
    "spotlight_position_y": 19,
    "lighting_mode": "IBL",
  },
  {
    "name": "icecream_man",
    "selected": false,
    "loading": LoadingConstants.NONE,
    "icon_img":require("../res/sofaCream/sofaCream.png"),
    "obj": require("../res/sofaCream/sofaCream.vrx"),
    "materials": null,
    "animation":{name:"02", delay:0, loop:true, run:true},
    "scale": [0.1, 0.1, 0.1],
    "position" : [0, 0, 0],
    "type" : "VRX",
    "physics": undefined,
    "ref_pointer": undefined,
    "shadow_width": 10.5,
    "shadow_height": 10.5,
    "spotlight_position_y": 9.2,
    "lighting_mode": "IBL",
  },
]
module.exports = {
  getModelArray: function() {
    return ModelItems;
  }
};

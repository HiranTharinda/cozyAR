
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

module.exports = {
  getModelArray: function() {
    console.log(global.ModelItems)
    return global.ModelItems;
  }
};

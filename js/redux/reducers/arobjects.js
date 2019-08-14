
import * as ModelData from  '../../model/ModelItems';
import * as LoadingConstants from '../LoadingStateConstants';


//Reducers for handling state or AR objects in the AR Scene

const uuidv1 = require('uuid/v1');

// Initial state of the app with empty models, portals and showing no emitters / post proccessing effect
const initialState = {
  modelItems: {},
}

// Creates a new model item with the given index from the data model in ModelItems.js
function newModelItem(indexToCreate) {
  return {uuid: uuidv1(), selected: false, loading: LoadingConstants.LOADING, index: indexToCreate};
}

// action to change state of individual ListView items between NONE, LOADING, ERROR, LOADED (path: js/redux/LoadingStateConstants.js)
function changeLoadState(state = {}, action) {
 switch (action.type) {
   case 'CHANGE_MODEL_LOAD_STATE':
     return {
       ...state,
       loading: action.loadState,
     };
   default:
     return state;
 }
}

// Add model at the given index to the AR Scene
function addModelItem(state = {}, action) {
  var model = newModelItem(action.index);
  state[model.uuid] = model;
  return state;
}

// Remove model with given UUID from the AR Scene
function removeModelItem(state = {}, action) {
  state[action.uuid] = null;
  return state;
}

// Change state of individual ListView items between NONE, LOADING, ERROR, LOADED
function modifyLoadState(state = {}, action) {
  if(state[action.uuid] != null || state[action.uuid] != undefined) {
    var model = state[action.uuid];
    var newModel = {...model};
    newModel.loading = action.loadState;
    state[action.uuid] = newModel;
  }
  return state;
}

function arobjects(state = initialState, action) {
  switch (action.type) {

    case 'ADD_MODEL':
      return {
        ...state,
        modelItems: {...addModelItem(state.modelItems, action)},
      }
    case 'REMOVE_MODEL':
      return {
        ...state,
        modelItems: {...removeModelItem(state.modelItems, action)},
      }
    case 'REMOVE_ALL':
      return {
        ...state,
        modelItems:{},
      }
    case 'CHANGE_MODEL_LOAD_STATE':
      return {
        ...state,
        modelItems: {...modifyLoadState(state.modelItems, action)},
      }
    default:
      return state;
  }
}

module.exports = arobjects;



 import *  as UIConstants from '../UIConstants';

 const initialState = {
  currentScreen: UIConstants.SHOW_MAIN_SCREEN,
  listMode: UIConstants.LIST_MODE_MODEL,
  listTitle: UIConstants.LIST_TITLE_MODELS,
  currentItemSelectionIndex: -1,
  currentItemClickState: '',
  arTrackingInitialized: false,
 }

function ui(state = initialState, action) {
  switch (action.type) {
    case 'DISPLAY_UI_SCREEN':
      return {
        ...state,
        currentScreen: action.ui,
      };
    case 'SWITCH_LIST_MODE':
      return {
        ...state,
        listMode: action.listMode,
        listTitle: action.listTitle,
      };
    case 'CHANGE_ITEM_CLICK_STATE':
      return {
        ...state,
        currentItemSelectionIndex: action.index,
        currentItemClickState: action.clickState,
        currentSelectedItemType: action.itemType,
      };
    case 'AR_TRACKING_INITIALIZED':
      return {
        ...state,
        arTrackingInitialized:action.trackingNormal,
      }
    default:
      return state;
  }
}

module.exports = ui;

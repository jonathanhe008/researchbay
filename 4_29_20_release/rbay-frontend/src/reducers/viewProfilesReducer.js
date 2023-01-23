import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  "id": {
    // TODO profile data
  },
};


function viewProfilesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_VIEW_PROFILE: {
      return { ...state, [action.id]: action };
    }
    case ACTIONS.RESET_DATA: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default viewProfilesReducer;

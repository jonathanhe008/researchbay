import * as ACTIONS from '../constants/actionTypes';

// for testing
const INITIAL_STATE = {
  isAuthenticated: false,
  idToken: null,
  username: null,
  is_student: false,
  email: null,
};

// update auth-related state in redux store via actions received from dispatches
function authReducer(state = INITIAL_STATE, action) {
  console.log(action); // print authUser and any errors

  switch (action.type) {
    case ACTIONS.CHECK_TOKEN: {
      return {...action};
    }
    case ACTIONS.SIGN_OUT: {
      return INITIAL_STATE;
    }
    case ACTIONS.SIGN_IN: {
      return {...action};
    }
    case ACTIONS.SIGN_IN_FAILED: {
      return INITIAL_STATE;
    }
    case ACTIONS.SIGN_UP: {
      return {...action};
    }
    case ACTIONS.SIGN_UP_FAILED: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default authReducer;

import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  entries: [],
  isUpToDate: false,
};

function postingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.CREATE_POSTING: {
      return { ...action, isUpToDate: false };
    }
    case ACTIONS.UPDATE_POSTING: {
      return { ...action, isUpToDate: false };
    }
    case ACTIONS.DELETE_POSTING: {
      return { ...action, isUpToDate: false };
    }
    case ACTIONS.GET_USER_POSTINGS: {
      return { ...action, isUpToDate: true };
    }
    case ACTIONS.GET_USER_POSTINGS_FAILED: {
      return INITIAL_STATE;
    }
    case ACTIONS.APPLY_POSTING: {
      return { ...action, isUpToDate: false };
    }
    case ACTIONS.RESET_DATA: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default postingsReducer;

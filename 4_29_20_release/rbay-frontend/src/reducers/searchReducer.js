import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  postings: [],
  profiles: [],
  toUpdate: false,
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_SEARCH: {
      return { ...action, toUpdate: true };
    }
    case ACTIONS.RESET_SEARCH: {
      return INITIAL_STATE;
    }
    case ACTIONS.RESET_DATA: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default searchReducer;

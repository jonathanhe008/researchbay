import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  majors: [],
  years: [],
  // TODO etc
};

function configReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ACTIONS.GET_CONFIG: {
      return { ...action };
    }
    default:
      return state;
  }
}

export default configReducer;

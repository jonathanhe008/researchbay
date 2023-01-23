import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  about_me: "",
  coursework: [],
  experience: [],
  gpa: -1,
  major: "",
  name: "",
  research_interests: [],
  skills: [],
  year: -1,
  picture: null,
  resume: null,
  website: null,
  isUpToDate: false
};

// ref: https://www.youtube.com/watch?v=apg98RIJfJo

function profileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_PROFILE: {
      return {...action, isUpToDate: true };
    }
    case ACTIONS.SET_PROFILE: {
      return {...action, isUpToDate: false };
    }
    case ACTIONS.RESET_DATA: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export default profileReducer;

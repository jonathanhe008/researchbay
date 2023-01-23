import * as ACTIONS from '../constants/actionTypes';

const INITIAL_STATE = {
  count: 0,
  loading: false,
};

function loadingReducer(state = INITIAL_STATE, action) {
  // console.log(action);

  switch (action.type) {
    case ACTIONS.LOADING_START: {
      return { count: state.count + 1, loading: true };
    }
    case ACTIONS.LOADING_END: {
      let newCount = state.count - 1;
      if (newCount === 0) {
        return { count: newCount, loading: false };
      } else {
        return { count: newCount, loading: true};
      }
    }
    default:
      return state;
  }
}

export default loadingReducer;

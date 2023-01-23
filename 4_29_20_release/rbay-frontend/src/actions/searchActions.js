import axios from 'axios';
import * as ACTIONS from '../constants/actionTypes';
import * as TARGETS from '../constants/requestTargets';
import { setDataWithType, handleResponseError } from './actionUtils.js';

export const doResetSearch = () => {
  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.RESET_SEARCH, null));
  }
}

export const doGetSearch = (idToken, searchQuery) => {
  let params = {
    idToken,
    searchQuery,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_SEARCH, { params });
      let data = { ...res.data.data };
      console.log(data);

      let searchPostings = data.postings;
      let searchProfiles = data.profiles;

      dispatch(setDataWithType(ACTIONS.GET_SEARCH, { postings: searchPostings, profiles: searchProfiles }));
    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.RESET_SEARCH, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doGetRecommendations = (idToken) => {
  let params = {
    idToken,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_RECOMMENDATIONS, { params });
      let data = { ...res.data.data };
      console.log(data);

      let recPostings = data.postings;
      let recProfiles = data.profiles;

      dispatch(setDataWithType(ACTIONS.GET_RECOMMENDATIONS, { postings: recPostings, profiles: recProfiles }));
    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.RESET_RECOMMENDATIONS, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

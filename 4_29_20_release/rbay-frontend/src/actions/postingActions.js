import axios from 'axios';
import * as ACTIONS from '../constants/actionTypes';
import * as TARGETS from '../constants/requestTargets';
import { setDataWithType, handleResponseError } from './actionUtils.js';

export const doCreatePosting = (idToken, postingData) => {
  let data = {
    idToken,
    ...postingData,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      await axios.post(TARGETS.CREATE_POSTING, data);
      // getUserPostings to get all postings by setting isUpToDate: false
      dispatch(setDataWithType(ACTIONS.CREATE_POSTING, {}));

    } catch (err) {
      handleResponseError(err, dispatch);
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doDeletePosting = (idToken, postingId) => {
  let params = {
    idToken,
    postingId
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      await axios.delete(TARGETS.DELETE_POSTING, { params });
      // getUserPostings to get all postings by setting isUpToDate: false
      dispatch(setDataWithType(ACTIONS.DELETE_POSTING, {}));

    } catch (err) {
      handleResponseError(err, dispatch);
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doUpdatePosting = (idToken, postingId, postingData) => {
  let data = {
    idToken,
    postingId,
    ...postingData,
  };

  console.log(data);

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      await axios.post(TARGETS.UPDATE_POSTING, data);

      dispatch(setDataWithType(ACTIONS.UPDATE_POSTING, {}));

    } catch (err) {
      handleResponseError(err, dispatch);
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doGetUserPostings = (idToken) => {
  let params = {
    idToken,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_USER_POSTINGS, { params });
      let postingsData = { ...res.data.data };

      dispatch(setDataWithType(ACTIONS.GET_USER_POSTINGS, postingsData));
    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.GET_USER_POSTINGS_FAILED, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doApplyToPosting = (idToken, postingId) => {
  let data = {
    idToken,
    postingId
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      await axios.post(TARGETS.APPLY_POSTING, data);
      // getUserPostings to get all postings by setting isUpToDate: false
      dispatch(setDataWithType(ACTIONS.APPLY_POSTING, {}));

    } catch (err) {
      handleResponseError(err, dispatch);
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

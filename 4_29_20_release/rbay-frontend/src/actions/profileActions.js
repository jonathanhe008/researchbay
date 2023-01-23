import axios from 'axios';
import * as ACTIONS from '../constants/actionTypes';
import * as TARGETS from '../constants/requestTargets';
import { setDataWithType, handleResponseError } from './actionUtils.js';


export const doGetProfile = (idToken) => {

  let params = {
    idToken,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_PROFILE, { params });
      let profileData = { ...res.data.data };

      dispatch(setDataWithType(ACTIONS.GET_PROFILE, profileData));
    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doGetViewProfile = (idToken, profileId) => {
  let params = {
    idToken,
    uid: profileId
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_VIEW_PROFILE, { params });
      let profileData = { ...res.data.data, id: profileId };

      dispatch(setDataWithType(ACTIONS.GET_VIEW_PROFILE, profileData));
    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doSetProfile = (idToken, profileData) => {

  let data = {
    idToken,
    ...profileData
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.post(TARGETS.SET_PROFILE, data);

      let profileData = {
        ...res.data.data,
      };

      dispatch(setDataWithType(ACTIONS.SET_PROFILE, profileData));

    } catch (err) {
      handleResponseError(err, dispatch);
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doSetProfileFile = (idToken, blob, blobType) => {
  let signedUrlReq = {
    type: blobType,
    contentType: blob.type,
    name: blob.name,
    idToken,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let signedUrlRes = await axios.post(TARGETS.GET_SIGNED_URL, signedUrlReq);
      let signedUrl = signedUrlRes.data.data[0];
      console.log(signedUrl);

      await axios.put(signedUrl, blob, {
        headers: {
          'Content-Type': blob.type
        }
      });

    } catch (err) {
      // TODO handle response
      console.log(err);
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

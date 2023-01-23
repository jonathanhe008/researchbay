import axios from 'axios';
import * as ACTIONS from '../constants/actionTypes';
import * as TARGETS from '../constants/requestTargets';
import { setDataWithType } from './actionUtils.js';

export const doCheckToken = () => {
  // check for localStorage idToken
  let localLoginData = localStorage.getItem('localLoginData');
  localLoginData = JSON.parse(localLoginData);
  console.log("Checking for existing local idToken: ", localLoginData);
  if (localLoginData && localLoginData.hasOwnProperty("idToken")) {
    // call cloud function to verify idToken
    let params = {
      idToken: localLoginData["idToken"],
    };

    return async (dispatch) => {
      dispatch(setDataWithType(ACTIONS.LOADING_START, null));

      if (localLoginData.hasOwnProperty("expirationTimestamp")) {
        let currTimeStamp = Math.round(Date.now() / 1000);
        let expirationTimestamp = localLoginData["expirationTimestamp"];
        if (currTimeStamp + 600 < expirationTimestamp) {
          dispatch(setDataWithType(ACTIONS.CHECK_TOKEN, { ...localLoginData, isAuthenticated: true }));
          dispatch(setDataWithType(ACTIONS.LOADING_END, null));
          return;
        }
      }

      try {
        let res = await axios.get(TARGETS.CHECK_TOKEN, { params });
        if (res.status === 200) {
          dispatch(setDataWithType(ACTIONS.CHECK_TOKEN, { ...localLoginData, isAuthenticated: true }));
        } else {
          dispatch(setDataWithType(ACTIONS.SIGN_OUT, null));
          dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
        }

      } catch (err) {
        dispatch(setDataWithType(ACTIONS.SIGN_OUT, err));
        dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
      }

      dispatch(setDataWithType(ACTIONS.LOADING_END, null));
    }

  } else {
    return dispatch => {
      dispatch(setDataWithType(ACTIONS.SIGN_OUT, null));
    }
  }
}

export const doSignOut = () => {
  // using redux-thunk, so async actions
  return async (dispatch) => {
    localStorage.removeItem("localLoginData");
    dispatch(setDataWithType(ACTIONS.SIGN_OUT, null));
    dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
  }
}

export const doSignIn = (email, password) => {

  let data = {
    email,
    password,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.post(TARGETS.SIGN_IN, data);

      let userData = {
        isAuthenticated: true,
        ...res.data.data,
      };

      localStorage.setItem("localLoginData", JSON.stringify(res.data.data));
      dispatch(setDataWithType(ACTIONS.SIGN_IN, userData));

    } catch (err) {
      dispatch(setDataWithType(ACTIONS.SIGN_IN_FAILED, err));
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doSignUp = (username, email, password, is_student) => {

  let data = {
    username,
    email,
    password,
    is_student,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.post(TARGETS.SIGN_UP, data);

      let userData = {
        isAuthenticated: true,
        ...res.data.data,
      };

      localStorage.setItem("localLoginData", JSON.stringify(res.data.data));
      dispatch(setDataWithType(ACTIONS.SIGN_UP, userData));

    } catch (err) {
      dispatch(setDataWithType(ACTIONS.SIGN_UP_FAILED, err));
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doChangePassword = (idToken, password) => {
  let data = {
    idToken,
    password
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.post(TARGETS.CHANGE_PASSWORD, data);
      console.log(res);

    } catch (err) {
      // do nothing
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

export const doDeleteUser = (idToken) => {
  let params = {
    idToken,
  };

  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.delete(TARGETS.DELETE_USER, { params });
      console.log(res);

      dispatch(setDataWithType(ACTIONS.SIGN_OUT, null));
      dispatch(setDataWithType(ACTIONS.RESET_DATA, null));
    } catch (err) {
      // do nothing
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

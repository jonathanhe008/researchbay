import axios from 'axios';
import * as ACTIONS from '../constants/actionTypes';
import * as TARGETS from '../constants/requestTargets';
import { setDataWithType } from './actionUtils.js';

export const doGetConfig = () => {
  return async (dispatch) => {
    dispatch(setDataWithType(ACTIONS.LOADING_START, null));

    try {
      let res = await axios.get(TARGETS.GET_CONFIG);

      let configData = { ...res.data.data };
      dispatch(setDataWithType(ACTIONS.GET_CONFIG,configData));

    } catch (err) {
      console.log(err);
      dispatch(setDataWithType(ACTIONS.GET_CONFIG, {}));
    }

    dispatch(setDataWithType(ACTIONS.LOADING_END, null));
  }
}

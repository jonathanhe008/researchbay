import * as ACTIONS from '../constants/actionTypes';

export function setDataWithType(type, data) {
  return {
    type,
    ...data,
  };
}

export function handleResponseError(err, dispatch) {
  console.log(err);
  if (err.hasOwnProperty("response") && !(err.response == null)) {
    if (err.response.status === 400) {
      dispatch(setDataWithType(ACTIONS.SIGN_OUT, null));
    }
  }
}

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import recommendationsReducer from './recommendationsReducer';
import postingsReducer from './postingsReducer';
import loadingReducer from './loadingReducer';
import configReducer from './configReducer';
import viewProfilesReducer from './viewProfilesReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';

// React Redux's connect higher-order component is used to marry React with Redux.
// We can tell what state of Redux should be mapped to props for the React component in the mapStateToProps function,
// and we can pass dispatchable Redux actions as functions to the React component as props with the mapDispatchToProps function

const rootReducer = combineReducers({
  authState: authReducer,
  profileState: profileReducer,
  recommendationsState: recommendationsReducer,
  postingsState: postingsReducer,
  loadingState: loadingReducer,
  configState: configReducer,
  viewProfilesState: viewProfilesReducer,
  searchState: searchReducer,
}); // maybe add reducer/state for just errors to show to user?

export default rootReducer;

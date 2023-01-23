import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { doSignOut } from '../../actions/authActions';

import * as ROUTES from '../../constants/routes';

function SignOut(props) {
  props.doSignOut();
  return <div />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSignOut: () => { dispatch(doSignOut()); }
  }
}

export default connect(null, mapDispatchToProps)(SignOut);

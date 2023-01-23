import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ROUTES from '../../constants/routes';

function ProfessorPrivateRouteBase(props) {
  // console.log("professor route");
  if (props.auth.isAuthenticated) {
    if (!props.auth.is_student) {
      return <Route {...props} />;
    } else {
      return <Redirect to={ROUTES.EXPLORE} />;
    }
  } else {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
}

function PrivateRouteBase(props) {
  // console.log("private route");
  return props.auth.isAuthenticated ? <Route {...props} /> : <Redirect to={ROUTES.SIGN_IN} />;
}

function PublicRouteBase(props) {
  // console.log("public route");
  return props.auth.isAuthenticated ? <Redirect to={ROUTES.EXPLORE} /> : <Route {...props} />;
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  }
}

export const ProfessorPrivateRoute = connect(mapStateToProps)(ProfessorPrivateRouteBase);
export const PrivateRoute = connect(mapStateToProps)(PrivateRouteBase);
export const PublicRoute = connect(mapStateToProps)(PublicRouteBase);

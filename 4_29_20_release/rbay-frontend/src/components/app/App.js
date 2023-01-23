import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import LandingPage from '../layout/LandingPage';
import SignUpPage from '../auth/SignUpPage';
import SignInPage from '../auth/SignInPage';
import DiscoverPage from '../discover/DiscoverPage';
import ProfilePage from '../profile/ProfilePage';
import ViewOnlyProfilePage from '../profile/ViewOnlyProfilePage';
import PostingPage from '../posting/PostingPage';
import AccountPage from '../auth/AccountPage';

import SignOut from '../auth/SignOut';

import { PublicRoute, PrivateRoute, ProfessorPrivateRoute } from '../auth/ProtectedRoutes';
import * as ROUTES from '../../constants/routes';
import { globalStyles, buttonTheme } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  app: {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplateRows: "[top-border] 80px [content-start] auto [content-end] 64px [bottom-border]",
    gridTemplateColumns: "[left-border] auto [right-border]",
  },
  appHeader: {
    height: "100%",
    width: "100%",
    gridRow: "top-border / content-start",
    gridColumn: "left-border / right-border",
  },
  appMain: {
    height: "100%",
    width: "100%",
    gridRow: "content-start / content-end",
    gridColumn: "left-border / right-border",
  },
  appFooter: {
    height: "100%",
    width: "100%",
    gridRow: "content-end / bottom-border",
    gridColumn: "left-border / right-border",
  },
  space: {
    height: "300px",
    minHeight: "300px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  return (
    <BrowserRouter>
      <ThemeProvider theme={buttonTheme}>
        <div className={classes.app}>
          <div className={classes.appHeader}>
            <Navbar />
          </div>
          <div className={globalClasses.secondaryColor}>
            <div className={classes.appMain}>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <PublicRoute path={ROUTES.SIGN_UP} component={SignUpPage} />
                <PublicRoute path={ROUTES.SIGN_IN} component={SignInPage} />
                <PrivateRoute path={ROUTES.EXPLORE} component={DiscoverPage} />
                <PrivateRoute path={ROUTES.PROFILE_ID} component={ViewOnlyProfilePage} />
                <PrivateRoute exact={true} path={ROUTES.PROFILE} component={ProfilePage} />
                <PrivateRoute path={ROUTES.POSTING} component={PostingPage} />
                <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
                <PrivateRoute path={ROUTES.SIGN_OUT} component={SignOut} />
              </Switch>
            </div>
            <Backdrop className={classes.backdrop} open={props.loading.loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
          <div className={classes.appFooter}>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loadingState,
  }
};

export default connect(mapStateToProps)(App);

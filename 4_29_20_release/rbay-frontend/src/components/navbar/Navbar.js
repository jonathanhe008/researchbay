import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import NavbarTitle from './NavbarTitle';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import { globalStyles } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  navBar: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  toolBar: {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    padding: theme.spacing(0, 2),
  },
}));

function Navbar(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  let links = props.isAuthenticated ? (
    <SignedInLinks />
  ) : (
    <SignedOutLinks />
  );

  return (
    <AppBar color="primary" position="static" classes={{
      root: classes.navBar,
      colorPrimary: globalClasses.inversePrimaryColor
    }}>
      <Toolbar className={classes.toolBar} disableGutters={true}>
        <NavbarTitle />
        <div className={classes.grow} />
        {links}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  ...state.authState,
});

export default connect(mapStateToProps)(Navbar);

import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  landingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  landingCenter: {
    "& > *": {
      margin: 0,
      padding: 0,
    }
  },
  landingTitle: {
    color: "#AC3B61", // TODO fix?
    fontSize: "500%",
  },
  buttons: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 2, 0, 0)
    },
    justifyContent: "center",
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  // <h1 className={classes.landingTitle}>Research Bay</h1>
  // <h3>A Web Platform for Efficiently Connecting Professors and Students</h3>

  return (
    <div className={classes.landingContainer}>
      <div className={classes.landingCenter} >
        <div>
          <img src="rbay_logo_beige.png" alt="logo" />
        </div>
        <div className={classes.buttons}>
          <Button
            target="_blank"
            size="large"
            href="https://github.com/DSC-UIUC/research-bay"
            variant="contained"
            color="secondary"
            classes={{ label: globalClasses.button }}>
              Learn More
          </Button>
          <Link to={ROUTES.SIGN_IN} className={globalClasses.link}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              classes={{ label: globalClasses.button }}>
                Sign In
            </Button>
          </Link>
          <Link to={ROUTES.SIGN_UP} className={globalClasses.link}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              classes={{ label: globalClasses.button }}>
                Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

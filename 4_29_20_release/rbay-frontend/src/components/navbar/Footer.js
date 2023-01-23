import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import WebIcon from '@material-ui/icons/Web';
import EmailIcon from '@material-ui/icons/Email';

import { globalStyles } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  footer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  toolBar: {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    padding: theme.spacing(0, 2),
  }
}));

function Footer() {
  const globalClasses = globalStyles();
  const classes = useStyles();

  return (
    <AppBar color="primary" position="static" classes={{
      root: classes.footer,
      colorPrimary: globalClasses.inversePrimaryColor
    }}>
      <Toolbar className={classes.toolBar} disableGutters={true}>
        <Typography variant="body2" className={classes.grow}>
          Created by Developer Student Club at UIUC
        </Typography>

        <IconButton href="https://developers.google.com/community/dsc" color="inherit" target="_blank">
          <InfoIcon />
        </IconButton>
        <IconButton href="https://sites.google.com/illinois.edu/dsc-uiuc/home" color="inherit" target="_blank">
          <WebIcon />
        </IconButton>
        <IconButton href="mailto:dscuiuc2@gmail.com" color="inherit" target="_blank">
          <EmailIcon />
        </IconButton>
        <IconButton href="https://github.com/DSC-UIUC" color="inherit" target="_blank">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

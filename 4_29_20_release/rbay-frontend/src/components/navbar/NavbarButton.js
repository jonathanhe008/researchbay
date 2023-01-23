import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    flexDirection: 'column',
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textTransform: 'none'
  }
}));

function NavbarButton(props) {
  const classes = useStyles();

  return (
    <Button
      classes={{ root: classes.button, label: classes.label }}
      color="inherit">
        {props.icon}
        {props.text}
    </Button>
  );
}

export default NavbarButton;

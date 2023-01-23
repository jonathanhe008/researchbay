import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';
import { doSetProfile } from '../../actions/profileActions';

const useStyles = makeStyles(theme => ({
  aboutMeContent: {
    padding: theme.spacing(2),
  },
  aboutMeFieldContainer: {
    display: "flex",
    flexWrap: 'wrap',
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
    }
  },
  aboutMeField: {
    width: "100%",
    display: "flex",
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  }
}));

function EditAboutMeModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [aboutMe, setAboutMe] = React.useState("");

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let profileData = {
      about_me: aboutMe
    };

    props.doSetProfile(props.auth.idToken, profileData);
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
        Edit
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Edit bio</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.aboutMeContent}>
          <div className={classes.aboutMeFieldContainer}>
            <div className={classes.aboutMeField}>
              <TextField fullWidth multiline rows={5} label="Bio" variant="outlined" onChange={handleAboutMeChange} defaultValue={props.profile.about_me} />
            </div>
          </div>
          <div className={classes.aboutMeField}>
            <Button onClick={handleSave} variant="contained" color="secondary">
              Save
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    profile: state.profileState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSetProfile: (idToken, profileData) => { dispatch(doSetProfile(idToken, profileData)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAboutMeModal);

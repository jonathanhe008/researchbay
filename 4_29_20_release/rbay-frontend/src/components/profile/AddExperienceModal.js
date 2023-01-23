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
  experienceContent: {
    padding: theme.spacing(2),
  },
  experienceFieldContainer: {
    display: "flex",
    flexWrap: 'wrap',
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
    }
  },
  experienceField: {
    display: "flex",
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
}));

function AddExperienceModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [company, setCompany] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCompany("");
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const handleSave = () => {
    let newExperience = [...props.profile.experience];
    newExperience.push({ company, title, description });

    let profileData = {
      experience: newExperience
    };

    console.log(profileData);

    props.doSetProfile(props.auth.idToken, profileData);
    setOpen(false);
  }

  let isInvalid = company.length < 2 || title.length < 2 || description.length < 2;

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
        Add
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Add Experience</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.experienceContent}>
          <div className={classes.experienceFieldContainer}>
            <div className={classes.experienceField}>
              <TextField fullWidth label="Company" variant="outlined" onChange={handleCompanyChange} defaultValue="" />
            </div>
            <div className={classes.experienceField}>
              <TextField fullWidth label="Title" variant="outlined" onChange={handleTitleChange} defaultValue="" />
            </div>
            <div className={classes.experienceField}>
              <TextField fullWidth multiline rows={5} label="Description" variant="outlined" onChange={handleDescriptionChange} defaultValue="" />
            </div>
          </div>
          <div className={classes.experienceField}>
            <Button disabled={isInvalid} onClick={handleSave} variant="contained" color="secondary">
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExperienceModal);

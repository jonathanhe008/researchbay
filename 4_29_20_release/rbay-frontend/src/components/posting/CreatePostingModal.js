import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';
import { doCreatePosting } from '../../actions/postingActions';

const useStyles = makeStyles(theme => ({
  postingContent: {
    padding: theme.spacing(2),
  },
  postingFieldContainer: {
    display: "flex",
    flexWrap: 'wrap',
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
    }
  },
  postingField: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  extendFieldDiv: {
    width: "100%",
  }
}));

function CreatePostingModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [labName, setLabName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState("");

  const handleLabNameChange = (event) => {
    setLabName(event.target.value);
  }

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLabName("");
    setPosition("");
    setDescription("");
    setTags("");
    setOpen(false);
  };

  const handleSave = () => {
    let postingData = {
      tags: tags.split(","),
      title: position,
      lab_name: labName,
      description: description,
      requirements: {},
      professor_name: props.profile.name,
    };

    props.doCreatePosting(props.auth.idToken, postingData);
    setOpen(false);
  }

  let isInvalid = position.length < 2 || labName.length < 2 || description.length < 2;

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="default" classes={{ label: globalClasses.button }}>
        Create
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Create New Posting</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.postingContent}>
          <div className={classes.postingFieldContainer}>
            <div className={classes.postingField}>
              <TextField fullWidth label="Lab/Group Name" variant="outlined" onChange={handleLabNameChange} defaultValue="" />
            </div>
            <div className={classes.postingField}>
              <TextField disabled={true} fullWidth label="Professor Name" variant="outlined" defaultValue={props.profile.name} />
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth label="Position" variant="outlined" onChange={handlePositionChange} defaultValue="" />
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth multiline rows={5} label="Description" variant="outlined" onChange={handleDescriptionChange} defaultValue="" />
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth label="Tags" variant="outlined" onChange={handleTagsChange} defaultValue="" helperText="Please enter comma-separated values" />
            </div>
            <div className={classes.postingField}>
              <div className={classes.extendFieldDiv}>
                *Application requirements and custom pictures will be available soon
              </div>
            </div>
            <div className={classes.postingField}>
              <Button disabled={isInvalid} onClick={handleSave} variant="contained" color="secondary" >
                Save
              </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel
              </Button>
            </div>
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
    doCreatePosting: (idToken, postingData) => { dispatch(doCreatePosting(idToken, postingData)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostingModal);

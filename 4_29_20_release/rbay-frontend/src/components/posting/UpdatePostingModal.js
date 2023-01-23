import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import { doUpdatePosting } from '../../actions/postingActions';

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


function UpdatePostingModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [labName, setLabName] = React.useState(props.lab_name);
  const [position, setPosition] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [isOpen, setIsOpen] = React.useState(props.is_open);
  const [tags, setTags] = React.useState(props.tags);

  const handleLabNameChange = (event) => {
    setLabName(event.target.value);
  }

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleIsOpenChange = (event) => {
    setIsOpen(event.target.value);
  }

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLabName(props.lab_name);
    setPosition(props.title);
    setDescription(props.description);
    setIsOpen(props.is_open);
    setTags(props.tags);
    setOpen(false);
  };

  const handleSave = () => {
    let postingData = {
      title: position,
      lab_name: labName,
      description: description,
      requirements: {},
      is_open: isOpen,
      tags: tags,
    };

    console.log(postingData);

    props.doUpdatePosting(props.auth.idToken, props.id, postingData);
    setOpen(false);
  }

  let isInvalid = position.length < 2 || labName.length < 2 || description.length < 2;

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
        Edit
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Update Posting</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.postingContent}>
          <div className={classes.postingFieldContainer}>
            <div className={classes.postingField}>
              <TextField fullWidth label="Lab/Group Name" variant="outlined" onChange={handleLabNameChange} defaultValue={props.lab_name} />
            </div>
            <div className={classes.postingField}>
              <TextField disabled={true} fullWidth label="Professor Name" variant="outlined" defaultValue={props.professor_name} />
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth label="Position" variant="outlined" onChange={handlePositionChange} defaultValue={props.title} />
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth multiline rows={5} label="Description" variant="outlined" onChange={handleDescriptionChange} defaultValue={props.description} />
            </div>
            <div className={classes.postingField}>
              <div className={classes.extendFieldDiv}>
                <Select
                  variant="outlined"
                  fullWidth
                  value={props.is_open}
                  onChange={handleIsOpenChange}
                >
                  <MenuItem value={true}>Open</MenuItem>
                  <MenuItem value={false}>Closed</MenuItem>
                </Select>
              </div>
            </div>
            <div className={classes.postingField}>
              <TextField fullWidth label="Tags" variant="outlined" onChange={handleTagsChange} defaultValue={props.tags} helperText="Please enter comma-separated values" />
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdatePosting: (idToken, postingId, postingData) => { dispatch(doUpdatePosting(idToken, postingId, postingData)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePostingModal);

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';
import { doSetProfile, doSetProfileFile } from '../../actions/profileActions';

const useStyles = makeStyles(theme => ({
  profileContent: {
    padding: theme.spacing(2),
  },
  profileFieldContainer: {
    display: "flex",
    flexWrap: 'wrap',
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
    }
  },
  profileField: {
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

function SetProfileModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  let defaultMajor = props.auth.is_student ? props.major : props.department;

  const [name, setName] = React.useState(props.name);
  const [gpa, setGPA] = React.useState(props.gpa);
  const [major, setMajor] = React.useState(defaultMajor);
  const [year, setYear] = React.useState(props.year);
  const [website, setWebsite] = React.useState(props.website);
  const [resume, setResume] = React.useState(null);
  const [picture, setPicture] = React.useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleGPAChange = (event) => {
    let num_val = 0.00;
    try {
      num_val = parseFloat(event.target.value);
      if (num_val < 0) {
        num_val = 0.00;
      }

      num_val = parseFloat(num_val.toFixed(2));
    } catch (err) {
      num_val = 0.00;
    }

    console.log(num_val)
    setGPA(num_val);
  }

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleResumeUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handlePictureUpload = (event) => {
    setPicture(event.target.files[0]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setResume(null);
    setPicture(null);
    setName(props.name);
    setGPA(props.gpa);
    setMajor(defaultMajor);
    setYear(props.year);
    setWebsite(props.website);
    setOpen(false);
  };

  const handleSave = () => {
    let profileData = {
      name, gpa, year, website
    };

    if (props.auth.is_student) {
      profileData.major = major;
    } else {
      profileData.department = major;
    }

    props.doSetProfile(props.auth.idToken, profileData);
    if (resume !== null) {
      props.doSetProfileFile(props.auth.idToken, resume, "resume");
    }

    if (picture !== null) {
      props.doSetProfileFile(props.auth.idToken, picture, "picture");
    }

    setOpen(false);
  }

  let isStudentInvalid = name == null || gpa == null || major == null || year == null || name.length < 2 || gpa < 0 || major.length < 2 || year < 1;
  let isProfessorInvalid = name == null || major == null || name.length < 2 || major.length < 2;
  let isInvalid = props.auth.is_student ? isStudentInvalid : isProfessorInvalid;

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="default" classes={{ label: globalClasses.button }}>
        Edit
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Update your profile</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.profileContent}>
          <div className={classes.profileFieldContainer}>
            <div className={classes.profileField}>
              <TextField fullWidth label="Name" variant="outlined" onChange={handleNameChange} defaultValue={props.name} />
            </div>
            {props.auth.is_student && <div className={classes.profileField}>
              <div className={classes.extendFieldDiv}>
                <Select
                  variant="outlined"
                  displayEmpty
                  fullWidth
                  value={year}
                  onChange={handleYearChange}
                >
                  <MenuItem value={0} disabled>Year</MenuItem>
                  {props.config.years.map((val, idx) => {
                    return <MenuItem key={idx} value={idx + 1}>{val}</MenuItem>
                  })}
                </Select>
              </div>
              <div>
                <TextField label="GPA (x.xx)" variant="outlined" onChange={handleGPAChange} defaultValue={props.gpa} />
              </div>
            </div>}
            <div className={classes.profileField}>
              <div className={classes.extendFieldDiv}>
                 <Select
                   variant="outlined"
                   displayEmpty
                   fullWidth
                   value={major}
                   onChange={handleMajorChange}
                 >
                  <MenuItem value="" disabled>Major</MenuItem>
                  {props.config.majors.map((val, idx) => {
                    return <MenuItem key={idx} value={val}>{val}</MenuItem>
                  })}
                </Select>
              </div>
            </div>
            <div className={classes.profileField}>
              <TextField fullWidth label="Website Link" variant="outlined" onChange={handleWebsiteChange} defaultValue={props.website} />
            </div>
            <div className={classes.profileField}>
              <div>
                <Button variant="contained" color="secondary" component="label" startIcon={<PictureAsPdfIcon />}>
                  Upload Resume
                  <input type="file" style={{ display: "none" }} accept=".pdf,.docx,.doc" onChange={handleResumeUpload} />
                </Button>
                <Typography variant="body2">{resume !== null ? resume.name : null}</Typography>
              </div>
              <div>
                <Button variant="contained" color="secondary" component="label" startIcon={<PhotoCameraIcon />}>
                  Upload Profile Picture
                  <input type="file" style={{ display: "none" }} accept="image/*" onChange={handlePictureUpload} />
                </Button>
                <Typography variant="body2">{picture !== null ? picture.name : null}</Typography>
              </div>
            </div>
            <div className={classes.profileField}>
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
    config: state.configState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSetProfile: (idToken, profileData) => { dispatch(doSetProfile(idToken, profileData)); },
    doSetProfileFile: (idToken, blob, blobType) => { dispatch(doSetProfileFile(idToken, blob, blobType)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetProfileModal);

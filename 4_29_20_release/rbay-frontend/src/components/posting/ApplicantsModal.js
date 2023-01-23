import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import { doUpdatePosting } from '../../actions/postingActions';

const useStyles = makeStyles(theme => ({
  applicantContent: {
    padding: theme.spacing(2),
  },
  applicantFieldContainer: {
    display: "flex",
    flexWrap: 'wrap',
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
    }
  },
  applicantField: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  extendFieldDiv: {
    width: "100%",
  },
}));

function ApplicantsModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  let defaultChecked = props.applicants.map(val => val.is_selected);
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleToggle = (idx) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setChecked(defaultChecked);
    setOpen(false);
  };

  const handleSave = () => {
    let newApplicants = props.applicants.map((val, idx) => {
      let { selected, id } = val;
      return { id: id, is_selected: checked[idx] }; // new selected if changed
    });

    let postingData = {
      applicants: newApplicants,
    }

    props.doUpdatePosting(props.auth.idToken, props.id, postingData);
    setOpen(false);
  }

  return (
    <div>
      <Button fullWidth onClick={handleClickOpen} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
        Applicants
      </Button>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>View and select applicants</DialogTitle>
        <Divider variant="fullWidth" style={{ height: "1.5px" }} />
        <div className={classes.applicantContent}>
          <div className={classes.applicantFieldContainer}>
            <div className={classes.applicantField}>
              <List className={classes.extendFieldDiv}>
                {props.applicants.map((val, idx) => {
                  let year = "";
                  if (val.year <= 1) {
                    year = "Freshman";
                  } else if (val.year === 2) {
                    year = "Sophomore";
                  } else if (val.year === 3) {
                    year = "Junior";
                  } else if (val.year === 4) {
                    year = "Senior";
                  } else if (val.year >= 4) {
                    year = "Graduate";
                  }

                  let secondaryText = year + " in " + val.major;

                  return (
                    <ListItem key={idx} className={classes.extendFieldDiv} button onClick={() => { handleToggle(idx); }}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked[idx]}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': "checkbox" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={val.name} secondary={secondaryText} />
                      <ListItemSecondaryAction>
                        <Tooltip title="View Profile">
                          <IconButton edge="end" aria-label="profile" component={Link} to={"/profile/" + val.id}>
                            <DashboardIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <div className={classes.applicantField}>
              <Button onClick={handleSave} variant="contained" color="secondary">
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsModal);

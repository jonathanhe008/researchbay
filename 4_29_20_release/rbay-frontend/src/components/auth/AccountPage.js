import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import { doChangePassword, doDeleteUser } from '../../actions/authActions';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "[line1] 15% [line2] 14% [line3] 2%[ line4] auto [line5] 15%",
    gridTemplateRows: "[row1] 80px [row2] 30% [row3] auto [row4]",
  },
  mainTitle: {
    gridColumn: "line2 / line4",
    gridRow: "row1 / row2",
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    margin: 0,
    padding: 0,
  },
  mainContent: {
    gridColumn: "line2 / line5",
    gridRow: "row2 / row4",
  },
  cardContainer: {
    padding: theme.spacing(2),
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: "1"
  },
  accountActions: {
    margin: theme.spacing(2, 0, 2, 0),
    "& > *": {
      margin: theme.spacing(0, 0, 2, 0),
    }
  },
  accountActionCol: {
    "& > *": {
      margin: theme.spacing(1, 0, 1, 0),
    }
  }
}));

function AccountPage(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [newPassword, setNewPassword] = React.useState("");
  const [deleteUsername, setDeleteUsername] = React.useState("");

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  const submitPasswordChange = () => {
    props.doChangePassword(props.auth.idToken, newPassword);
  }

  const handleDeleteUserChange = (event) => {
    setDeleteUsername(event.target.value);
  }

  const submitDeleteUser = () => {
    props.doDeleteUser(props.auth.idToken);
  }

  let newPasswordIsInvalid = newPassword == null || newPassword.length === 0;
  let deleteIsInvalid = !(props.auth.username === deleteUsername);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainTitle}>
        <h1 className={classes.titleText}>
          Account
        </h1>
      </div>

      <div className={classes.mainContent}>
        <Card className={classes.cardContainer}>
          <div className={classes.cardHeader}>
            <div>
              <Typography variant="h5">
                Details and Actions
              </Typography>
            </div>
            <div className={classes.grow} />
          </div>
          <div>
            <Typography variant="body1">
              Username: {props.auth.username}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              Email: {props.auth.email}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              User Type: {props.auth.is_student ? "Student" : "Professor"}
            </Typography>
          </div>
          <div className={classes.accountActions}>
            <div className={classes.accountActionCol}>
              <div>
                <TextField size="small" label="New Password" variant="outlined" onChange={handlePasswordChange} />
              </div>
              <div>
                <Button disabled={newPasswordIsInvalid} onClick={submitPasswordChange} variant="contained" color="secondary" classes={{ label: globalClasses.button }}>
                  Change Password
                </Button>
              </div>
            </div>
            <div className={classes.accountActionCol}>
              <div>
                <TextField size="small" label="Type in your username" variant="outlined" onChange={handleDeleteUserChange} />
              </div>
              <div>
                <Button disabled={deleteIsInvalid} onClick={submitDeleteUser} variant="contained" color="secondary" classes={{ label: globalClasses.button }}>
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
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
    doChangePassword: (idToken, password) => { dispatch(doChangePassword(idToken, password)); },
    doDeleteUser: (idToken) => { dispatch(doDeleteUser(idToken)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

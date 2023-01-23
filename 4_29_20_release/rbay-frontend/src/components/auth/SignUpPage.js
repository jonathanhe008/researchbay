import React from 'react'
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { doSignUp } from '../../actions/authActions';
import { loginStyles } from '../style/loginStyles';

function SignUpPage(props) {
  const loginClasses = loginStyles();
  const [isInvalid, setIsInvalid] = React.useState(true);
  const [formVal, setFormVal] = React.useState({
    email: "",
    password: "",
    username: "",
    isProfessor: false,
  });

  React.useEffect(() => {
    setIsInvalid(formVal.email === "" || formVal.password === "" || formVal.username === "");
  }, [formVal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.doSignUp(formVal.username, formVal.email, formVal.password, !formVal.isProfessor);
  }

  const handleChange = (e) => {
    let oldFormVal = { ...formVal };
    oldFormVal[e.target.name] = e.target.value;
    setFormVal(oldFormVal);
  }

  const handleCheckboxChange = () => {
    setFormVal({ ...formVal, isProfessor: !formVal.isProfessor });
  }

  return (
    <div className={loginClasses.signInContainer}>
      <div className={loginClasses.signIn}>
        <form onSubmit={handleSubmit}>
          <h2 className={loginClasses.signInPageTitle}>Sign Up</h2>
          <TextField
            name="username"
            value={formVal.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            className={loginClasses.textField}
            type="username"
          />
          <TextField
            name="email"
            value={formVal.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            className={loginClasses.textField}
            type="email"
          />
          <TextField
            name="password"
            value={formVal.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            className={loginClasses.textField}
            type="password"
          />
          <div className={loginClasses.signInPageElem}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isInvalid}
            >
              Sign Up
            </Button>
          </div>
          <div className={loginClasses.signInPageElem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formVal.isProfessor}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Are you a professor?"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSignUp: (username, email, pasword, isProfessor) => dispatch(doSignUp(username, email, pasword, isProfessor))
  }
}

export default connect(null, mapDispatchToProps)(SignUpPage);

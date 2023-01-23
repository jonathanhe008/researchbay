import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { doSignIn } from '../../actions/authActions';
import * as ROUTES from '../../constants/routes';

import { loginStyles } from '../style/loginStyles';

function SignInPage(props) {
  const loginClasses = loginStyles();

  const [isInvalid, setIsInvalid] = React.useState(true);
  const [formVal, setFormVal] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setIsInvalid(formVal.email === "" || formVal.password === "");
  }, [formVal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.doSignIn(formVal.email, formVal.password);
  }

  const handleChange = (e) => {
    let oldFormVal = { ...formVal };
    oldFormVal[e.target.name] = e.target.value;
    setFormVal(oldFormVal);
  }

  return (
    <div className={loginClasses.signInContainer}>
      <div className={loginClasses.signIn}>
        <form onSubmit={handleSubmit}>
          <h2 className={loginClasses.signInPageTitle}>Sign In</h2>
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
              Sign In
            </Button>
          </div>
          <div className={loginClasses.signInPageElem}>
            <Link to={ROUTES.SIGN_UP} href="/signup">
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSignIn: (email, password) => { dispatch(doSignIn(email, password)); }
  }
}

export default connect(null, mapDispatchToProps)(SignInPage);

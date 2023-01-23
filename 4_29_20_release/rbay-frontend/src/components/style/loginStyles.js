import { makeStyles } from '@material-ui/core/styles';

export const loginStyles = makeStyles(theme => ({
  signInContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
    minHeight: "500px"
  },
  signIn: {
    maxWidth: "350px",
  },
  signInPageTitle: {
    margin: 0,
    padding: 0,
  },
  signInPageElem: {
    margin: theme.spacing(1, 0, 0, 0),
  },
  textField: {
    background: "white",
    borderRadius: "4px",
  }
}));

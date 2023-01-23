import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

// $primary-color: #AC3B61;
// $secondary-color: #123C69 or #374785s
// $gray-color: #BAB2B5;
// $dark-bg-color: #EDC7B7;
// $light-bg-color: #EEE2DC;

export const globalStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  primaryColor: {
    backgroundColor: "#EEE2DC",
    color: "#AC3B61",
  },
  secondaryColor: {
    backgroundColor: "#EEE2DC",
    background: "#EEE2DC",
    color: "#374785",
  },
  inversePrimaryColor: {
    backgroundColor: "#AC3B61",
    color: "#EEE2DC",
  },
  inverseSecondaryColor: {
    backgroundColor: "#374785",
    color: "#EEE2DC",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  button: {
    textTransform: 'none',
  },
  titleText: {
    margin: 0,
    padding: 0,
  },
}));

export const buttonTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the rule
      containedSecondary: {
        // Some CSS
        color: '#EEE2DC',
        backgroundColor: "#374785",
        "&:hover": {
          backgroundColor: "#AC3B61"
        },
        textTransform: "none",
      },
      contained: {
        color: '#374785',
        backgroundColor: "#EEE2DC",
        textTransform: "none",
      }
    },
  },
});

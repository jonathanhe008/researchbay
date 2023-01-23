import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  profilePreviewCard: {
    padding: theme.spacing(2),
    display: "flex",
  },
  profilePreviewCardImage: {
    minWidth: "100px",
    minHeight: "100px",
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    objectFit: "cover",
  },
  profilePreviewCardContent: {
    margin: theme.spacing(0, 2, 0, 0),
    "& > *": {
      margin: theme.spacing(0, 0, 1, 0),
    }
  },
  profilePreviewCardContentLeft: {
    maxWidth: "100px",
    margin: theme.spacing(0, 2, 0, 0),
    "& > *": {
      margin: theme.spacing(0, 0, 1, 0),
    }
  },
  profilePreviewCardContentRight: {
    "& > *": {
      margin: theme.spacing(0, 0, 1, 0),
    }
  },
  grow: {
    flexGrow: 1
  },
  buttonContainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 0, 0, 1),
    },
  }
}));


export function StudentCard(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  let { picture, ...restOfProps } = props;
  if (picture == null || picture == undefined || picture === "") {
    picture = "https://firebasestorage.googleapis.com/v0/b/research-bay.appspot.com/o/picture%2FTYe15CpIpyLWuYH2rF1ThY9RDyz1_uiuc_logo_bg.png?alt=media&token=TYe15CpIpyLWuYH2rF1ThY9RDyz1";
  }

  let { id, name, major, year, about_me} = restOfProps;

  let class_standing = "";
  if (year <= 1) {
    class_standing = "Freshman";
  } else if (year === 2) {
    class_standing = "Sophomore";
  } else if (year === 3) {
    class_standing = "Junior";
  } else if (year === 4) {
    class_standing = "Senior";
  } else if (year >= 4) {
    class_standing = "Graduate";
  }

  let shortDescription = about_me;

  if (about_me.length > 250) {
    shortDescription = about_me.slice(0, 250) + "...";
  }

  return ( // TODO apply
    <Card className={classes.profilePreviewCard}>
      <div className={classes.profilePreviewCardContentLeft}>
        <img className={classes.profilePreviewCardImage} alt="" src={picture} />
        <Button fullWidth component={Link} to={"/profile/" + id} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
          Profile Page
        </Button>
      </div>
      <div className={classes.profilePreviewCardContent}>
        <div>
          <Typography variant="h5">
            {name}
          </Typography>
          <Typography variant="h6">
            {major}
          </Typography>
          <Typography variant="body1">
            {class_standing}
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            {shortDescription}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

export function ProfessorCard(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  let { picture, ...restOfProps } = props;
  if (picture == null || picture == undefined || picture === "") {
    picture = "https://firebasestorage.googleapis.com/v0/b/research-bay.appspot.com/o/picture%2FTYe15CpIpyLWuYH2rF1ThY9RDyz1_uiuc_logo_bg.png?alt=media&token=TYe15CpIpyLWuYH2rF1ThY9RDyz1";
  }

  let { id, name, department, about_me} = restOfProps;

  let shortDescription = about_me;

  if (about_me.length > 250) {
    shortDescription = about_me.slice(0, 250) + "...";
  }

  return ( // TODO apply
    <Card className={classes.profilePreviewCard}>
      <div className={classes.profilePreviewCardContentLeft}>
        <div className={classes.profilePreviewCardContent}>
          <img className={classes.profilePreviewCardImage} alt="" src={picture} />
          <Button fullWidth component={Link} to={"/profile/" + id} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
            Profile Page
          </Button>
        </div>
      </div>
      <div className={classes.profilePreviewCardContent}>
        <div>
          <Typography variant="h5">
            {name}
          </Typography>
          <Typography variant="h6">
            {department}
          </Typography>
          <Typography variant="body1">
            Professor
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            {shortDescription}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

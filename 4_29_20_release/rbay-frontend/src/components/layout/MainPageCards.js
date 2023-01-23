import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainCard: {
    padding: theme.spacing(2),
  },
  profileCard: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  profileImage: {
    display: "inline-block",
    width: "125px",
    height: "125px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    maxWidth: "80%",
    maxHeight: "auto",
  },
  iconButton: {
    padding: theme.spacing(1),
  }
}));

export function ProfileCard(props) {
  const classes = useStyles();
  let websiteDisabled = props.website == null || props.website.length === 0;

  let picture = props.picture;
  if (picture == null || picture == undefined || picture === "") {
    picture = "https://firebasestorage.googleapis.com/v0/b/research-bay.appspot.com/o/picture%2FTYe15CpIpyLWuYH2rF1ThY9RDyz1_uiuc_logo_bg.png?alt=media&token=TYe15CpIpyLWuYH2rF1ThY9RDyz1";
  }

  if (props.is_student) {
    let year = "";
    if (props.year <= 1) {
      year = "Freshman";
    } else if (props.year === 2) {
      year = "Sophomore";
    } else if (props.year === 3) {
      year = "Junior";
    } else if (props.year === 4) {
      year = "Senior";
    } else if (props.year >= 4) {
      year = "Graduate";
    }

    return (
      <Card className={classes.profileCard}>
        <div>
          <img src={picture} className={classes.profileImage} alt="profile" />
        </div>
        <Typography variant="h5">
          {props.name}
        </Typography>
        <Typography variant="body2">
          {year} in {props.major}
        </Typography>
        <Typography variant="body2">
          GPA: {props.gpa}
        </Typography>
        <div>
          <IconButton className={classes.iconButton} disabled={props.email == null} href={"mailto:" + props.email} color="inherit" target="_blank">
            <EmailIcon />
          </IconButton>
          <IconButton className={classes.iconButton} disabled={websiteDisabled} href={props.website} color="inherit" target="_blank">
            <LanguageIcon />
          </IconButton>
          <IconButton className={classes.iconButton} disabled={props.resume == null} href={props.resume} color="inherit" target="_blank">
            <PictureAsPdfIcon />
          </IconButton>
        </div>
      </Card>
    );
  } else {
    return (
      <Card className={classes.profileCard}>
        <img src={picture} className={classes.profileImage} alt="profile" />
        <Typography variant="h5">
          {props.name}
        </Typography>
        <Typography variant="body2">
          Professor in {props.department}
        </Typography>
        <div>
          <IconButton className={classes.iconButton} disabled={props.email == null} href={"mailto:" + props.email} color="inherit" target="_blank">
            <EmailIcon />
          </IconButton>
          <IconButton className={classes.iconButton} disabled={websiteDisabled} href={props.website} color="inherit" target="_blank">
            <LanguageIcon />
          </IconButton>
          <IconButton className={classes.iconButton} disabled={props.resume == null} href={props.resume} color="inherit" target="_blank">
            <PictureAsPdfIcon />
          </IconButton>
        </div>
      </Card>
    );
  }
}

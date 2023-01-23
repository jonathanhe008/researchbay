import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import PostingDetailsModal from './PostingDetailsModal';
import UpdatePostingModal from './UpdatePostingModal';
import ApplicantsModal from './ApplicantsModal';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';
import { doDeletePosting } from '../../actions/postingActions';

const useStyles = makeStyles(theme => ({
  postingCard: {
    padding: theme.spacing(2),
    display: "flex",
  },
  postingCardImage: {
    minWidth: "100px",
    minHeight: "100px",
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    objectFit: "cover",
  },
  postingCardContent: {
    margin: theme.spacing(0, 2, 0, 0),
    "& > *": {
      margin: theme.spacing(0, 0, 1, 0),
    }
  },
  postingCardContentLeft: {
    maxWidth: "100px",
    margin: theme.spacing(0, 2, 0, 0),
    "& > *": {
      margin: theme.spacing(0, 0, 1, 0),
    }
  },
  postingCardContentRight: {
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

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doDeletePosting: (idToken, postingId) => { dispatch(doDeletePosting(idToken, postingId)); },
  }
}

export const PostingCard = connect(mapStateToProps, mapDispatchToProps)(PostingCardBase);

function PostingCardBase(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const handleDeleteExperience = () => {
    props.doDeletePosting(props.auth.idToken, props.id);
  }

  let { picture, ...restOfProps } = props;
  if (picture == null || picture == undefined || picture === "") {
    picture = "https://firebasestorage.googleapis.com/v0/b/research-bay.appspot.com/o/picture%2FTYe15CpIpyLWuYH2rF1ThY9RDyz1_uiuc_logo_bg.png?alt=media&token=TYe15CpIpyLWuYH2rF1ThY9RDyz1";
  }

  let { title, professor_name, lab_name, description, tags, id, is_open, applicants, isGetUserPosting, isEditable } = restOfProps;

  let shortDescription = description.slice(0, 250) + "...";

  return ( // TODO apply
    <Card className={classes.postingCard}>
      <div className={classes.postingCardContentLeft}>
        <img className={classes.postingCardImage} alt="posting" src={picture} />
        <PostingDetailsModal picture={picture} {...restOfProps} />
      </div>
      <div className={classes.postingCardContent}>
        <div>
          <Typography variant="h5">
            {lab_name}
          </Typography>
          <Typography variant="h6">
            Professor {professor_name}
          </Typography>
          <Typography variant="body1">
            {title}
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            {shortDescription}
          </Typography>
        </div>
      </div>
      <div className={classes.grow} />
      {isEditable && <div className={classes.postingCardContentRight}>
        <div className={classes.buttonContainer} >
          <div>
            <UpdatePostingModal {...restOfProps} />
          </div>
          <div>
            <Button onClick={handleDeleteExperience} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
              Delete
            </Button>
          </div>
        </div>
        <div className={classes.buttonContainer} >
          <ApplicantsModal {...restOfProps} />
        </div>
      </div>}
    </Card>
  );
}

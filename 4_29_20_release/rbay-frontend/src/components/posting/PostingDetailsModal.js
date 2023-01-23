import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import { doApplyToPosting } from '../../actions/postingActions';

const useStyles = makeStyles(theme => ({
  postingFlex: {
    display: "flex",
    "& > *": {
      paddingRight: theme.spacing(2),
    }
  },
  postingContent: {
    padding: theme.spacing(2),
    "& > *": {
      padding: theme.spacing(1),
    }
  },
  postingCardButton: {
    width: "100px"
  },
  postingCardImage: {
    minWidth: "100px",
    minHeight: "100px",
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    objectFit: "cover",
  },
}));

function PostingDetailsModal(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  let { title, professor_name, lab_name, description, tags, picture, id } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    props.doApplyToPosting(props.auth.idToken, id);
    setOpen(false);
  }

  let displayTags = tags != null ? tags.join(", ") : "";

  return (
    <div>
      <div className={classes.postingCardButton}>
        <Button fullWidth color="secondary" variant="contained" classes={{
          label: globalClasses.button
        }} onClick={handleClickOpen}>
          Details
        </Button>
      </div>
      <Dialog fullWidth maxWidth="sm" disableScrollLock open={open} onClose={handleClose}>
        <div className={classes.postingContent}>
          <div className={classes.postingFlex}>
            <div>
              <img className={classes.postingCardImage} alt="posting" src={picture} />
            </div>
            <div>
              <Typography variant="h5">
                {lab_name}
              </Typography>
              <Typography variant="h6">
                {professor_name}
              </Typography>
              <Typography variant="body1">
                {title}
              </Typography>
            </div>
          </div>
          <div>
            <Divider variant="fullWidth" style={{ height: "1.5px" }} />
          </div>
          <div>
            <Typography variant="body2">
              {description}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">
              Tags: {displayTags}
            </Typography>
          </div>
          {!props.isEditable && props.auth.is_student && <div>
            <Button onClick={handleApply} disabled={props.isGetUserPosting} color="secondary" variant="contained" classes={{
              label: globalClasses.button
            }}>
              Apply
            </Button>
          </div>}
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
    doApplyToPosting: (idToken, postingId) => { dispatch(doApplyToPosting(idToken, postingId)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingDetailsModal);

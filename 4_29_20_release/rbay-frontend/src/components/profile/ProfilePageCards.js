import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import AddExperienceModal from './AddExperienceModal';
import EditExperienceModal from './EditExperienceModal';
import EditAboutMeModal from './EditAboutMeModal';
import ResearchInterestsModal from './ResearchInterestsModal';
import EditSkillsModal from './EditSkillsModal';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import { connect } from 'react-redux';
import { doSetProfile } from '../../actions/profileActions';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    padding: theme.spacing(2),
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  grow: {
    flexGrow: "1"
  },
  experienceCardSections: {
    "& > *": {
      margin: theme.spacing(1, 0, 1, 0),
    }
  },
  experienceCardContent: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0, 1, 0, 1),
    }
  },
  researchInterestsCard: {
    padding: theme.spacing(2),
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 1, 0, 0),
    },
  },
  researchInterestsCardHeader: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  researchInterestsContent: {
    margin: theme.spacing(1, 2, 0, 0),
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 1, 1, 0),
    }
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  pillInterests: {
    color: "#AC3B61",
    backgroundColor: "#EEE2DC",
    borderRadius: "4px"
  },
  buttonContainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 0, 0, 1),
    },
  }
}));

export function AboutMeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <div>
          <Typography variant="h5">
            Bio
          </Typography>
        </div>
        <div className={classes.grow}></div>
        {props.isEditable && <div>
          <EditAboutMeModal />
        </div>}
      </div>
      <div>
        <Typography variant="body2">
          {props.about_me}
        </Typography>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSetProfile: (idToken, profileData) => { dispatch(doSetProfile(idToken, profileData)) },
  }
}

export const ExperienceCard = connect(mapStateToProps, mapDispatchToProps)(ExperienceCardBase)

function ExperienceCardBase(props) {
  const classes = useStyles();

  const handleSingleEditExperience = (idx, singleExpData) => {
    if (!props.isEditable) {
      return;
    }

    let listOfExps = [...props.experience];
    listOfExps[idx] = singleExpData;

    let profileData = {
      experience: listOfExps
    }
    props.doSetProfile(props.auth.idToken, profileData);
  }

  const handleSingleDeleteExperience = (idx) => {
    if (!props.isEditable) {
      return;
    }

    let listOfExps = [...props.experience];
    listOfExps.splice(idx, 1);

    let profileData = {
      experience: listOfExps
    }
    props.doSetProfile(props.auth.idToken, profileData);
  }

  const exps = props.experience.map((val, idx) => {
      return (
        <div key={idx}>
          <SingleExperienceSection {...val}
            handleSingleEditExperience={(singleExpData) => { handleSingleEditExperience(idx, singleExpData); }}
            handleSingleDeleteExperience={() => { handleSingleDeleteExperience(idx); }}
            isEditable={props.isEditable}
            />
        </div>
      );
  });

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <div>
          <Typography variant="h5">
            Experience
          </Typography>
        </div>
        <div className={classes.grow}> </div>
        {props.isEditable && <div>
          <AddExperienceModal />
        </div>}
      </div>
      <div className={classes.experienceCardSections}>
        {exps}
      </div>
    </Card>
  );
}

export function SingleExperienceSection(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  return (
      <Card variant="outlined" className={classes.experienceCardContent}>
        <div className={classes.cardHeader}>
          <div>
            <Typography variant="h6">
              {props.company}
            </Typography>
          </div>
          <div className={classes.grow}> </div>
          <div className={classes.buttonContainer}>
            {props.isEditable && <div>
              <EditExperienceModal {...props} handleSingleEditExperience={props.handleSingleEditExperience}/>
            </div>}
            {props.isEditable && <div>
              <Button onClick={props.handleSingleDeleteExperience} variant="contained" color="secondary" size="small" classes={{ label: globalClasses.button }}>
                Delete
              </Button>
            </div>}
          </div>
        </div>
        <div>
          <Typography variant="body1">
            {props.title}
          </Typography>
          <Typography variant="body2">
            {props.description}
          </Typography>
        </div>
      </Card>
  );
}

export function ResearchInterestsCard(props) {
  const classes = useStyles();

  const recs = props.research_interests.map((val, idx) => {
    return (
      <div key={idx}>
        <Pill interest={val} />
      </div>
    );
  });

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <div>
          <Typography variant="h5">
            Research Interests
          </Typography>
        </div>
        <div className={classes.grow}> </div>
        {props.isEditable && <div>
          <ResearchInterestsModal />
        </div>}
      </div>
      <div className={classes.researchInterestsContent}>
        {recs}
      </div>
    </Card>
  );
}

export function SkillsCard(props) {
  const classes = useStyles();

  const recs = props.skills.map((val, idx) => {
    return (
      <div key={idx}>
        <Pill interest = {val} />
      </div>
    );
  });

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <div>
          <Typography variant="h5">
            Skills
          </Typography>
        </div>
        <div className={classes.grow}> </div>
        {props.isEditable && <div>
          <EditSkillsModal />
        </div>}
      </div>
      <div className={classes.researchInterestsContent}>
        {recs}
      </div>
    </Card>
  );
}

export function Pill(props) {
  const classes = useStyles();

  return (
    <Box className={classes.pillInterests} p={1}>
     {props.interest}
    </Box>
  );
}

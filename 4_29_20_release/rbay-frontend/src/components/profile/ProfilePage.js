import React from 'react'
import MainPage from '../layout/MainPage';
import { connect } from 'react-redux';
import { ProfileCard } from '../layout/MainPageCards'
import { AboutMeCard, ExperienceCard, ResearchInterestsCard, SkillsCard } from '../profile/ProfilePageCards'
import SetProfileModal from './SetProfileModal';

import { doGetProfile } from '../../actions/profileActions';

function ProfilePage(props) {
  React.useEffect(() => {
    if (!props.profile.isUpToDate) {
      props.doGetProfile(props.auth.idToken);
    }

  }, [props.auth.idToken, props.profile.isUpToDate]);

  if (!props.profile.isUpToDate) {
    return <div />; // delay rendering page until profile data is completed up-to-date.
  }

  let displayRightData = {
    "My Profile": [
      {
        component: <AboutMeCard about_me={props.profile.about_me} isEditable={true} />,
        about_me: props.profile.about_me
      },
      {
        component: <ResearchInterestsCard research_interests={props.profile.research_interests} isEditable={true} />,
        research_interests: props.profile.research_interests
      },
    ],
  }

  if (props.profile.hasOwnProperty("experience")) {
    displayRightData["My Profile"].splice(1, 0, {
      component: <ExperienceCard experience={props.profile.experience} isEditable={true} />,
      experience: props.profile.experience
    });
  }

  if (props.profile.hasOwnProperty("skills")) {
    displayRightData["My Profile"].push({
      component: <SkillsCard skills={props.profile.skills} isEditable={true} />,
      skills: props.profile.skills
    });
  }

  let displayLeftData = [
    <ProfileCard {...props.profile} email={props.auth.email} is_student={props.auth.is_student} />,
  ];

  let buttons = [
    <SetProfileModal {...props.profile} key={0} />
  ];

  let profileProps = {
    singleOption: true,
    titleText: "My Profile",
    profile: props.profile,
    displayLeftData,
    displayRightData,
    filters: [], // leave blank for simplicity for nows
    buttons,
  }

  return (
    <MainPage {...profileProps} />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    profile: state.profileState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetProfile: (idToken) => { dispatch(doGetProfile(idToken)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

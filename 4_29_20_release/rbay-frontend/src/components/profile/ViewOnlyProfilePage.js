import React from 'react'
import MainPage from '../layout/MainPage';
import { connect } from 'react-redux';
import { ProfileCard } from '../layout/MainPageCards';
import { AboutMeCard, ExperienceCard, ResearchInterestsCard, SkillsCard } from '../profile/ProfilePageCards';
import { useParams } from "react-router-dom";

import { doGetViewProfile } from '../../actions/profileActions';

function ViewOnlyProfilePage(props) {
  let { id } = useParams();
  const [profileId, setProfileId] = React.useState(id);

  React.useEffect(() => {
    props.doGetViewProfile(props.auth.idToken, profileId);
  }, [profileId]);

  if (!props.view.hasOwnProperty(profileId)) {
    return <div />;
  }

  let profileData = props.view[profileId];

  let displayRightData = {
    "Profile": [
      {
        component: <AboutMeCard about_me={profileData.about_me} isEditable={false} />,
        about_me: profileData.about_me
      },
      {
        component: <ResearchInterestsCard research_interests={profileData.research_interests} isEditable={false} />,
        research_interests: profileData.research_interests
      }
    ],
  };

  if (profileData.hasOwnProperty("experience")) {
    displayRightData["Profile"].splice(1, 0, {
      component: <ExperienceCard experience={profileData.experience} isEditable={false} />,
      experience: profileData.experience
    });
  }

  if (profileData.hasOwnProperty("skills")) {
    displayRightData["Profile"].push({
      component: <SkillsCard skills={profileData.skills} isEditable={false} />,
      skills: profileData.skills
    });
  }

  let is_student = profileData.hasOwnProperty("experience");

  let displayLeftData = [
    <ProfileCard {...profileData} email={null} is_student={is_student} />,
  ];

  let buttons = [];

  let viewProfileProps = {
    singleOption: true,
    titleText: "View Profiles",
    profile: profileData,
    displayLeftData,
    displayRightData,
    filters: [],
    buttons,
  }

  return (
    <MainPage {...viewProfileProps} />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    view: state.viewProfilesState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetViewProfile: (idToken, profileId) => { dispatch(doGetViewProfile(idToken, profileId)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOnlyProfilePage);

import React from 'react';
import MainPage from '../layout/MainPage';
import { connect } from 'react-redux';
import { ProfileCard } from '../layout/MainPageCards';
import { PostingCard } from '../posting/PostingPageCards';
import { StudentCard, ProfessorCard } from '../profile/ProfilePreviewCards';

import { doGetProfile } from '../../actions/profileActions';
import { doGetSearch, doResetSearch, doGetRecommendations } from '../../actions/searchActions';

// this component receives profile data and recommendations as props, using redux
function DiscoverPage(props) {
  React.useEffect(() => {
    if (!props.profile.isUpToDate) {
      props.doGetProfile(props.auth.idToken);
    }

  }, [props.auth.idToken, props.profile.isUpToDate]);

  React.useEffect(() => {
    props.doGetRecommendations(props.auth.idToken);
  }, [props.auth.idToken]);

  const handleRemoteSearch = (searchText) => {
    console.log("remote search");
    props.doResetSearch();
    props.doGetSearch(props.auth.idToken, searchText);
  }

  if (!props.profile.isUpToDate) {
    return <div /> // delay rendering page until profile data is completed up-to-date.
  }

  const labelPostings = (val, idx) => {
    return { type: "Postings", component: <PostingCard {...val} isEditable={false} />, ...val };
  }

  const labelProfiles = (val, idx) => {
    let component = null;
    if (val.hasOwnProperty("department")) {
      component = <ProfessorCard {...val} />;
    } else {
      component = <StudentCard {...val} />;
    }

    return { type: "Profiles", component: component, ...val };
  }

  const recPostings = props.recommendations.postings.map(labelPostings);
  const recProfiles = props.recommendations.profiles.map(labelProfiles);
  const searchPostings = props.search.postings.map(labelPostings);
  const searchProfiles = props.search.profiles.map(labelProfiles);

  let displayRightData = {
    "Recommended": [...recPostings, ...recProfiles],
    "Search": [...searchPostings, ...searchProfiles]
  }

  let displayLeftData = [
    <ProfileCard {...props.profile} email={props.auth.email} is_student={props.auth.is_student} />,
  ];

  let discoverProps = {
    handleRemoteSearch,
    titleText: "Explore",
    displayLeftData,
    displayRightData,
    profile: props.profile,
    filters: [
      { name: "type", options: ["Postings", "Profiles"] },
      // { type: "Year", options: ["Freshman", "Sophomore", "Junior", "Senior", "Masters", "Doctorate"] },
      // { type: "Major", options: ["CS", "ECE", "Bio", "Chem", "Physics", "Geology", "Psych", "History", "Math"] },
      // { type: "Term", options: ["Fall", "Spring", "Summer"] },
      // { type: "Skills", options: ["JavaScript", "CSS", "C++", "Python", "AutoCAD", "Matlab"] },
    ],
    buttons: [],
  }

  return (
    <MainPage {...discoverProps} />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    profile: state.profileState,
    recommendations: state.recommendationsState,
    search: state.searchState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetProfile: (idToken) => { dispatch(doGetProfile(idToken)); },
    doGetSearch: (idToken, searchQuery) =>  { dispatch(doGetSearch(idToken, searchQuery)); },
    doResetSearch: () => { dispatch(doResetSearch()); },
    doGetRecommendations: (idToken) => { dispatch(doGetRecommendations(idToken)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);

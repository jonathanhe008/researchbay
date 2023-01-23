import React from 'react'
import MainPage from '../layout/MainPage';
import { connect } from 'react-redux';
import { ProfileCard } from '../layout/MainPageCards';
import { PostingCard } from './PostingPageCards';
import CreatePostingModal from './CreatePostingModal';

import { doGetProfile } from '../../actions/profileActions';
import { doGetUserPostings } from '../../actions/postingActions';

function PostingPage(props) {
  React.useEffect(() => {
    if (!props.profile.isUpToDate) {
      props.doGetProfile(props.auth.idToken);
    }

    if (!props.postings.isUpToDate) {
      props.doGetUserPostings(props.auth.idToken);
    }

  }, [props.auth.idToken, props.profile.isUpToDate, props.postings.isUpToDate]);

  if (!props.profile.isUpToDate || !props.postings.isUpToDate) {
    return <div /> // delay rendering page until profile data is completed up-to-date.
  }

  const postings = props.postings.entries.map((val, idx) => {
    return { component: <PostingCard {...val} isEditable={!props.auth.is_student} isGetUserPosting={true} />, ...val };
  });

  let title = props.auth.is_student ? "My Applications" : "My Postings";

  let displayRightData = {
    [title]: postings,
  }

  let displayLeftData = [
    <ProfileCard {...props.profile} email={props.auth.email} is_student={props.auth.is_student} />,
  ];

  let buttons = [];
  if (!props.auth.is_student) {
    buttons.push(<CreatePostingModal key={0} />);
  }

  let profileProps = {
    singleOption: true,
    titleText: title,
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
    postings: state.postingsState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetProfile: (idToken) => { dispatch(doGetProfile(idToken)); },
    doGetUserPostings: (idToken) => { dispatch(doGetUserPostings(idToken)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingPage);

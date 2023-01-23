import React from 'react'
import { connect } from 'react-redux';

import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Link } from 'react-router-dom';

import NavbarButton from './NavbarButton';

import * as ROUTES from '../../constants/routes';

import { globalStyles } from '../style/globalStyles';

function SignedInLinks(props) {
  const globalClasses = globalStyles();

  const linkData = [
    { route: ROUTES.LANDING, text: "Home", icon: <HomeIcon /> },
    { route: ROUTES.EXPLORE, text: "Explore", icon: <ExploreIcon /> },
    { route: ROUTES.PROFILE, text: "Profile", icon: <DashboardIcon /> },
    { route: ROUTES.POSTING, text: "Postings", icon: <LibraryBooksIcon /> },
    { route: ROUTES.ACCOUNT, text: "Account", icon: <AccountCircleIcon /> },
    { route: ROUTES.SIGN_OUT, text: "Sign Out", icon: null },
  ];

  return (
    <div>
      {linkData.map((link, idx) => {
        return (
          <Link to={link.route} className={globalClasses.link} key={idx}>
            <NavbarButton text={link.text} icon={link.icon} />
          </Link>
        );
      })}
    </div>
  );
}

export default SignedInLinks;

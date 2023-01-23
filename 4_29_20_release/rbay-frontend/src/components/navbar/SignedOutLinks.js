import React from 'react'
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { globalStyles } from '../style/globalStyles';

import NavbarButton from './NavbarButton';

const linkData = [
  { route: "LANDING", text: "Home", icon: <HomeIcon /> },
  { route: "SIGN_IN", text: "Sign In", icon: null },
  { route: "SIGN_UP", text: "Register", icon: null },
];

function SignedOutLinks() {
  const globalClasses = globalStyles();

  return (
    <div>
      {linkData.map((link, idx) => {
        return (
          <Link to={ROUTES[link.route]} className={globalClasses.link} key={idx}>
            <NavbarButton text={link.text} icon={link.icon} />
          </Link>
        );
      })}
    </div>
  );
}

export default SignedOutLinks;

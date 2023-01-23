import React from 'react';

import { globalStyles } from '../style/globalStyles';

function NavbarTitle(props) {
  const globalClasses = globalStyles();

  // TODO put in logo
  return (
    <h2 className={globalClasses.titleText}>
      Research Bay
    </h2>
  );
}

export default NavbarTitle;

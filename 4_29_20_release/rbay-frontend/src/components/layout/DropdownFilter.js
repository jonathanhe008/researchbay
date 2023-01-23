import React from 'react';
import Menu from '@material-ui/core/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

const useStyles = makeStyles(theme => ({
  checkboxItem: {
    padding: theme.spacing(0, 2)
  },
}));

// TODO give state to parent component to keep track results to show
function DropdownFilter(props) {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (val) => {
    let copy = new Set(props.checked);
    if (copy.has(val)) {
      copy.delete(val);
    } else {
      copy.add(val);
    }

    props.handleFilterChange(props.name, copy);
  }

  // automatically close menu on scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleClose);
    return (() => {
      window.removeEventListener('scroll', handleClose);
    });
  });

  let capName = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="default" classes={{ label: globalClasses.button }}>
        {capName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {props.options.map((opt, idx) => {
          return (
            <div className={classes.checkboxItem} key={idx}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.checked.has(opt)}
                    onChange={() => { handleItemClick(opt); }}
                    name={opt}
                    label={opt}
                  />
                }
                onChange={() => { handleItemClick(opt); }}
                label={opt}
              />
            </div>
          );
        })}
      </Menu>
    </div>
  );
}

export default DropdownFilter;

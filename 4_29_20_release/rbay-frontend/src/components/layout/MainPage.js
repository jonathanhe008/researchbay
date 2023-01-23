import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { green } from '@material-ui/core/colors';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { globalStyles } from '../style/globalStyles';

import DropdownFilter from './DropdownFilter';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#c62828',
    },
  },
});

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "[line1] 15% [line2] 14% [line3] 2%[ line4] auto [line5] 15%",
    gridTemplateRows: "[row1] 80px [row2] 30% [row3] auto [row4]",
  },
  mainTitle: {
    gridColumn: "line2 / line5",
    gridRow: "row1 / row2",
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    margin: 0,
    padding: 0,
  },
  leftContainer: {
    gridColumn: "line2 / line3",
    gridRow: "row2 / row4",
  },
  rightContainer: {
    gridColumn: "line4 / line5",
    gridRow: "row2 / row4",
  },
  mainRightCategoryMenu: {
    textAlign: "right",
    marginLeft: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  leftAlignButtons: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 1, 0, 0)
    }
  },
  rightAlignButtons: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0, 0, 0, 1)
    }
  },
  inputBase: {
    width: "100%",
  },
  input: {
    width: "100%",
    color: "white",
  },
  mainFilterSearch: {
    margin: theme.spacing(0, 0, 2, 0),
  },
  mainFilterSearchBar: {
    borderRadius: "4px",
  },
  mainFilterSearchField: {
    borderRadius: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "2px 10px",
    width: "50%",
  },
  listingSection: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listingSectionItem: {
    width: "100%",
    height: "100%",
    margin: theme.spacing(0, 0, 2, 0),
  },
  rootButton: {
    '&$disabledButton': {
      color: "#EEE2DC",
      backgroundColor: "#374785",
      // https://material-ui.com/customization/components/#pseudo-classes
    }
  },
  disabledButton: {}
}));

function RightCategoryMenu(props) {
  const classes = useStyles();

  const handleMenuItemClick = (opt) => {
    props.handleCategoryChange(opt);
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // automatically close menu on scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleClose);
    return (() => {
      window.removeEventListener('scroll', handleClose);
    });
  });

  return (
    <div className={classes.mainRightCategoryMenu}>
      <Button
        onClick={handleClick}
        disabled={props.isSingleOption}
        variant="contained"
        color="default"
        classes={{
          root: classes.rootButton,
          disabled: classes.disabledButton
        }}
      >
        {props.category}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {props.options.map((opt, idx) => {
          return <MenuItem onClick={() => { handleMenuItemClick(opt); }} key={idx}>{opt}</MenuItem>
        })}
      </Menu>
    </div>
  );
}

const getInitialFilterValues = (filters) => {
  const initFilterVal = {};
  for (let fil of filters) {
    initFilterVal[fil.name] = new Set(fil.options);
  }

  return initFilterVal;
}

function RightDataController(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const options = Object.keys(props.displayRightData);
  const initialFilter = getInitialFilterValues(props.filters);

  const [searchText, setSearchText] = React.useState("");
  const [filterVal, setFilterVal] = React.useState(initialFilter);
  const [category, setCategory] = React.useState(options[0]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (category === "Search") {
      props.handleRemoteSearch(searchText);
    } else {
      // local search
      // Recommendations, or Profile, or Postings page/sections local search
    }
  }

  const handleFilterChange = (type, val) => {
    let copy = {...filterVal};
    copy[type] = val;
    setFilterVal(copy);
  }

  const handleCategoryChange = (opt) => {
    setCategory(opt);
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const resetFilters = () => {
    let copy = { ...initialFilter };
    setFilterVal(copy);
  }

  const applyFilters = () => {
    let startingData = props.displayRightData[category];
    // [ { type: "...", component: <Component />, ...val }, {...} ]

    let finalData = startingData.filter((entry) => {
      for (let filName in filterVal) {
        if (entry.hasOwnProperty(filName)) {
          if (!filterVal[filName].has(entry[filName])) {
            return false;
          }
        }
      }

      return true;
    }).map(entry => entry.component);

    props.handleRightDataChange(finalData);
  }

  React.useEffect(() => {
    applyFilters();
  }, [category, filterVal, props.displayRightData]);

  React.useEffect(() => {
    applyFilters();
  }, []);

  let isInvalidSearch = searchText == null || searchText.length == 0;

  return (
    <div className={classes.mainFilterSearch}>
      <AppBar color="secondary" position="static" classes={{
        root: classes.mainFilterSearchBar,
        colorSecondary: globalClasses.inverseSecondaryColor
      }}>
        <Toolbar>
          <div className={classes.mainFilterSearchField}>
            <form onSubmit={handleSearch}>
              <InputBase
                placeholder="Search…"
                className={classes.inputBase}
                inputProps={{
                  className: classes.input,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={handleSearch}
                      onMouseDown={handleMouseDownPassword}
                      disabled={isInvalidSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleSearchText}
              />
            </form>
          </div>
          <div className={classes.grow} />
          {props.buttons.length > 0 && (
            <div className={classes.rightAlignButtons}>
              {props.buttons.map((bt, idx) => {
                return bt;
              })}
            </div>
          )}
          <RightCategoryMenu
            isSingleOption={props.singleOption}
            options={options}
            handleCategoryChange={handleCategoryChange}
            category={category}
          />
        </Toolbar>
        {props.filters.length > 0 && (
          <div>
            <Divider variant="middle" style={{ height: "1.5px" }} />
            <Toolbar>
              <div className={classes.leftAlignButtons}>
                {props.filters.map((fil, idx) => {
                  return <DropdownFilter
                            name={fil.name}
                            options={fil.options}
                            checked={filterVal[fil.name]}
                            key={idx}
                            handleFilterChange={handleFilterChange}
                         />
                })}
              </div>
              <div className={classes.grow} />
              <div className={classes.rightAlignButtons}>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={resetFilters}
                    variant="contained"
                    color="secondary"
                    classes={{ label: globalClasses.button }}>
                      Reset
                  </Button>
                </ThemeProvider>
              </div>
            </Toolbar>
          </div>
        )}
      </AppBar>
    </div>
  );
}

function ListingSection(props) {
  const classes = useStyles();
  const listItems = props.listData.map((le, idx) => {
    return (
        <li className={classes.listingSectionItem} key={idx}>
          {le}
        </li>
    );
  });

  return (
    <ul className={classes.listingSection}>
      {listItems}
    </ul>
  );
}


function MainPage(props) {
  const classes = useStyles();

  const [currRightData, setCurrRightData] = React.useState([]);

  const handleRightDataChange = (newData) => {
    setCurrRightData(newData);
  }

  return (
      <div className={classes.mainContainer}>
        <div className={classes.mainTitle}>
          <h1 className={classes.titleText}>
            {props.titleText}
          </h1>
        </div>

        <div className={classes.leftContainer}>
          <ListingSection listData={props.displayLeftData} />
        </div>

        <div className={classes.rightContainer}>
          <RightDataController {...props} handleRightDataChange={handleRightDataChange} />
          <ListingSection listData={currRightData} />
        </div>
      </div>
  );
}

export default MainPage;

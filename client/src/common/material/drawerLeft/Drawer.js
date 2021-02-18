import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PhonelinkSetupRoundedIcon from '@material-ui/icons/PhonelinkSetupRounded';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Settings from './settings/Settings';
import Apps from './apps/Apps';
import { IconButton, ListItemIcon } from '@material-ui/core';
import HttpsIcon from '@material-ui/icons/Https';
import InfoIcon from '@material-ui/icons/Info';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    '& a': {
      color: theme.palette.type === "dark" ? 'white' : 'black'
    }
  },
  fullList: {
    width: 'auto',
    color: 'white',
  },
  drawerPosition: {
    position: 'fixed',
    top: '50%',
    right: 0,
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '5px 12px 5px 7px',
    fontSize: "45px",
    borderRadius: "5px",
    marginRight: "-10px",
    cursor: 'pointer',
    transform: 'translateY(-50%)',
    transition: 'all .2s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      marginRight: '-3px',
    }
  },
}));

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/about-us" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>
        <Link to="/terms-condition" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><BeachAccessIcon /></ListItemIcon>
            <ListItemText primary="Terms & Condition" />
          </ListItem>
        </Link> 
        <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><HttpsIcon /></ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </Link>
        <Link to="/shipment-info" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><LocalShippingIcon /></ListItemIcon>
            <ListItemText primary="Shipment Info" />
          </ListItem>
        </Link>
        <Link to="/refund-return-policy" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><CachedIcon /></ListItemIcon>
            <ListItemText primary="Refund Policy" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>

        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />

        </IconButton>
        {/* // <PhonelinkSetupRoundedIcon className={`${classes.drawerPosition} drawerButtonAnimate`} onClick={toggleDrawer(true)}/> */}
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          <Settings changeTheme={props.changeTheme} />
          <Divider />
          {list("left")}
          <Divider />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

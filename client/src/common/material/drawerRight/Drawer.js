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
import { signout, isAuthenticated } from "../../../auth";

import { IconButton, ListItemIcon, Typography } from '@material-ui/core';
import HttpsIcon from '@material-ui/icons/Https';
import InfoIcon from '@material-ui/icons/Info';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CachedIcon from '@material-ui/icons/Cached';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { useHistory } from "react-router-dom";


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
  const history = useHistory();
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

        <Link to="/user/dashboard" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </Link>
        <Link to="/user/see-your-topup-orders" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
        </Link>
        <Link to="/user/refill-wallet" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            <ListItemText primary="My Wallet" />
          </ListItem>
        </Link>
        <Link to="/user/coupons" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemIcon><CardGiftcardIcon /></ListItemIcon>
            <ListItemText primary="My Cupons" />
          </ListItem>
        </Link>
        <Link   
          onClick={() =>
                    signout(() => {
                        history.push("/");
                      })
                    }  
            style={{ textDecoration: "none" }}>
          <ListItem 
            button  
           
          >
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <>
      <React.Fragment>
        <IconButton
          onClick={toggleDrawer(true)}

        >
          <AccountBoxIcon />
        </IconButton>
        {/* // <PhonelinkSetupRoundedIcon className={`${classes.drawerPosition} drawerButtonAnimate`} onClick={toggleDrawer(true)}/> */}
        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          <List
            subheader={<ListSubheader>Faruk Hossain</ListSubheader>}
            className={classes.root}
            dense={true}
          >
            <ListItem>
              
            </ListItem>
          </List>
          <Divider />
          {list("right")}
          <Divider />
        </Drawer>
      </React.Fragment>
    </>
  );
}

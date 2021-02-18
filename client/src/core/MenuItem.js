import React from 'react';
import './MenuItem.css';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TranslateIcon from '@material-ui/icons/Translate';
import HistoryIcon from '@material-ui/icons/History';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";
import SliceText from '../utils/SliceText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: '5px',
  },
}));


const MenuListComposition = ({ history, hdieName }) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }


    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



  return (
    <div className={classes.root}>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          size="small"
        >

          <Avatar className={classes.small} />

          {!hdieName &&
            <span id="menuName" style={{ color: 'black', }}>
              <SliceText number={12}>
                MD: Faruk Hosain
            </SliceText>
            </span>
          }
          {!hdieName &&
            <ExpandMoreIcon id="menuIcon" />
          }

          {/* <ExpandMoreIcon style={{color: 'black'}}/> */}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id="menu-list-grow-custom">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >

                    {/* <Divider style={{ marginBottom: '8px', color: 'red' }} />s */}



                    <MenuItem onClick={handleClose}>
                      <AccountBoxIcon style={{ marginRight: '5px' }} />
                      <Link to='/user/dashboard' style={{ textDecoration: 'none' }}>
                        My Profile
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <ListAltIcon style={{ marginRight: '5px' }} />
                      <Link to='/user/see-your-topup-orders' style={{ textDecoration: 'none' }}>
                        My Orders
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <AccountBalanceIcon style={{ marginRight: '5px' }} />
                      <Link to='/user/refill-wallet' style={{ textDecoration: 'none' }}>
                        My Wallet
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <CardGiftcardIcon style={{ marginRight: '5px' }} />
                      <Link to='/user/coupons' style={{ textDecoration: 'none' }}>
                        My Cupons
                        </Link>
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                      style={{ textAlign: 'center' }}>
                      <ExitToAppIcon style={{ marginRight: '5px' }} />
                      Logout
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}




export default withRouter(MenuListComposition);

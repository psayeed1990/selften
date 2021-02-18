import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DrawerRight from '../common/material/drawerRight/Drawer';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2000,
    boxShadow: '0px 1px 13px rgba(0,0,0, .3)'
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  let history = useHistory();

  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      
        <BottomNavigationAction onClick = {()=> history.push('/')} label="Home" value="home" icon={<HomeIcon />} />
     

      <BottomNavigationAction onClick = {()=> history.push('/cart')}  label="Cart"  value="cart" icon={<ShoppingCartIcon />} />

      <BottomNavigationAction label="Notification" value="notification" icon={<NotificationsIcon />} />

      <BottomNavigationAction label="Account" value="account" icon={<DrawerRight />} />
     
    </BottomNavigation>
  );
}














// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';

// import Fab from '@material-ui/core/Fab';

// import Avatar from '@material-ui/core/Avatar';

// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import LocalMallIcon from '@material-ui/icons/LocalMall';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// const useStyles = makeStyles((theme) => ({

//     appBar: {
//         top: 'auto',
//         bottom: 0,
//     },
//     grow: {
//         flexGrow: 1,
//     },
//     fabButton: {
//         position: 'absolute',
//         zIndex: 1,
//         top: -30,
//         left: 0,
//         right: 0,
//         margin: '0 auto',
//     },
// }));

// export default function BottomAppBar() {
//     const classes = useStyles();

//     return (
//         <React.Fragment>
//             <CssBaseline />

//             <AppBar position="fixed" color="primary" className={classes.appBar} style={{zIndex: '3000'}}>
//                 <Toolbar>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', width: '35%' }}>
//                         <IconButton edge="start" color="inherit" aria-label="open drawer">
//                             <ShoppingCartIcon />
//                         </IconButton>
//                         <IconButton edge="start" color="inherit" aria-label="open drawer">
//                             <LocalMallIcon />
//                         </IconButton>
//                     </div>


//                     <Fab color="secondary" aria-label="add" className={classes.fabButton}>
//                         <img src={require('../images/logo/main.png')} style={{ width: '100%' }} />
//                         {/* <img src={require('../images/logo/main.png')} style={{ width: '100%' }} /> */}
//                     </Fab>

//                     <div className={classes.grow} />

//                     <div style={{ display: 'flex', justifyContent: 'space-between', width: '35%' }}>
//                         <IconButton edge="end" color="inherit" aria-label="open drawer">
//                             <NotificationsIcon />
//                         </IconButton>

//                         <IconButton edge="end" color="inherit" aria-label="open drawer">
//                             <Avatar  sizes="small" style={{width: '20px', height: '20px'}} />
//                         </IconButton>
//                     </div>
//                     {/* <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton edge="end" color="inherit">
//             <MoreIcon />
//           </IconButton> */}
//                 </Toolbar>
//             </AppBar>
//         </React.Fragment>
//     );
// }
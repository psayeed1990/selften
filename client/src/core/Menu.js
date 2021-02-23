import React, { Fragment, useEffect, useState } from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '../common/material/drawerLeft/Drawer';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Logo from './../images/logo/Logo.png';
import TopSearch from './TopSearch';
//  import './menu.css';
import { Card, Container, Grid, CardContent, Button, Typography, Hidden } from '@material-ui/core';
import BottomMenu from './BottomMenu';


import MenuItems from './MenuItem';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: '400px',


    },
    iconButton: {
        padding: 10,
    },



    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: "1px solid lightgray"
    },
    inputRoot: {
        color: 'inherit',

    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));



const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


function PrimarySearchAppBar({ history }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );



    const guestRoutes = (
        <div>
            <Button>
                <Link

                    // style={isActive(history, "/user/login")}
                    style={{ color: 'black' }}
                    to="/user/login"
                    style={{ textDecoration: "none" }}
                >
                    <PersonAddIcon style={{ marginRight: "5px" }} />

                        Login/Sign-Up
                    </Link>

            </Button>
        </div>
    );

    const authRoutes = (
        <>

            <Hidden smDown>
{/* 
                <Link style={{ textDecoration: "none", marginRight: '30px' }}>
                    <Badge badgeContent={itemTotal()} color="primary">
                    <MailOutlineIcon/>
                    </Badge>
                </Link> */}


                <Link to="/cart" style={{ textDecoration: "none", marginRight: '30px' }}>
                    <Badge badgeContent={itemTotal()} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </Link>

                <Link  to="/user/messages" style={{ textDecoration: "none", marginRight: '30px' }}>
                    <Badge badgeContent={itemTotal()} color="primary">
                        <NotificationsIcon />
                    </Badge>
                </Link>
            </Hidden>



            {/* <Link
                className="nav-link"

                to="/cart"
            >
                <sup>
                    <ShoppingCartIcon/>
                    <small className="cart-badge">{itemTotal()}</small>
                </sup>
            </Link> */}



            {isAuthenticated() && isAuthenticated().user.role === 1 && (

                <Link
                    className="nav-link"

                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>

            )}
            <Hidden smDown>
                <MenuItems />
            </Hidden>

            {/* {

                <span
                    className="nav-link"
                    style={{cursor: "pointer"}}
                    onClick={() =>
                        signout(() => {
                            history.push("/");
                        })
                    }
                >
                    Signout
                </span>
            } */}
        </>

    )

    return (
        <div className={classes.grow}>
           
            <AppBar position="fixed" style={{ backgroundColor: 'white', color: "black", }} >
            <Container>
                <Toolbar className="toolBar">
                    <div className={classes.sectionMobile}>
                        <Drawer />
                    </div>
                    <Hidden smDown>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to='/'>
                            <img src={require('../images/logo/Logo.png')} style={{ width: "140px", marginLeft: '10px' }} />

                        </Link>
                    </Hidden>


                    <div className={`${classes.search} inputContainer`} style={{ height: "45px", marginLeft: '100px', border: '2px solid #BD1F58', borderRadius: '10px', backgroundColor: "#white", }}>
                        <InputBase
                            className={`${classes.input} topSearch`}
                            placeholder="Search "
                            // style={{width: "400px"}}
                            inputProps={{ 'aria-label': 'Search Products' }}
                        />
                        <IconButton type="submit" aria-label="search" style={{ height: "43px", backgroundColor: '#BD1F58', color: 'white', borderRadius: "0px 7px 6px 0px", marginRight: '-1px', marginTop: '-1px' }}>
                            <SearchIcon style={{ borderRadius: "none" }} />
                        </IconButton>

                    </div>
                    <Hidden smDown>
                    <div className={classes.grow} />
                    </Hidden>
                    <Hidden smDown>

                    <div style={{ display: "flex", alignItems: 'center' }}>
                        {isAuthenticated() ?
                            authRoutes :
                            guestRoutes
                        }

                    </div>
                    </Hidden>






                </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
           
        </div>
    );
}

export default withRouter(PrimarySearchAppBar);










// import React, {useEffect} from 'react';
// import "./menu.css";

// const Menu = () => {

//     useEffect(() => {
//         // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
//         window.onscroll = function () { scrollFunction() };

//         function scrollFunction() {
//             if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//                 document.getElementById("navbar").style.padding = "30px 10px";
//                 document.getElementById("logo").style.fontSize = "25px";
//             } else {
//                 document.getElementById("navbar").style.padding = "80px 10px";
//                 document.getElementById("logo").style.fontSize = "35px";
//             }
//         }
//     }, [])
//     return (
//         <div>
//             <div id="navbar">
//                 <a href="#default" id="logo">CompanyLogo</a>
//                 <div id="navbar-right">
//                     <a className="active" href="#home">Home</a>
//                     <a href="#contact">Contact</a>
//                     <a href="#about">About</a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Menu



// import React, { Fragment, useEffect, useState } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { signout, isAuthenticated } from "../auth";
// import { itemTotal } from "./cartHelpers";
// import Logo from './../images/logo/Logo.png';
// import TopSearch from './TopSearch';
// import './menu.css';
// import { Card, Container, Grid, CardContent, Button, Typography } from '@material-ui/core';
// import BottomMenu from './BottomMenu';


// const isActive = (history, path) => {
//     if (history.location.pathname === path) {
//         return { color: "#ff9900" };
//     } else {
//         return { color: "#ffffff" };
//     }
// };

// const Menu = ({ history }) => {

//     const toggleMenuView = (event) => {
//         event.preventDefault();
//         const userMenu = document.getElementById('user-menu')
//         if (userMenu.style.visibility === '') {
//             return userMenu.style.visibility = 'visible';
//         }
//         if (userMenu.style.visibility === 'visible') {
//             return userMenu.style.visibility = 'hidden';
//         } if (userMenu.style.visibility === 'hidden') {
//             return userMenu.style.visibility = 'visible';
//         }
//     }

//     useEffect(() => {
//         window.onscroll = function () { scrollFunction() };

//         function scrollFunction() {
//             if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//                 document.getElementById("topMenu").style.display = "none";
//                 // document.getElementById("logo").style.fontSize = "25px";
//             } else {
//                 document.getElementById("topMenu").style.display = "block";
//                 // document.getElementById("logo").style.fontSize = "35px";
//             }
//         }

//     }, [])

//     return (
//         <Fragment>
//             <div style={{ zIndex: 2000, position: "fixed", top: 0, left: 0, right: 0, }}>
//                 {/* start top bar */}
//                 <div className="top-bar wow" id="topMenu" style={{ padding: '5px' }}>
//                     <Container>
//                         <div style={{ padding: '7px' }}>
//                             <span className="top-bar-left" >
//                                 <img src="/images/icons/call-icon.svg" width="18" /><span>01301997184</span>
//                                 <img src="/images/icons/message-icon.svg" width="18" /><span>support@selften.com</span>

//                             </span>
//                             <span className="float-right" >
//                                 <img src="/images/icons/mobile-icon.svg" width="18" /><span>Mobile App is coming</span>

//                             </span>
//                         </div>
//                     </Container>

//                 </div>
//                 {/* end top bar */}


//                 {/* start menu */}
//                 <div style={{ boxShadow: '0 6px 4px #c8c3c32f', backgroundColor: 'white', }}>
//                     <Container>
//                         <div className="top-menu">
//                             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                                 {/* Logo */}
//                                 <div className="logo">
//                                     <Link
//                                         className=""
//                                         style={isActive(history, "/")}
//                                         to="/"
//                                     >
//                                         <img  src="/images/Logo.png" style={{width: '100px', height: 'auto'}} />
//                                     </Link>
//                                 </div>
//                                  {/* Search box top */}
//                             <TopSearch />
//                             <p>Login</p>
//                             </div>




//                             {/* user menu */}
//                             {/* <div className="menu-icon" onClick={toggleMenuView}><img src="/images/icons/menu.svg" width="22" /></div> */}
//                             <div className="user-menu" id="user-menu">
//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/shop")}
//                                         to="/shop"
//                                     >
//                                         Shop
//                         </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/cart")}
//                                         to="/cart"
//                                     >
//                                         Cart{" "}
//                                         <sup>
//                                             <small className="cart-badge">{itemTotal()}</small>
//                                         </sup>
//                                     </Link>
//                                 </li>
//                                 {isAuthenticated() && isAuthenticated().user.role === 0 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/user/dashboard")}
//                                             to="/user/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}

//                                 {isAuthenticated() && isAuthenticated().user.role === 1 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/admin/dashboard")}
//                                             to="/admin/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}
//                                 {isAuthenticated() ?
//                                     <Fragment>


//                                         <li className="nav-item">
//                                             <span
//                                                 className="nav-link"
//                                                 style={{ cursor: "pointer", color: "#ffffff" }}
//                                                 onClick={() =>
//                                                     signout(() => {
//                                                         history.push("/");
//                                                     })
//                                                 }
//                                             >
//                                                 Signout
//                             </span>
//                                         </li>
//                                     </Fragment>


//                                     :
//                                     <Fragment>
//                                         <li className="nav-item">

//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/user/login")}
//                                                 to="/user/login"
//                                             >
//                                                 Login
//                                 </Link>
//                                         </li>
//                                         <li className="nav-item">
//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/user/sign-up")}
//                                                 to="/user/sign-up"
//                                             >
//                                                 <img src="/images/icons/user-logged-out.svg" width="18" />
//                                      Sing up
//                                 </Link>
//                                         </li>
//                                     </Fragment>

//                                 }
//                             </div>
//                         </div>
//                     </Container>
//                 </div>
//                 {/* end menu */}


//             </div>

//             <BottomMenu />
//         </Fragment>
//     )
// };

// export default withRouter(Menu);








// // import React, {useEffect} from 'react';
// // import "./menu.css";

// // const Menu = () => {

// //     useEffect(() => {
// //         // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
// //         window.onscroll = function () { scrollFunction() };

// //         function scrollFunction() {
// //             if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
// //                 document.getElementById("navbar").style.padding = "30px 10px";
// //                 document.getElementById("logo").style.fontSize = "25px";
// //             } else {
// //                 document.getElementById("navbar").style.padding = "80px 10px";
// //                 document.getElementById("logo").style.fontSize = "35px";
// //             }
// //         }
// //     }, [])
// //     return (
// //         <div>
// //             <div id="navbar">
// //                 <a href="#default" id="logo">CompanyLogo</a>
// //                 <div id="navbar-right">
// //                     <a className="active" href="#home">Home</a>
// //                     <a href="#contact">Contact</a>
// //                     <a href="#about">About</a>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Menu



// import React, { Fragment, useEffect, useState } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { signout, isAuthenticated } from "../auth";
// import { itemTotal } from "./cartHelpers";
// import Logo from './../images/logo/Logo.png';
// import TopSearch from './TopSearch';
// import './menu.css';
// import { Card, Container, Grid, CardContent, Button, Typography } from '@material-ui/core';
// import BottomMenu from './BottomMenu';


// const isActive = (history, path) => {
//     if (history.location.pathname === path) {
//         return { color: "#ff9900" };
//     } else {
//         return { color: "#ffffff" };
//     }
// };

// const Menu = ({ history }) => {

//     const toggleMenuView = (event) => {
//         event.preventDefault();
//         const userMenu = document.getElementById('user-menu')
//         if (userMenu.style.visibility === '') {
//             return userMenu.style.visibility = 'visible';
//         }
//         if (userMenu.style.visibility === 'visible') {
//             return userMenu.style.visibility = 'hidden';
//         } if (userMenu.style.visibility === 'hidden') {
//             return userMenu.style.visibility = 'visible';
//         }
//     }

//     useEffect(() => {
//         window.onscroll = function() {scrollFunction()};

//         function scrollFunction() {
//           if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//             document.getElementById("topMenu").style.display = "none";
//             // document.getElementById("logo").style.fontSize = "25px";
//           } else {
//             document.getElementById("topMenu").style.display = "block";
//             // document.getElementById("logo").style.fontSize = "35px";
//           }
//         }

//     }, [])

//     return (
//         <Fragment>
//             <div style={{ zIndex: 2000, position: "fixed", top: 0, left: 0, right: 0,}}>
//                 {/* start top bar */}
//                 <div className="top-bar wow" id="topMenu" style={{padding: '5px'}}>
//                     <Container>
//                         <div style={{ padding: '7px' }}>
//                             <span className="top-bar-left" >
//                                 <img src="/images/icons/call-icon.svg" width="18" /><span>01301997184</span>
//                                 <img src="/images/icons/message-icon.svg" width="18" /><span>support@selften.com</span>

//                             </span>
//                             <span className="float-right" >
//                                 <img src="/images/icons/mobile-icon.svg" width="18" /><span>Mobile App is coming</span>

//                             </span>
//                         </div>
//                     </Container>

//                 </div>
//                 {/* end top bar */}


//                 {/* start menu */}
//                 <div style={{ boxShadow: '0 6px 4px #c8c3c32f', backgroundColor: 'white', }}>
//                     <Container>
//                         <div className="top-menu">

//                             {/* Logo */}
//                             <div className="logo">
//                                 <Link
//                                     className=""
//                                     style={isActive(history, "/")}
//                                     to="/"
//                                 >
//                                     <img src="/images/Logo.png" width="170" />
//                                 </Link>
//                             </div>

//                             {/* Search box top */}
//                             <TopSearch />

//                             {/* user menu */}
//                             <div className="menu-icon" onClick={toggleMenuView}><img src="/images/icons/menu.svg" width="22" /></div>
//                             <div className="user-menu" id="user-menu">
//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/shop")}
//                                         to="/shop"
//                                     >
//                                         Shop
//                         </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/cart")}
//                                         to="/cart"
//                                     >
//                                         Cart{" "}
//                                         <sup>
//                                             <small className="cart-badge">{itemTotal()}</small>
//                                         </sup>
//                                     </Link>
//                                 </li>
//                                 {isAuthenticated() && isAuthenticated().user.role === 0 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/user/dashboard")}
//                                             to="/user/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}

//                                 {isAuthenticated() && isAuthenticated().user.role === 1 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/admin/dashboard")}
//                                             to="/admin/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}
//                                 {isAuthenticated() ?
//                                     <Fragment>


//                                         <li className="nav-item">
//                                             <span
//                                                 className="nav-link"
//                                                 style={{ cursor: "pointer", color: "#ffffff" }}
//                                                 onClick={() =>
//                                                     signout(() => {
//                                                         history.push("/");
//                                                     })
//                                                 }
//                                             >
//                                                 Signout
//                             </span>
//                                         </li>
//                                     </Fragment>


//                                     :
//                                     <Fragment>
//                                         <li className="nav-item">

//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/user/login")}
//                                                 to="/user/login"
//                                             >
//                                                 Login
//                                 </Link>
//                                         </li>
//                                         <li className="nav-item">
//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/user/sign-up")}
//                                                 to="/user/sign-up"
//                                             >
//                                                 <img src="/images/icons/user-logged-out.svg" width="18" />
//                                      Sing up
//                                 </Link>
//                                         </li>
//                                     </Fragment>

//                                 }
//                             </div>
//                         </div>
//                     </Container>
//                 </div>
//                 {/* end menu */}

//                 <div className="row less-width">
//                     <Container>
//                         <div className="col-md-6">
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <Link
//                                         to="/"
//                                     >
//                                         <img className="logo" src={Logo} />
//                                     </Link>
//                                 </div>
//                                 {/* <div className="col-md-8">
//                         <Search />
//                     </div> */}
//                             </div>
//                         </div>
//                         <div className="col-md-5">
//                             <ul className="nav nav-tabs bg-primary">

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/")}
//                                         to="/"
//                                     >
//                                         Home
//                         </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/shop")}
//                                         to="/shop"
//                                     >
//                                         Shop
//                         </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link
//                                         className="nav-link"
//                                         style={isActive(history, "/cart")}
//                                         to="/cart"
//                                     >
//                                         Cart{" "}
//                                         <sup>
//                                             <small className="cart-badge">{itemTotal()}</small>
//                                         </sup>
//                                     </Link>
//                                 </li>

//                                 {isAuthenticated() && isAuthenticated().user.role === 0 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/user/dashboard")}
//                                             to="/user/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}

//                                 {isAuthenticated() && isAuthenticated().user.role === 1 && (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link"
//                                             style={isActive(history, "/admin/dashboard")}
//                                             to="/admin/dashboard"
//                                         >
//                                             Dashboard
//                             </Link>
//                                     </li>
//                                 )}

//                                 {!isAuthenticated() && (
//                                     <Fragment>
//                                         <li className="nav-item">
//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/signin")}
//                                                 to="/signin"
//                                             >
//                                                 Signin
//                                 </Link>
//                                         </li>

//                                         <li className="nav-item">
//                                             <Link
//                                                 className="nav-link"
//                                                 style={isActive(history, "/signup")}
//                                                 to="/signup"
//                                             >
//                                                 Signup
//                                 </Link>
//                                         </li>
//                                     </Fragment>
//                                 )}

//                                 {isAuthenticated() && (
//                                     <li className="nav-item">
//                                         <span
//                                             className="nav-link"
//                                             style={{ cursor: "pointer", color: "#ffffff" }}
//                                             onClick={() =>
//                                                 signout(() => {
//                                                     history.push("/");
//                                                 })
//                                             }
//                                         >
//                                             Signout
//                             </span>
//                                     </li>
//                                 )}
//                             </ul>
//                         </div>
//                     </Container>
//                 </div>
//             </div>

//             <BottomMenu/>
//         </Fragment>
//     )
// };

// export default withRouter(Menu);

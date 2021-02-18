import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Container, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../images/logo/Logo.png'
import './Footer.css'




const Footer = () => {
    return (
        <>
            <div id='footerScetion' style={{ paddingTop: '30px', }}>
                <div style={{ color: '#000' }}>
                    <Container>
                        <Grid container item spacing={4} justify='center'>
                            <Grid item sm={6} md={2}>
                                <Link to='/' id='footerLogo'>
                                    <img
                                        id='FooterLogoImg'
                                        style={{ width: '170px' }}
                                        src={logo}
                                        alt=""
                                    />
                                </Link>
                            </Grid>
                            <Grid item sm={6} md={7}>
                                <div style={{}}>
                                    <List dense={true} >
                                        <ListItem
                                            style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}
                                            className='responsiveCenter'
                                        >
                                            <Link to="/terms-condition" className="normalLink">
                                                <ListItemText
                                                    primary="Terms and Condition"
                                                />
                                            </Link>
                                            <span style={{ margin: '3px 5px' }}>
                                                |
                                        </span>
                                            <Link to="/privacy-policy" className="normalLink">
                                                <ListItemText
                                                    primary="Privacy Policy"
                                                />
                                            </Link>
                                            <span style={{ margin: '3px 5px' }}>
                                                |
                                        </span>
                                            <Link to="/shipment-info" className="normalLink">
                                                <ListItemText
                                                    primary="Shipment info"
                                                />
                                            </Link>
                                            <span style={{ margin: '3px 5px' }}>
                                                |
                                        </span>
                                            <Link to="/refund-return-policy" className="normalLink">
                                                <ListItemText
                                                    primary="Refund and Return Policy"
                                                />
                                            </Link>
                                            <span style={{ margin: '3px 5px' }}>
                                                |
                                        </span>
                                            <Link to="/about-us" className="normalLink">
                                                <ListItemText
                                                    primary="About Us"
                                                />
                                            </Link>
                                        </ListItem>
                                    </List>
                                </div>
                            </Grid>
                            <Grid item sm={6} md={3}>
                                <div className='socilaIcon'>
                                    <span>
                                        <a href='https://www.facebook.com/selften/' target="_blank" rel="noopener noreferrer">
                                            <FacebookIcon
                                                className="iconHover"
                                                style={{ fontSize: '30px', color: '#000' }}
                                            />
                                        </a>
                                    </span>
                                    <span>
                                        <a href='https://www.youtube.com/channel/UC1yaSj3ejk-11bMcZ-G4yNw' target="_blank" rel="noopener noreferrer">
                                            <YouTubeIcon
                                                className="iconHover"
                                                style={{ fontSize: '30px', color: '#000' }}
                                            />
                                        </a>
                                    </span>
                                    <span>
                                        <a href='/' target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon
                                                className="iconHover"
                                                style={{ fontSize: '30px', color: '#000' }}
                                            />
                                        </a>
                                    </span>
                                    <span>
                                        <a href='/' target="_blank" rel="noopener noreferrer">
                                            <InstagramIcon
                                                className="iconHover"
                                                style={{ fontSize: '30px', color: '#000' }}
                                            />
                                        </a>
                                    </span>
                                    <span>
                                        <a href='/' target="_blank" rel="noopener noreferrer">
                                            <WhatsAppIcon
                                                className="iconHover"
                                                style={{ fontSize: '30px', color: '#000' }}
                                            />
                                        </a>
                                    </span>
                                </div>
                            </Grid>

                            <Grid item md={8}>
                                <Typography id='footerInfo' style={{ margin: '15px 0' }}>
                                    Disclaimer: Registered names and trademarks are the copyright
                                    and property of their respective owners. Use of this Web site
                                    constitutes acceptance.
                            </Typography>
                            </Grid>
                            <Grid item md={4}>
                                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                                    <img
                                        src="/images/ssl.png"
                                        alt="footer-image"
                                        style={{ width: '170px' }}
                                    />
                                    <Typography variant='subtitle1'>
                                        Payment by SSL commerce
                                </Typography>
                                </div>
                            </Grid>

                          
                        </Grid>

                    </Container>

                </div>

            </div>

            {/* footer copyright text  */}
            <div
                style={{
                    padding: '2px 0',
                    color: '#000',
                    // backgroundColor:'#14191D',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    margin: '10px 0 0 0'
                }}
            >
                <p id='copyRightText'>
                    All Rights Reserved by @SELFTEN {(new Date()).getFullYear()}
                </p>
            </div>
          
        </>
    );
};

export default Footer;






// import React from 'react';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import YouTubeIcon from '@material-ui/icons/YouTube';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import { Container, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import logo from '../images/logo/Logo.png'
// import './Footer.css'



// const Footer = () => {
//     return (
//         <>
//         <div id='footerScetion' style={{ paddingTop: '30px',}}>
//             <div style={{ color: 'black' }}>
//                 <Container>

//                     <Grid container item spacing={4} justify='center'>

//                         <Grid item xs={12} sm={6} md={3}>
//                             <div className="footerTextCenter">
//                                 <Link to='/' id='footerLogo'>
//                                     <img 
//                                         id='FooterLogoImg' 
//                                         style={{ width: '170px' }} 
//                                         src={logo} 
//                                         alt="" 
//                                     />
//                                 </Link>

//                                 <Typography id='footerInfo' style={{ margin :'15px 0'}}>
//                                 Disclaimer: Registered names and trademarks are the copyright 
//                                 and property of their respective owners. Use of this Web site 
//                                 constitutes acceptance of the <Link exact to="/terms-condition">Terms and Condition</Link>
//                                 </Typography>
//                             </div>
//                         </Grid>

//                         <Grid item xs={12} sm={6} md={3}>
//                             <Typography 
//                                 style={{ textAlign: 'center', marginLeft: '-30px' }} className="footerResponsive" 
//                                 variant="h6"
//                              >
//                                SELFTEN.com
//                            </Typography>
//                             <div style={{ display: 'flex', justifyContent: 'center', flexDirection : 'column'}}>
//                                 <List dense={true} >
//                                     <ListItem 
//                                     style={{ display: 'flex', justifyContent: 'center',flexDirection : 'column'}}
//                                     >
//                                         <Link to="/privacy-policy" className="">
//                                             <ListItemText
//                                                 primary="Privacy Policy"
//                                             />
//                                         </Link>
//                                         <Link to="/shipment-info" className="">
//                                             <ListItemText
//                                                 primary="Shipment info"
//                                             />
//                                         </Link>
//                                         <Link to="/refund-return-policy" className="">
//                                             <ListItemText
//                                                 primary="Refund and Return Policy"
//                                             />
//                                         </Link>
//                                         <Link to="/about-us" className="">
//                                             <ListItemText
//                                                 primary="About Us"
//                                             />
//                                         </Link>
//                                     </ListItem>
//                                 </List>
//                             </div>
//                         </Grid>

//                         <Grid item xs={12} sm={6} md={3} >
//                             <Typography style={{ textAlign: 'center', marginLeft: '-52px' }} className="footerResponsive2" variant="h6">
//                                 Payment
//                            </Typography>
//                            <div >
//                                 <img 
//                                     src="/images/ssl.png" 
//                                     alt="footer-image" 
//                                     style={{width : '170px'}}
//                                 />
//                                 <Typography variant='subtitle1'> 
//                                     Payment by SSL commerce 
//                                 </Typography>
//                             </div>

//                             {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <List dense={true} >
//                                     <ListItem >
//                                         <Link className="backgroundLink" to='privacy'>
//                                             <ListItemText
//                                                 primary="Privacy Policy"
//                                             />
//                                         </Link>
//                                     </ListItem>
//                                     <ListItem >
//                                         <Link to='/plan' className='backgroundLink'>
//                                             <ListItemText
//                                                 primary="Plan"
//                                             />
//                                         </Link>
//                                     </ListItem>
//                                     <ListItem >
//                                         <Link className="backgroundLink" to='terms'>
//                                             <ListItemText
//                                                 primary="Terms and Conditions"
//                                             />
//                                         </Link>
//                                     </ListItem>
//                                     <ListItem >
//                                         <ListItemText
//                                             primary="Copyright Policy"
//                                         />
//                                     </ListItem>
//                                     <ListItem >
//                                         <ListItemText
//                                             primary="Careers"
//                                         />
//                                     </ListItem>
//                                 </List>
//                             </div> */}
//                         </Grid>

//                         <Grid item xs={12} sm={6} md={2} >
//                         <Typography style={{ textAlign: 'center', marginLeft: '-52px' }} className="footerResponsive2" variant="h6">
//                             Follow us
//                         </Typography>

//                         <div className ='socilaIcon'>
//                             <span>
//                                 <a href='https://www.facebook.com/selften/' target="_blank"  rel="noopener noreferrer">
//                                     <FacebookIcon className="iconHover" />
//                                 </a>
//                             </span>

//                             {/* <span>
//                                 <a href='https://www.linkedin.com/company/flog-app/' target="_blank" rel="noopener noreferrer">
//                                     <LinkedInIcon className="iconHover" />
//                                 </a>

//                             </span> */}

//                             {/* <span>
//                                 <a href='https://www.instagram.com/flogapp/' target="_blank" rel="noopener noreferrer">
//                                     <InstagramIcon className="iconHover" />
//                                 </a>
//                             </span> */}

//                             <span>
//                                 <a href='https://www.youtube.com/channel/UC1yaSj3ejk-11bMcZ-G4yNw' target="_blank" rel="noopener noreferrer">
//                                     <YouTubeIcon className="iconHover"/>
//                                 </a>
//                             </span>
//                             {/* <span>
//                                 <a href="https://wa.me/971555234687" target="_blank" rel="noopener noreferrer">
//                                     <WhatsAppIcon className="iconHover" />
//                                 </a>
//                             </span> */}

//                             </div> 
//                         </Grid>

//                     </Grid>

//                 </Container>

//             </div>

//         </div>

//     {/* footer copyright text  */}
//             <div style={{ padding: '2px 0', color:'#2F3C7F', backgroundColor:'#fff', textAlign: 'center' }} >
//                 <p id='copyRightText'> 
//                     All Rights Reserved by @SELFTEN {(new Date()).getFullYear()}
//                 </p>
//             </div>
//         </>
//     );
// };

// export default Footer;







// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // import { Card, Container, Grid, CardContent, Button, Typography } from '@material-ui/core';
// // const Footer = ()=> {
// //     return (
// //         <div id="footer" className="row">
// //             <Container>
// //                 <div className="row">
// //             <div className="col-md-6">
// //                 <h5 className="site-name-footer">© 2020 SELFTEN.com</h5>

// //                 <p>Disclaimer: Registered names and trademarks are the copyright 
// //                     and property of their respective owners. Use of this Web site 
// //                     constitutes acceptance of the <Link exact to="/terms-condition">Terms and Condition</Link>
// //                     <Link exact to="/privacy-policy">Privacy Policy</Link>,
// //                     <Link exact to="/shipment-info">Shipment info</Link>,
// //                     <Link exact to="/refund-return-policy">Refund and Return Policy</Link> &
// //                     <Link exact to="/about-us">About Us</Link>
// //                 </p>

// //             </div>
// //             <div className="col-md-3">
// //                 <h5>Follow us</h5>
// //                 <a exact href="https://www.youtube.com/channel/UC1yaSj3ejk-11bMcZ-G4yNw">YouTube</a>
// //                 <a exact href="https://www.facebook.com/selften/">Facebook</a>
// //             </div>
// //             <div className="col-md-3">
// //                 <img src="/images/ssl.png" width="120" />
// //                 <p>Payment by SSL commerce</p>
// //             </div>
// //             </div>
// //             </Container>
// //         </div>
// //     )
// // }

// // export default Footer;
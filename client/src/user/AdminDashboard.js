import React, { useContext, useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import './adminDashboard.css';
import { NotificationsContext } from "../context/notificationsContext";
import { updateUserProfile, getUserProfile } from "./apiUser";
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LockIcon from '@material-ui/icons/Lock';

export const AdminLinks = () => {
    const [notifications, setNotifications] = useContext(NotificationsContext);
    const toggleMenuView = (event)=>{
        event.preventDefault();
        const userMenu = document.getElementById('admin-links')
        if(userMenu.style.display === ''){
            return userMenu.style.display = 'block';
        }
        if(userMenu.style.display === 'block'){
            return userMenu.style.display = 'none';
        }if(userMenu.style.display === 'none'){
            return userMenu.style.display = 'block';
        }
    }
    return ( 
        <Fragment>
            <div id="dashboard-menu" className="cursor-pointer" onClick={toggleMenuView}>
                <img src="/images/icons/menu.svg" width="23" /> Dashboard Menu
            </div>

            <div className="card" id="admin-links" style={{marginTop:'20px'}}>
            <h4 className="card-header">Admin Links</h4>
           
            <ul className="list-group">
            <li className="list-group-item">
                <Link className="nav-link" to="/admin/assigned-topup-orders">
                        Assigned topup orders
                 </Link>
            </li>
             <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/topup-orders">
                        See New Topup Orders
                    </Link>
                </li>
            <li className="list-group-item">
                <Link exact className="nav-link" to="/admin/messages">
                        See messages <sup className="notifications">{ notifications }</sup>
                 </Link>
            </li>
            <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/refill-wallet">
                        Wallet
                    </Link>
                </li>

            <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/balance-stock">
                        Stocks for topup
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/diamond-value">
                        Diamond or Purchase Point
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/add-coupons">
                        Add coupons
                    </Link>
                </li>
                 <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/recharge-package">
                        Create Recharge Package
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact  className="nav-link" to="/admin/topup">
                        Create Game for Topup
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/add-slider">
                        Create Slider
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/see-your-topup-orders">
                        Your topup orders
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link exact className="nav-link" to="/create/category">
                        Create Category
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/create/product">
                        Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/orders">
                        View Orders
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link exact className="nav-link" to="/admin/products">
                        Manage Products
                    </Link>
                </li>
               
               
                
            </ul>
        </div>
        </Fragment>
        
    );
};

const AdminDashboard = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postCode: '',
        city: '',
        about:'',
        loading: '',
        error: '',
        updated: '',
        verified: '',
        formData: '',
    });

    const {
        name,
        email,
        phone,
        address,
        postCode,
        city,
        about,
        loading,
        error,
        updated,
        verified,
        formData,
    } = values;

    const [edit , setEdit] = useState(false)

    const init = async ()=>{
        const data = await getUserProfile(user, token);
        
        setValues({...values, formData: new FormData(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            postCode: data.postCode,
            city: data.city,
            about:data.about,
            verified: data.verified,
        })
        
        
        
    }

    useEffect(()=>{
        init();
    },[])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const updateProfile = async (event)=>{
        event.preventDefault();
        try{
            setValues({...values, loading: true})
            const newUser = await updateUserProfile(user, token, formData);
            
            if (newUser.error){
                return setValues({...values, error: newUser.error})
            }
            setValues({...values, loading: false, updated: 'Profile'});
        }catch(err){
            console.log(err);
        }

    }

        const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            <Typography variant='caption'> 
                {error}
            </Typography>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: updated ? '' : 'none' }}>
            <Typography variant='caption'> 
                {`${updated}`} - successfully updated
            </Typography>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );


    const adminInfo = () => {
        return (

            <>
                <Container className="customSize" style={{border : '1px solid #e6e6e6' , padding : '30px' , borderRadius : '15px'}}>
                <Grid item md={12} sm={12} className='fullWidth'>
                               <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                                    <Typography variant ="subtitle1" >
                                       <span>
                                           <AccountBoxIcon />
                                        </span> Admin Information
                                    </Typography>


                                    {
                                        edit ? 
                                        <Button 
                                            onClick={updateProfile}
                                            type="submit"
                                            variant= 'contained' 
                                            style={{ backgroundColor : '#f1005f' , color : '#fff', outline: 'none'}}
                                        >
                                            SAVE
                                        </Button>
                                    : 
                                    <Button 
                                        onClick={() => setEdit(true)}
                                        variant= 'contained' 
                                        style={{ backgroundColor : '#f1005f' , color : '#fff', outline: 'none'}}
                                    >
                                        EDIT
                                    </Button>
                                    }
                               </div>

                               <Divider style = {{ margin : '15px 0' }}/>
                            </Grid>
                    <form onSubmit={ updateProfile}>
                        <Grid container item md={12} sm={12} className='fullWidth'>
                            <div>
                                {
                                    edit ? 
                                    <Grid container item md={12}>
                                        <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid item md={2} sm={3} 
                                    style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Username
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            {name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'> 
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Email 
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth' style={{fontSize : '12px'}}>
                                        {email}
                                        <span>
                                            <VerifiedUserIcon style={{marginLeft: '6px', color: '#88e32b', fontSize: '16px'}}/>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' ,alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Mobile Number
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <Typography variant="subtitle1" style={{fontSize : '12px'}}>
                                            {phone}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Full Name
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            // label="Email"
                                            variant="outlined"
                                            onChange={handleChange('name')} 
                                            type="text" 
                                            value={name} 
                                            style={{margin : '10px 0' , fontSize: '12px', textTransform: 'capitalize'}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid container item md={12} className='fullWidth'>
                                <Grid item md={4}></Grid>
                                <Grid item md={8} sm={12} className='fullWidth' style={{marginTop: '-12px'}}>
                                    <Typography variant= 'caption' style={{fontSize : '12px', marginLeft: '-17px', color: '#817b90'}}>
                                        Please Enter Your Real Full Name exactly the same as your name on your passport
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth'>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'flex-start'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Address
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid container md={8} sm={9} className='fullWidth'>
                                        <Grid md={12} sm={12} className='fullWidth'>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                rows = '6'
                                                multiline
                                                variant="outlined"
                                                onChange={handleChange('address')} 
                                                type="text" 
                                                value={address} 
                                                style={{margin : '10px 0' , fontSize: '12px'}}
                                            />
                                        </Grid>
                                        <Grid container md={12} sm={12} spacing={2} className='fullWidth'>
                                            <Grid item md={6} sm={6} className='fullWidth'>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Country"
                                                    variant="outlined"
                                                    onChange={handleChange('name')} 
                                                    type="text" 
                                                    value={name} 
                                                    style={{margin : '10px 0' , fontSize : '12px'}}
                                                />
                                            </Grid>
                                            <Grid item md={6} sm={6} className='fullWidth'>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="State"
                                                    variant="outlined"
                                                    onChange={handleChange('name')} 
                                                    type="text" 
                                                    value={name} 
                                                    style={{margin : '10px 0', fontSize : '12px'}}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container md={12} sm={12} spacing={2} className='fullWidth'>
                                            <Grid item md={6} sm={6} className='fullWidth'>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="City"
                                                    variant="outlined"
                                                    onChange={handleChange('city')} 
                                                    type="text" 
                                                    value={city} 
                                                    style={{margin : '10px 0', fontSize: '12px'}}
                                                />
                                            </Grid>
                                            <Grid item md={6} sm={6} className='fullWidth'>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Post Code"
                                                    variant="outlined"
                                                    onChange={handleChange('postCode')} 
                                                    type="text" 
                                                    value={postCode} 
                                                    style={{margin : '10px 0', fontSize: '12px'}}
                                                />
                                            </Grid>
                                        </Grid>
                                       
                                    </Grid>
                                </Grid>
                            </Grid>
                                    </Grid>
                                    
                                    : 
                                    
                                    
                                    <Grid container item md={12}>

                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid item md={2} sm={3} 
                                    style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Username
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            {name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'> 
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Email
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth' style={{fontSize : '12px'}}>
                                        {email}
                                        <span>
                                            <VerifiedUserIcon style={{marginLeft: '6px',color: '#88e32b' , fontSize: '16px' }}/>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' ,alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Mobile Number
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <Typography variant="subtitle1" style={{fontSize : '12px'}}>
                                            +88{phone}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
               
                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth' style={{margin:"10px 0"}}>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'center'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Full Name
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid md={8} sm={9} className='fullWidth'>
                                        <Typography variant='subtitle1'
                                         style={{ textTransform : 'capitalize' , fontSize: '12px'}}
                                         >
                                            {name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={1} ></Grid>
                            <Grid item md={11} sm={12} className='fullWidth'>
                                <Grid container item md={12} sm={12} className='fullWidth'>
                                    <Grid md={2} sm={3} style={{display : 'flex' , alignItems : 'flex-start'}} className='fullWidth'>
                                        <Typography variant='subtitle1' style={{fontSize : '12px'}}>
                                            Address
                                        </Typography>
                                    </Grid>

                                    <Grid item md={1} ></Grid>
                                    <Grid container md={8} sm={9} className='fullWidth'>
                                   
                                    </Grid>
                                </Grid>
                            </Grid>
                                    </Grid>
                                   
                                }
                            </div>






               
                            
                            
               
                        </Grid>
                    </form>
               
                   
                </Container>

{/* password change option */}
                <Container style={{border : '1px solid #e6e6e6' , padding : '30px', marginTop : '20px', borderRadius : '15px'}}>
                <Grid item md={12}>
                    <div>
                        <Typography variant ="subtitle1">
                            <span>
                                <SecurityIcon />
                            </span> Security
                        </Typography>
                    </div>
                    <Divider style = {{ margin : '15px 0' }}/>

                    <Grid container item md={12} sm={12} style={{display : 'flex', justifyContent : 'center', padding: '30px 0'}}>
                    <Link to='/changePassword' style={{textDecoration: 'none' , color : '#00000040'}}>
                        <Card style={{boxShadow: 'none' , border: '1px solid #e5e5e5'}}>
                            <CardContent style={{display : 'flex' , flexDirection : 'column' , alignItems: 'center'}}>
                                <span>
                                    <LockIcon style={{fontSize : '4em' , color : '#bfbfbf'}}/>
                                </span>
                                <Typography variant="subtitle1" style={{color : '#00000040'}}>
                                    Change Password
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    </Grid>

                   
                </Grid>
            </Container>
           </> 

        //    <>
        //         <Container className="customSize" style={{border : '1px solid #e6e6e6' , padding : '30px' , borderRadius : '15px'}}>
        //             <form onSubmit={updateProfile}>
        //                 <Grid container item md={12} sm={12} className='fullWidth'>
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
        //                             <Typography variant ="subtitle1" >
        //                                <span>
        //                                    <AccountBoxIcon />
        //                                 </span> User Information
        //                             </Typography>
        //                             <Button type="submit" variant= 'contained' color="primary">
        //                                 SAVE
        //                             </Button>
        //                        </div>
        //                        <Divider style = {{ margin : '15px 0' }}/>
        //                     </Grid>
               
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                         <Grid container item md={12} sm={12} className='fullWidth'>
        //                             <Grid md={3} sm={3} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} className='fullWidth'>
        //                                 <Typography variant='subtitle1'>
        //                                     Username
        //                                 </Typography>
        //                             </Grid>
        //                             <Grid md={9} sm={9} className='fullWidth'>
        //                                 <TextField
        //                                     fullWidth
        //                                     id="outlined-basic"
        //                                     // label="Email"
        //                                     variant="outlined"
        //                                     onChange={handleChange('name')} 
        //                                     type="text" 
        //                                     value={name} 
        //                                     style={{margin : '10px 0'}}
        //                                 />
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
               
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                         <Grid container item md={12} sm={12} className='fullWidth'> 
        //                             <Grid md={3} sm={3} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} className='fullWidth'>
        //                                 <Typography variant='subtitle1'>
        //                                     Email
        //                                 </Typography>
        //                             </Grid>
        //                             <Grid md={9} sm={9} className='fullWidth'>
        //                                 <TextField
        //                                     fullWidth
        //                                     id="outlined-basic"
        //                                     // label="Email"
        //                                     variant="outlined"
        //                                     onChange={handleChange('email')} 
        //                                     type="text" 
        //                                     value={email} 
        //                                     style={{margin : '10px 0'}}
        //                                 />
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
               
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                         <Grid container item md={12} sm={12} className='fullWidth'>
        //                             <Grid md={3} sm={3} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} className='fullWidth'>
        //                                 <Typography variant='subtitle1'>
        //                                     Mobile Number
        //                                 </Typography>
        //                             </Grid>
        //                             <Grid md={9} sm={9} className='fullWidth'>
        //                                 <TextField
        //                                     fullWidth
        //                                     id="outlined-basic"
        //                                     // label="Email"
        //                                     variant="outlined"
        //                                     onChange={handleChange('phone')} 
        //                                     type="text" 
        //                                     value={phone} 
        //                                     style={{margin : '10px 0'}}
        //                                 />
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
               
               
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                         <Grid container item md={12} sm={12} className='fullWidth'>
        //                             <Grid md={3} sm={3} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} className='fullWidth'>
        //                                 <Typography variant='subtitle1' >
        //                                     Full Name
        //                                 </Typography>
        //                             </Grid>
        //                             <Grid md={9} sm={9} className='fullWidth'>
        //                                 <TextField
        //                                     fullWidth
        //                                     id="outlined-basic"
        //                                     // label="Email"
        //                                     variant="outlined"
        //                                     onChange={handleChange('name')} 
        //                                     type="text" 
        //                                     value={name} 
        //                                     style={{margin : '10px 0'}}
        //                                 />
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
               
        //                     <Grid container item md={12} className='fullWidth'>
        //                         <Grid item md={3}></Grid>
        //                         <Grid item md={9} sm={12} className='fullWidth'>
        //                             <Typography variant='subtitle1'>
        //                                 Please Enter Your Real Full Name exactly the same as your name on your passport
        //                             </Typography>
        //                         </Grid>
        //                     </Grid>
               
        //                     <Grid item md={12} sm={12} className='fullWidth'>
        //                         <Grid container item md={12} sm={12} className='fullWidth'>
        //                             <Grid md={3} sm={3} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'flex-start'}} className='fullWidth'>
        //                                 <Typography variant='subtitle1'>
        //                                     Address
        //                                 </Typography>
        //                             </Grid>
        //                             <Grid container md={9} sm={9} className='fullWidth'>
        //                                 <Grid md={12} sm={12} className='fullWidth'>
        //                                     <TextField
        //                                         fullWidth
        //                                         id="outlined-basic"
        //                                         rows = '6'
        //                                         multiline
        //                                         variant="outlined"
        //                                         onChange={handleChange('address')} 
        //                                         type="text" 
        //                                         value={address} 
        //                                         style={{margin : '10px 0'}}
        //                                     />
        //                                 </Grid>
        //                                 <Grid container md={12} sm={12} spacing={2} className='fullWidth'>
        //                                     <Grid item md={6} sm={6} className='fullWidth'>
        //                                         <TextField
        //                                             fullWidth
        //                                             id="outlined-basic"
        //                                             label="Country"
        //                                             variant="outlined"
        //                                             onChange={handleChange('name')} 
        //                                             type="text" 
        //                                             value={name} 
        //                                             style={{margin : '10px 0'}}
        //                                         />
        //                                     </Grid>
        //                                     <Grid item md={6} sm={6} className='fullWidth'>
        //                                         <TextField
        //                                             fullWidth
        //                                             id="outlined-basic"
        //                                             label="state"
        //                                             variant="outlined"
        //                                             onChange={handleChange('name')} 
        //                                             type="text" 
        //                                             value={name} 
        //                                             style={{margin : '10px 0'}}
        //                                         />
        //                                     </Grid>
        //                                 </Grid>
        //                                 <Grid container md={12} sm={12} spacing={2} className='fullWidth'>
        //                                     <Grid item md={6} sm={6} className='fullWidth'>
        //                                         <TextField
        //                                             fullWidth
        //                                             id="outlined-basic"
        //                                             label="city"
        //                                             variant="outlined"
        //                                             onChange={handleChange('city')} 
        //                                             type="text" 
        //                                             value={city} 
        //                                             style={{margin : '10px 0'}}
        //                                         />
        //                                     </Grid>
        //                                     <Grid item md={6} sm={6} className='fullWidth'>
        //                                         <TextField
        //                                             fullWidth
        //                                             id="outlined-basic"
        //                                             label="postCode"
        //                                             variant="outlined"
        //                                             onChange={handleChange('postCode')} 
        //                                             type="text" 
        //                                             value={postCode} 
        //                                             style={{margin : '10px 0'}}
        //                                         />
        //                                     </Grid>
        //                                 </Grid>
                                       
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
                            
               
        //                 </Grid>
        //             </form>
               
                   
        //         </Container>
        //         <Container style={{border : '1px solid #e6e6e6' , padding : '30px', marginTop : '20px', borderRadius : '15px'}}>
        //              <Grid item md={12}>
        //                 <div>
        //                     <Typography variant ="subtitle1" >
        //                         <span>
        //                             <SecurityIcon />
        //                         </span> Security
        //                     </Typography>
        //                 </div>
        //                 <Divider style = {{ margin : '15px 0' }}/>
        //             </Grid>
        //         </Container>
        //    </>         
        );
    };




    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                
                <div className="col-md-3">
                    <AdminLinks />
                </div>
              
                <div className="col-md-9">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;




// import React, { useContext, useState, useEffect, Fragment } from "react";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
// import './adminDashboard.css';
// import { NotificationsContext } from "../context/notificationsContext";
// import { updateUserProfile, getUserProfile } from "./apiUser";


// export const AdminLinks = () => {
//     const [notifications, setNotifications] = useContext(NotificationsContext);
//     const toggleMenuView = (event)=>{
//         event.preventDefault();
//         const userMenu = document.getElementById('admin-links')
//         if(userMenu.style.display === ''){
//             return userMenu.style.display = 'block';
//         }
//         if(userMenu.style.display === 'block'){
//             return userMenu.style.display = 'none';
//         }if(userMenu.style.display === 'none'){
//             return userMenu.style.display = 'block';
//         }
//     }
//     return ( 
//         <Fragment>
//             <div id="dashboard-menu" className="cursor-pointer" onClick={toggleMenuView}>
//                 <img src="/images/icons/menu.svg" width="23" /> Dashboard Menu
//             </div>

//             <div className="card" id="admin-links">
//             <h4 className="card-header">Admin Links</h4>
           
//             <ul className="list-group">
//             <li className="list-group-item">
//                 <Link className="nav-link" to="/admin/assigned-topup-orders">
//                         Assigned topup orders
//                  </Link>
//             </li>
//              <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/topup-orders">
//                         See New Topup Orders
//                     </Link>
//                 </li>
//             <li className="list-group-item">
//                 <Link exact className="nav-link" to="/admin/messages">
//                         See messages <sup className="notifications">{ notifications }</sup>
//                  </Link>
//             </li>
//             <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/refill-wallet">
//                         Wallet
//                     </Link>
//                 </li>

//             <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/balance-stock">
//                         Stocks for topup
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/diamond-value">
//                         Diamond or Purchase Point
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/add-coupons">
//                         Add coupons
//                     </Link>
//                 </li>
//                  <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/recharge-package">
//                         Create Recharge Package
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact  className="nav-link" to="/admin/topup">
//                         Create Game for Topup
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/add-slider">
//                         Create Slider
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/see-your-topup-orders">
//                         Your topup orders
//                     </Link>
//                 </li>

//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/create/category">
//                         Create Category
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/create/product">
//                         Create Product
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/orders">
//                         View Orders
//                     </Link>
//                 </li>
//                 <li className="list-group-item">
//                     <Link exact className="nav-link" to="/admin/products">
//                         Manage Products
//                     </Link>
//                 </li>
               
               
                
//             </ul>
//         </div>
//         </Fragment>
        
//     );
// };

// const AdminDashboard = () => {
//     const {user, token} = isAuthenticated();
//     const [values, setValues] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         postCode: '',
//         city: '',
//         about:'',
//         loading: '',
//         error: '',
//         updated: '',
//         verified: '',
//         formData: '',
//     });

//     const {
//         name,
//         email,
//         phone,
//         address,
//         postCode,
//         city,
//         about,
//         loading,
//         error,
//         updated,
//         verified,
//         formData,
//     } = values;

//     const init = async ()=>{
//         const data = await getUserProfile(user, token);
        
//         setValues({...values, formData: new FormData(),
//             name: data.name,
//             email: data.email,
//             phone: data.phone,
//             address: data.address,
//             postCode: data.postCode,
//             city: data.city,
//             about:data.about,
//             verified: data.verified,
//         })
        
        
        
//     }

//     useEffect(()=>{
//         init();
//     },[])

//     const handleChange = name => event => {
//         const value = name === 'photo' ? event.target.files[0] : event.target.value;
//         formData.set(name, value);
//         setValues({ ...values, [name]: value });
//     };

  

//     const updateProfile = async (event)=>{
//         event.preventDefault();

//         try{

            
//             setValues({...values, loading: true})
//             const newUser = await updateUserProfile(user, token, formData);
            
//             if (newUser.error){
//                 return setValues({...values, error: newUser.error})
//             }
//             setValues({...values, loading: false, updated: 'Profile'});
            
            
//         }catch(err){
//             console.log(err);
//         }

//     }

//         const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );

//     const showSuccess = () => (
//         <div className="alert alert-info" style={{ display: updated ? '' : 'none' }}>
//             <h2>{`${updated}`} - successfully updated</h2>
//         </div>
//     );

//     const showLoading = () =>
//         loading && (
//             <div className="alert alert-success">
//                 <h2>Loading...</h2>
//             </div>
//         );


//     const adminInfo = () => {
//         return (
//             <div className=" dashboard-form">
//                 <h3 className="">User Information</h3>

//                 <form onSubmit={updateProfile} >
//                     <div className="form-group">
//                         <label className="text-muted">Name</label>
//                         <input onChange={handleChange('name')} type="text" className="form-control" name="name" value={name} />
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">Email</label>
//                         <input onChange={handleChange('email')} type="text" className="form-control" name="email" value={email} />
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">Phone</label>
//                         <input onChange={handleChange('phone')} type="text" className="form-control" name="phone" value={phone} />
//                     { verified ?
//                         <p className="time">Phone Verified</p>
//                         :
//                         <Link exact to="/verify-phone" >Phone verification is necessary</Link>
//                     }
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">Address</label>
//                         <input onChange={handleChange('address')} type="text" className="form-control" name="address" value={address} />
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">Postal Code</label>
//                         <input onChange={handleChange('postCode')} type="text" className="form-control" name="postCode" value={postCode} />
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">City</label>
//                         <input onChange={handleChange('city')} type="text" className="form-control" name="city" value={city} />
//                     </div>
//                     <div className="form-group">
//                         <label className="text-muted">About</label>
//                         <textarea onChange={handleChange('about')} type="text" className="form-control" name="about" value={about} >{about}</textarea>
//                     </div>

//                    <input type="submit" className="btn-primary submit-btn" value="Update Profile" />
                    

//                 </form>

                
//             </div>
//         );
//     };




//     return (
//         <Layout
//             title="Dashboard"
//             description={`G'day ${name}!`}
//             className="container-fluid"
//         >
//             <div className="row">
                
//                 <div className="col-md-3">
//                     <AdminLinks />
//                 </div>
              
//                 <div className="col-md-9">
//                     {showLoading()}
//                     {showSuccess()}
//                     {showError()}
//                     {adminInfo()}</div>
//             </div>
//         </Layout>
//     );
// };

// export default AdminDashboard;

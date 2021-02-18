import { Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/Logo.png'


const ChangePassword = () => {

    const [password , SetPassword] = useState({
        password: '',
        newPassword : '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        message: "",
    })

    const handleChange = (name) => event => {
        SetPassword({...password , [name] : event.target.value})
    }

    const handleSubmit = (e) => {
        if (password.newPassword.length < 8) {
            setErrors("Password length should be greater than 8.")
        } else if (password.newPassword !== password.confirmPassword) {
            setErrors("Passwords do not match.")
        } else {
            console.log(password)
        }
       

        e.preventDefault()
    }

    console.log(errors);

    return (
        <div style={{backgroundColor: '#fbfbfb'}}>
            <Container style={{padding: '50px 0'}}>
                <Grid container item md={12}>
                    <Grid item md={12} style={{display : 'flex' , justifyContent: 'center'}}>
                        <Link to='/'>
                            <img 
                                src={logo} 
                                alt="change password" 
                                style={{width: '150px'}}
                            />
                        </Link>
                    </Grid>
                    <Grid 
                        item md={12} 
                        style={{
                            display : 'flex', 
                            justifyContent: 'center',
                            marginTop : '50px',
                            marginButton: '20px'
                        }}
                    >
                        <Typography variant='h6'>
                            Change Password 
                        </Typography>
                        <Typography variant='h5' style={{marginLeft : '10px' , color : '#e4003d'}}>
                            SELFTEN
                        </Typography>
                    </Grid>
            
                    <Grid container item md={12} style={{margin: '20px 0'}}>
                        <Grid item md={3}></Grid>
                        <Grid item md={6}>
                            <form onSubmit={handleSubmit}>
                                <Grid container item  md={12} 
                                style={{width: '100%', display : 'flex' , alignItems:'center' , justifyContent: 'center', padding: '5px 0'}}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1' style={{fontSize: '12px'}}> 
                                            Original Password
                                            <span style={{color: 'red'}}>*</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} >
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            placeholder="Original Password"
                                            variant="outlined"
                                            onChange={handleChange('password')} 
                                            type="text" 
                                            value={password.password} 
                                            // style={{padding: '7px', fontSize: '12px'}}
                                            size="small"
                                        />
                                    </Grid>
            
                                    <Grid item md={3}></Grid>
                                    <Grid item md={9} style={{}}>
                                        <Typography variant='caption' style={{fontSize: '12px',  color: '#817b90'}}>
                                            Type in your original password.
                                        </Typography>
                                    </Grid>
                                </Grid>
            
            
                                <Grid container item  md={12} style={{width: '100%', display : 'flex' , alignItems:'center' , justifyContent: 'center', padding: '5px 0'}}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1' style={{fontSize: '12px'}}> 
                                            New Password
                                            <span style={{color: 'red'}}>*</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            placeholder="New Password"
                                            variant="outlined"
                                            onChange={handleChange('newPassword')} 
                                            type="text" 
                                            size="small"
                                            value={password.newPassword} 
                                            // style={{margin : '10px 0', fontSize: '12px'}}
                                        />
                                         
                                    </Grid>
                                    <Grid item md={3}></Grid>
                                    <Grid item md={9} style={{ color: '#817b90'}}>
                                        <Typography variant='caption' style={{fontSize: '12px'}}>
                                             Password requirement: 6-20 characters, combination of capital and small letters and number. Special characters ?"´= not allowed. Example Abc123.
                                        </Typography>
                                    </Grid>
                                </Grid>
            
            
                                <Grid container item  md={12} style={{width: '100%' , display : 'flex' , alignItems:'center' , justifyContent: 'center', padding: "5px 0"}}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1' style={{fontSize: '12px'}}> 
                                            Confirm Password
                                            <span style={{color: 'red'}}>*</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            placeholder="Confirm Password"
                                            variant="outlined"
                                            size="small"
                                            onChange={handleChange('confirmPassword')} 
                                            type="text" 
                                            value={password.confirmPassword} 
                                            style={{fontSize: '12px'}}
                                        />
                                    </Grid>
                                    <Grid item md={3} ></Grid>
                                    <Grid item md={9} style={{color: '#817b90'}}>
                                        <Typography variant='caption' style={{fontSize: '12px'}}>
                                            Type in your password again for verification purposes.
                                        </Typography>
                                    </Grid>
                                </Grid>
            
                                <Grid item md={12} style={{display: 'flex' , justifyContent: 'center'}}>
                                    <Button 
                                        onClick={handleSubmit}
                                        variant='contained' 
                                        style={{backgroundColor: '#e4003d', color: '#fff' , margin: '20px 0', outline: 'none'}}
                                    >
                                        SAVE
                                    </Button>
                                </Grid>
            
                            </form>
                        </Grid>
                        <Grid item md={3}></Grid>
            
                    </Grid>
            
                </Grid>
            </Container>
        </div>
    );
};

export default ChangePassword;
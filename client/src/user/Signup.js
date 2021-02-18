import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup, verifyOTP } from '../auth';
import ResendOTP from './ResendOTP';
import './signup.css';
import { Button, Card } from '@material-ui/core';


const Signup = () => {
    const [sendOTP, setSendOTP] = useState(false);
    const [userPhone, setUserPhone] = useState('');
    const [values, setValues] = useState({
        otp:'',
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        postCode: '',
        city: '',
        error: '',
        success: false
    });

    const { otp, name, email, phone, password, address, postCode, city, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, phone, address, postCode, city, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } 
            if(data.sendAgain){
                setValues({ ...values, error: data.error, success: false });
                setSendOTP(true);
                setUserPhone(data.phone)
            }
            
            else {
                setValues({ ...values, error: 'Server error', success: false });

            }
        });
    };

    const signUpForm = () => (
        <Container >
        <Grid container item xl={12} spacing={2}>
            <Grid md={2} />
            <Grid item md={8} sm={12} >
                <Card style={{margin : '10px 0' , padding : '30px'}}>
                    <form id="" className="">
                        <Grid item md={12}>
                            <label>Name*</label>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                // label="Email"
                                variant="outlined"
                                onChange={handleChange('name')} 
                                type="text" 
                                value={name} 
                                placeholder="Enter your Name"
                                style={{margin : '10px 0'}}
                            />
                            <label>Email*</label>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                // label="Email"
                                variant="outlined"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                                placeholder="Enter your Email"
                                style={{margin : '10px 0'}}
                            />
                            <label>PassWord*</label>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                // label="Email"
                                variant="outlined"
                                onChange={handleChange("password")}
                                type="password"
                                value={password}
                                placeholder="Enter your Password"
                                style={{margin : '10px 0'}}
                            />
                        </Grid>

                        <Grid container item md={12} spacing= {2} style={{margin : '10px 0'}}>
                            <Grid item md={6} sm={12}>
                                <label>Phone*</label>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label="Email"
                                    variant="outlined"
                                    onChange={handleChange("phone")}
                                    type="phone"
                                    value={phone}
                                    placeholder="Enter your phone"
                                    style={{margin : '10px 0'}}
                                />
                            </Grid>
                            
                            <Grid item md={6} sm={12}>
                                <label>Address</label>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label="Email"
                                    variant="outlined"
                                    onChange={handleChange("address")}
                                    type="address"
                                    value={address}
                                    placeholder="Enter your address"
                                    style={{margin : '10px 0'}}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item md={12} spacing= {2} style={{margin : '10px 0'}}>
                            <Grid item md={6} sm={12}>
                                <label>City</label>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label="Email"
                                    variant="outlined"
                                    onChange={handleChange("city")}
                                    type="city"
                                    value={city}
                                    placeholder="Enter your city"
                                />
                            </Grid>
                            
                            <Grid item md={6} sm={12}>
                                <label>Post Code</label>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label="Email"
                                    variant="outlined"
                                    onChange={handleChange("postCode")}
                                    type="postCode"
                                    value={postCode}
                                    placeholder="Enter your postCode"
                                />
                            </Grid>
                        </Grid>

                        
                        <Button
                            variant = "contained" 
                            onClick={clickSubmit}
                            style={{backgroundColor : '#D14C74' , width :'200px' , marginTop : '15px', color : '#fff'}}
                        >
                            Signup
                        </Button>
                    </form>
                </Card>
            </Grid >
        </Grid>
    </Container>

       
            //  <Grid > 

            //      <form id="sign-up-form" className="all-form">
            //          <div className="form-group">
            //              <label className="text-muted">Name</label>
            //              <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            //          </div>
                 
            //          <div className="form-group">
            //              <label className="text-muted">Email</label>
            //              <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            //          </div>
            //          <div className="form-group">
            //              <label className="text-muted">Phone</label>
            //              <input onChange={handleChange('phone')} type="text" className="form-control" value={phone} />
            //          </div>
                 
            //          <div className="form-group">
            //              <label className="text-muted">Password</label>
            //              <input placeholder="At least 6 charcters and must contain number and letter" onChange={handleChange('password')} type="password" className="form-control" value={password} />
            //          </div>
            //          <div className="form-group">
            //              <label className="text-muted">Address [Optional]</label>
            //              <input onChange={handleChange('address')} type="address" className="form-control" value={address} />
            //          </div>
            //          <div className="form-group">
            //              <label className="text-muted">Post Code [Optional]</label>
            //              <input onChange={handleChange('postCode')} type="postCode" className="form-control" value={postCode} />
            //          </div>
            //          <div className="form-group">
            //              <label className="text-muted">City [Optional]</label>
            //              <input onChange={handleChange('city')} type="city" className="form-control" value={city} />
            //          </div>
            //          <button onClick={clickSubmit} className="btn btn-primary submit-btn">
            //              Signup
            //          </button>
            //      </form>
            //  </Grid>
       
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/user/login">Signin</Link>
        </div>
    );

    const validateOTP = async (event)=>{
        event.preventDefault();
        
        const sendOTP = await verifyOTP(userPhone, otp);

        if(sendOTP.error){
            setValues({ ...values, error: sendOTP.error, success: false });

        }else{
            setValues({
                    ...values,
                    otp: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    postCode: '',
                    city:'',
                    password: '',
                    error: '',
                    success: true
                });

            document.getElementById('otp-form').style.display= "none";

            
        }


    }



    return (
        <Layout
            title="Signup"
            description="Signup to Selften"
            // className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {
                sendOTP === true ?
                <form onSubmit={validateOTP} id="otp-form" className="all-form">
                    <div className="form-group">
                        <p className="text-muted otp-text row">Phone verification is required. Please make sure
                        your phone is available to receive verification code</p>
                        <ResendOTP phone={userPhone} />
                        <div className="row otp-width">
                            <input onChange={handleChange('otp')} placeholder="Code here" type="text" className="col-7 otp-input" value={otp} name="otp" />
                            <input className="col-4 cursor pointer otp-input" type="submit" value="Verify" />

                        </div>
                        <div className="sms-sent-text row">SMS code sent!</div>
                    </div>
                    
                </form>
                :
                signUpForm()
            }
            
        </Layout>
    );
};

export default Signup;
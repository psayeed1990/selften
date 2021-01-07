import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup, verifyOTP } from '../auth';
import ResendOTP from './ResendOTP';

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
        <form id="sign-up-form" className="all-form">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Phone</label>
                <input onChange={handleChange('phone')} type="text" className="form-control" value={phone} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input placeholder="At least 6 charcters and must contain number and letter" onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Address [Optional]</label>
                <input onChange={handleChange('address')} type="address" className="form-control" value={address} />
            </div>
            <div className="form-group">
                <label className="text-muted">Post Code [Optional]</label>
                <input onChange={handleChange('postCode')} type="postCode" className="form-control" value={postCode} />
            </div>
            <div className="form-group">
                <label className="text-muted">City [Optional]</label>
                <input onChange={handleChange('city')} type="city" className="form-control" value={city} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
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
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {
                sendOTP === true ?
                <form onSubmit={validateOTP} id="otp-form" className="all-form">
                    <div className="form-group">
                        <h5 className="text-muted">OTP code send to your phone : <h1>{userPhone}</h1></h5>
                        <input onChange={handleChange('otp')} type="text" className="form-control" value={otp} name="otp" />
                    </div>
                    <ResendOTP phone={userPhone} />
                    <input className="btn btn-outline-primary submit-btn" type="submit" value="Verify Phone" />
                </form>
                :
                signUpForm()
            }
            
        </Layout>
    );
};

export default Signup;

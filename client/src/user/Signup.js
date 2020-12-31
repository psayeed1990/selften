import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
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

    const { name, email, phone, password, address, postCode, city, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, phone, address, postCode, city, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
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
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Selften"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;

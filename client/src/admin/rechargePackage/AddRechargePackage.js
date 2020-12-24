import React, { useState, useEffect } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth';
import { Link } from 'react-router-dom';
import {getTopupThumbs} from './../../core/apiCore'
import { createRechargePackage } from './../apiAdmin';
import { AdminLinks } from '../../user/AdminDashboard';

const AddRechargePackage = () => {
    const [values, setValues] = useState({
        topupGameNames: [],
        topupGameName: '',
        packageName: '',
        packageAmount: '',
        loading: false,
        error: '',
        createdRechargePackage: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        topupGameNames,
        topupGameName,
        packageName,
        packageAmount,
        error,
        createdRechargePackage,
        redirectToProfile,
        formData,
        loading
    } = values;

 // load Topup Game names and set form data
 const init = () => {
    setValues({ ...values, loading: true });
    getTopupThumbs().then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
                ...values,
                topupGameNames: data,
                formData: new FormData(),
                loading: false,
            });
        }
    });
};

useEffect(() => {
    init();
}, []);

const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createRechargePackage(user._id, token, formData).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
                ...values,
                packageName: '',
                packageAmount: '',
                loading: false,
                createdRechargePackage: data.name
            });
        }
    });
};

const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Create Racharge Package</h4>
        
        <div className="form-group">
            <label className="text-muted">Game Name</label>
            <select name="topupGameName" onChange={handleChange('topupGameName')} className="form-control">
                <option disabled selected>Please select</option>
                {topupGameNames &&
                    topupGameNames.map((c, i) => (
                        
                        <option key={i} value={c._id}>
                            {c.title}
                        </option>
                        
                    ))}
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Package Name</label>
            <input name="packageName" onChange={handleChange('packageName')} type="text" className="form-control" value={packageName} />
        </div>

        <div className="form-group">
            <label className="text-muted">Package Price</label>
            <input name="packageAmount" onChange={handleChange('packageAmount')} type="number" className="form-control" value={packageAmount} />
        </div>


        <button className="btn btn-outline-primary">Create Recharge Package</button>
    </form>
);

const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createdRechargePackage ? '' : 'none' }}>
        <h2>{`${createdRechargePackage}`} is created!</h2>
    </div>
);

const showLoading = () =>
    loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

return (
    <Layout title="Add a new recharge package" description={`G'day ${user.name}, ready to add a new recharge package?`}>
        <div className="row">
        <div className="col-md-3"><AdminLinks /></div>
            <div className="col-md-6 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    </Layout>
);
};

export default AddRechargePackage;

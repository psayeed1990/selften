import React, { useState, useEffect, Fragment } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth';
import { getRechargePackagesByGameName } from './../apiCore';
import { useParams } from 'react-router';

const TopupForm = () => {

    // Id for the game name to load packages under it
    // id comes from parameter url
    const { id } = useParams();

    const [values, setValues] = useState({
        accountType: '',
        gmailOrFacebook: '',
        password: '',
        securityCode: '',
        selectRecharge: '',
        selectRecharges:[],
        loading: false,
        error: '',
        createdTopupOrder: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        accountType,
        gmailOrFacebook,
        password,
        securityCode,
        selectRecharge,
        selectRecharges,
        loading,
        error,
        createdTopupOrder,
        redirectToProfile,
        formData
    } = values;

    // load Recharge packages and set form data

    const init = () => {
        getRechargePackagesByGameName(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    selectRecharges: data,
                    formData: new FormData()
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

        // createProduct(user._id, token, formData).then(data => {
        //     if (data.error) {
        //         setValues({ ...values, error: data.error });
        //     } else {
        //         setValues({
        //             ...values,
        //             accountType: '',
        //             gmailOrFacebook: '',
        //             password: '',
        //             selectRecharge: '',
        //             securityCode: '',
        //             loading: false,
        //             createdTopupOrder: data.name
        //         });
        //     }
        // });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Request a Topup</h4>

            <div className="row">

                <div className="form-group col-md-4">
                    
                    <label className="text-muted">Account Type</label>
                    <select name="accountType" onChange={handleChange('accountType')} className="form-control">
                        <option disabled selected>Please select</option>
                        <option value="facebook">Facebook</option>
                        <option value="gmail">Gmail</option>
                        
                    </select>
                </div>

                <div className="form-group col-md-4">
                    
                    {
                        accountType === 'facebook' ? 
                            <label className="text-muted">Your Facebook</label>
                        :
                        <Fragment>
                        {
                            accountType === 'gmail' ? 
                                <label className="text-muted">Your Gmailt</label>
                            
                            :
                            <label className="text-muted">Select Account type first</label>
                            
                        }
                        </Fragment>
                    }
                    <input onChange={handleChange('gmailOrFacebook')} type="text" className="form-control" value={gmailOrFacebook} />
                    
                </div>

                <div className="form-group col-md-4">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" name="password" value={password} />
                </div>
            </div>

            {
                accountType === 'gmail' ? 
                    <div className="form-group">
                        <label className="text-muted">Security Code</label>
                        <input onChange={handleChange('securityCode')} type="text" className="form-control" value={securityCode} />
                    </div>
                    :
                    <Fragment></Fragment>
            }

            <div className="form-group">
                <label className="text-muted">Recharge Packag</label>
                <select name="selectRecharge" onChange={handleChange('selectRecharge')} className="form-control">
                    <option disabled selected>Please select</option>
                    {selectRecharges &&
                        selectRecharges.map((c, i) => (
                            
                            <option key={i} value={c._id}>
                                {c.packageName}
                            </option>
                            
                        ))}
                </select>
            </div>


            <button className="btn btn-outline-primary">Order Topup</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdTopupOrder ? '' : 'none' }}>
            <h2>{`${createdTopupOrder}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Request a topup" description={`G'day ${user.name}, ready to add a new topup request?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default TopupForm;

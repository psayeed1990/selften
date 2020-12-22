import React, { useState, useEffect, Fragment } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth';
import { getRechargePackagesByGameName, getWallet } from './../apiCore';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createTopupOrder } from './../apiCore';
import { showBalance } from './../../admin/apiAdmin';



const TopupForm = () => {

    // Id for the game name to load packages under it
    // id comes from parameter url
    const { id, type } = useParams();
    const [wallet, setWallet] = useState(null);
    const [amount, setAmount] = useState(null);
    const [adminLimit, setAdminLimit] = useState(0);

    const [values, setValues] = useState({
        gameUserId: '',
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
        gameUserId,
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
        setValues({ ...values, loading: true });
        getRechargePackagesByGameName(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    selectRecharges: data,
                    formData: new FormData(),
                    loading: false
                });

                
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

        //setwallet
        useEffect(()=>{
            setValues({ ...values, loading: true });
            getWallet(user._id).then(data=>{
                if (!data) {
                    //console.log(err)
                } else {
                    setWallet(data);
                    setValues({ ...values, loading: false });
                }
            })
        }, []);
    
    

    //set admin limit
    useEffect(()=>{
        setValues({ ...values, loading: true });
        showBalance().then(data=>{
            if (!data) {
                 //console.log(err)
                setAdminLimit(0);
            } else {
                setAdminLimit(data[0].balance)
                setValues({ ...values, loading: false  });
            }
        })
    }, []);

    useEffect(()=>{
        if(selectRecharges.length > 0){
    
            let selectedpack = selectRecharges.filter(sr =>{
                return sr._id === selectRecharge;
            });
            console.log('se', selectedpack);

            if(selectedpack.length > 0){
                setAmount(selectedpack[0].packageAmount);
            }
        }
        
    }, [selectRecharge])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createTopupOrder(user._id, token, formData, id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    gameUserId: '',
                    accountType: '',
                    gmailOrFacebook: '',
                    password: '',
                    selectRecharge: '',
                    securityCode: '',
                    loading: false,
                    createdTopupOrder: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Request a Topup</h4>
            { type === 'inGame' ?
                
                <Fragment>
                    {console.log(type)}
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
                </Fragment>:

                <Fragment></Fragment>
                
            }

            {
                 type === 'codeId' ?
                 
                <div className="row">
                     <div className="form-group col-md-4">
                        <label className="text-muted">Game Id</label>
                        <input onChange={handleChange('gameUserId')} type="text" className="form-control" value={gameUserId} />
                    </div>
                    <div className="form-group col-md-4">
                        <label className="text-muted">Password</label>
                        <input onChange={handleChange('password')} type="password" className="form-control" name="password" value={password} />
                    </div>
                </div>
                 
                 :
                 <Fragment></Fragment>
            }
            

            <div className="form-group">
                <label className="text-muted">Recharge Package</label>
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

            <div className="form-group col-md-4">
                <label className="text-muted">Amount to pay: { amount ? <b>{amount}</b>: <b>0</b> }</label>
            </div>

            <div className="money">
                <h4>Your Balance: { wallet ? wallet.amount : <span>Loading...</span>}</h4>
            </div>

                            { wallet && amount ? wallet.amount < amount ? 
                                <h4>You have less balance than you have to pay. Please <Link to="/"><button className="btn btn-primary">add money</button></Link></h4>
                                :
                                <Fragment></Fragment>
                                :
                                <Fragment></Fragment>
                            }

                            { amount > adminLimit ? 
                                <h4>You are ordering more than admin can handle. Please select less</h4>
                                :
                                <Fragment></Fragment>
                                
                            }
            <h4>Admin Balance: { adminLimit }</h4>

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

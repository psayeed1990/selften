import React, { useState, useEffect, Fragment } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth';
import { getRechargePackagesByGameName, getWallet } from './../apiCore';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createTopupOrder } from './../apiCore';
import { showBalance } from './../../admin/apiAdmin';
import './topupForm.css';



const TopupForm = () => {

    // Id for the game name to load packages under it
    // id comes from parameter url
    const { id, type } = useParams();
    const [wallet, setWallet] = useState(null);
    const [amount, setAmount] = useState(null);
    const [adminLimit, setAdminLimit] = useState(0);
    const [diamondValue, setDiamondValue] = useState(null);

    const [values, setValues] = useState({
        withSSLCommerz: 'n',
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
        withSSLCommerz,
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

    const init = async () => {
        setValues({ ...values, loading: true });
        const data = await getRechargePackagesByGameName(id);
        const wData = await getWallet(user._id, token);
        const bl = await showBalance();

        if (!bl) {
            setAdminLimit(0);
        } 
        if(bl) {
            setDiamondValue(data[0].takaPerDiamond);
            setAdminLimit(data[0].balance)
        }

        if (data.error) {
            setValues({ ...values, error: data.error });
        } 
        if(!data.error) {
            setWallet(wData);
            setValues({
                ...values,
                 selectRecharges: data,
                formData: new FormData(),
                loading: false
            });           
        }
        
    };

    useEffect(() => {
        init();
    }, []);
    

    useEffect(()=>{
        if(selectRecharges.length > 0){
    
            let selectedpack = selectRecharges.filter(sr =>{
                return sr._id === selectRecharge;
            });

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

        createTopupOrder(user._id, token, formData, id, withSSLCommerz).then(data => {
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

    //order wit ssl commerze
    const orderWithSSLCommerz = ()=>{
        setValues({ ...values, error: '', loading: true, withSSLCommerz: 'y' });

        createTopupOrder(user._id, token, formData, id, 'y').then(data => {
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
                    withSSLCommerz: 'n',
                    createdTopupOrder: data.name
                });
                //console.log(data);
                //redirect to payment page
               window.location.replace(data.GatewayPageURL);
                
                setValues({
                    ...values,
                    
                    gameUserId: '',
                    accountType: '',
                    gmailOrFacebook: '',
                    password: '',
                    selectRecharge: '',
                    securityCode: '',
                    loading: false,
                    withSSLCommerz: 'n',
                    createdTopupOrder: data.name
                });
            }
        });
    }

    const selectARechargePackage = (id)=>{
        setValues({
            ...values,
            selectRecharge: id,
        });
        
        formData.set('selectRecharge', id);
        if(document.getElementsByClassName('select-recharge')){
            
            const classes = document.getElementsByClassName('select-recharge');
            for(let i = 0; i < classes.length; i++){
                document.getElementsByClassName('check-mark')[i].style.visibility = "hidden";
                document.getElementsByClassName('check-mark')[i].style.opacity = 0;
                document.getElementsByClassName('select-recharge')[i].style.border = "2px solid rgb(194, 191, 191)";
            }
            
            document.getElementById(id).style.border = "2px solid #E6753E";
            document.getElementById(`${id}-check-mark`).style.visibility = "visible";
            document.getElementById(`${id}-check-mark`).style.opacity = 1;

        }

        

    }

    const newPostForm = () => (
        <form className="mb-3 topup-form" onSubmit={clickSubmit}>
            <h4>Request a Topup</h4>
            { type === 'inGame' ?
                
                <Fragment>
                    
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
                    <div className="row security-code">

                        {
                            accountType === 'gmail' ? 
                                <div className="form-group">
                                    <label className="text-muted">Security Code</label>
                                    <input onChange={handleChange('securityCode')} type="text" className="form-control" value={securityCode} />
                                </div>
                            :
                                <Fragment></Fragment>
                        }
                    </div>
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
            
            <div className="row">
                <div className="form-group col-9">
                    <p className="text-muted">Recharge Package</p>
                

                        
                        <div className="row">
                        {selectRecharges? 
                            selectRecharges.map((c, i) => {
                                return(
                                    <p id={c._id} className="cursor-pointer select-recharge col-md-3" onClick={()=>{selectARechargePackage(c._id)}}>
                                        <img className="check-mark" id={`${c._id}-check-mark`} src="/images/icons/check-mark.svg" width="20" />
                                        <span>{c.packageName} </span>
                                    </p>
                                )
                                
                            })
                            :
                            <p>Loading</p>
                        }
                        </div>
                        
                    
                </div>
            </div>


            <div className="form-group col-md-4">
                <label className="text-muted">Amount to pay: { amount ? <b>{amount}</b>: <b>0</b> }</label>
            </div>

            <div className="money">
                <h4>Your Balance: { wallet ? wallet.amount : <span>Loading...</span>}</h4>
            </div>

                            { wallet && amount ? wallet.amount < amount ? 
                                <p>You have less balance than you have to pay. Please <Link to={()=>{
                                    if(user.role === 1){
                                        return '/admin/refill-wallet';
                                    }else{
                                        return '/user/refill-wallet';
                                    }
                                    
                                }}><button className="btn btn-primary">add money</button></Link></p>
                                :
                                <Fragment></Fragment>
                                :
                                <Fragment></Fragment>
                            }

                            { amount > adminLimit ? 
                                <p>You are ordering more than admin can handle. Please select less</p>
                                :
                                <Fragment></Fragment>
                                
                            }
            {/* <h4>Admin Balance: { adminLimit }</h4> */}

            { diamondValue && amount ?
                <p>You will receive - {parseInt(amount / diamondValue)} Diamonds </p>
                :
                <Fragment></Fragment>
            }

            <button className="btn btn-outline-primary submit-btn">Order With Balance</button>
            <br />
            <br />
            <p onClick={()=>{orderWithSSLCommerz()}} className="submit-btn btn btn-outline-primary">Order With Card, Bkash and more</p>
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

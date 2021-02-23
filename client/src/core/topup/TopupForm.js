import React, { useState, useEffect, Fragment } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth';
import { getRechargePackagesByGameName, getTopupById, getWallet } from './../apiCore';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createTopupOrder } from './../apiCore';
import { showBalance } from './../../admin/apiAdmin';
import './topupForm.css';
import ShowThumb from '../ShowThumb';
import { getUserProfile } from '../../user/apiUser';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const TopupForm = () => {
    const classes = useStyles();
    // Id for the game name to load packages under it
    // id comes from parameter url
    const [profile, setProfile] = useState({});
    const { id, type } = useParams();
    const [wallet, setWallet] = useState(null);
    const [amount, setAmount] = useState(null);
    const [adminLimit, setAdminLimit] = useState(0);
    const [thisTopup, setThisTopup] = useState({});
    const [diamondValue, setDiamondValue] = useState(null);

    const [values, setValues] = useState({
        withSSLCommerz: 'n',
        gameUserId: '',
        accountType: '',
        gmailOrFacebook: '',
        password: '',
        securityCode: '',
        selectRecharge: '',
        selectRecharges: [],
        loading: false,
        error: '',
        createdTopupOrder: '',
        redirectToProfile: false,
        formData: ''
    });

    const [data, setData] = useState({})

    const { user, token, role } = isAuthenticated();
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
        try {


            setValues({ ...values, loading: true });
            const data = await getRechargePackagesByGameName(id);

            const topupData = await getTopupById(id);
            const bl = await showBalance();


            if (data.error) {
                return setValues({ ...values, error: data.error });
            }

            if (topupData.error) {
                return setValues({ ...values, error: topupData.error });
            }
            if (bl.error) {
                return setValues({ ...values, error: bl.error });
            }

            if (user) {
                const wData = await getWallet(user._id, token);
                const dataUser = await getUserProfile(user, token);
                setProfile(dataUser);
                if (!wData) {
                    setWallet(0);
                } else {
                    setWallet(wData);
                }
            }


            if (!data.error || !bl.error || !topupData.error) {
                setDiamondValue(bl[0].takaPerDiamond);
                setAdminLimit(bl[0].balance)

                setThisTopup(topupData);
                setValues({
                    ...values,
                    selectRecharges: data,
                    formData: new FormData(),
                    loading: false
                });
            }

        } catch (err) {
            console.log(err)
        }

    };

    useEffect(() => {
        init();
    }, []);


    useEffect(() => {
        if (selectRecharges.length > 0) {

            let selectedpack = selectRecharges.filter(sr => {
                return sr._id === selectRecharge;
            });

            if (selectedpack.length > 0) {
                setAmount(selectedpack[0].packageAmount);
            }
        }

    }, [selectRecharge])

    // console.log(selectRecharges);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        // formData.set(name, value);
        setData({ ...data, [name]: value });

        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
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
    const orderWithSSLCommerz = () => {
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
                console.log(data);
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

    const selectARechargePackage = (id) => {
        setValues({
            ...values,
            selectRecharge: id,
        });

        formData.set('selectRecharge', id);
        if (document.getElementsByClassName('select-recharge')) {

            const classes = document.getElementsByClassName('select-recharge');
            for (let i = 0; i < classes.length; i++) {
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
        <form className="mb-3 " onSubmit={clickSubmit}>
            <div style={{ backgroundColor: '#f8f8f8', padding: '15px' }}>
                <div className="row">
                    <div className="col-md-2">
                        <ShowThumb item={{ _id: id }} url="topup-thumbs" />
                    </div>
                    <div className="col-md-5">
                        <p>Publisher: {thisTopup.publisher}</p>
                        <p>Platform: {thisTopup.platform}</p>
                        <p>Region: {thisTopup.region}</p>
                    </div>
                </div>
                {/* <h4>Request a Topup</h4> */}
            </div>

            { type === 'inGame' ?

                <Fragment>

                    <Grid container spacing={3} style={{ marginTop: '20px' }}>

                        <Grid item xs={12} md={4}>

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Account Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={accountType}
                                    onChange={handleChange('accountType')}
                                    label="Account Type"
                                >
                                    <MenuItem value="">
                                        <em>Please select</em>
                                    </MenuItem>
                                    <MenuItem value='facebook'>Facebook</MenuItem>
                                    <MenuItem value='gmail'>Gmail</MenuItem>

                                </Select>
                            </FormControl>

                            {/* <label className="text-muted">Account Type</label>
                            <select name="accountType" onChange={() => handleChange('accountType')} className="form-control">
                                <option disabled selected>Please select</option>
                                <option value="facebook">Facebook</option>
                                <option value="gmail">Gmail</option>

                            </select> */}
                        </Grid>

                        <Grid item xs={12} md={4}>

                            {/* {
                                accountType === 'facebook' ?
                                    <label className="text-muted">Your Facebook</label>
                                    :
                                    <Fragment>
                                        {
                                            accountType === 'gmail' ?
                                                <label className="text-muted">Your Gmail</label>

                                                :
                                                <label className="text-muted">Select Account type first</label>

                                        }
                                    </Fragment>
                            } */}
                            {/* <input onChange={() => handleChange('gmailOrFacebook')} type="text" className="form-control" value={gmailOrFacebook} /> */}
                            <TextField
                                className={classes.formControl}
                                id="outlined-basic"
                                label={accountType === 'facebook' ? 'Email or phone' : 'Email'}
                                variant="outlined"
                                onChange={handleChange('gmailOrFacebook')}
                                type="text"
                                value={gmailOrFacebook}
                            />

                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                className={classes.formControl}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                onChange={handleChange('password')}
                                type="password"
                                name="password"
                                value={password}
                            />
                            {/* <label className="text-muted">Password</label>
                            <input onChange={handleChange('password')} type="password" className="form-control" name="password" value={password} /> */}
                        </Grid>
                    </Grid>
                    {/* <div className="row security-code"> */}

                    {
                        accountType === 'gmail' ?
                            <div style={{ marginTop: '15px' }}>
                                <TextField
                                    className={classes.formControl}
                                    id="outlined-basic"
                                    label="Security Code"
                                    variant="outlined"
                                    onChange={handleChange('securityCode')}
                                    type="text"
                                    value={securityCode}
                                />
                                {/* <label className="text-muted">Security Code</label>
                                    <input onChange={handleChange('securityCode')} type="text" className="form-control" value={securityCode} /> */}
                            </div>
                            :
                            <Fragment></Fragment>
                    }
                    {/* </div> */}
                </Fragment>
                :






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


            }

            <Grid container spacing={3} style={{ marginTop: '20px', }} >
                <Grid xs={12} >
                    <p style={{ marginLeft: '15px' }} className="text-muted">Recharge Package</p>
                </Grid>


                {selectRecharges ?
                    selectRecharges.map((c, i) => {
                        return (
                            <Grid item xs={12} md={4} key={i}>
                                <div id={c._id} className="cursor-pointer select-recharge" style={{ marginLeft: '-2px', padding: '15px', cursor: "pointer", textAlign: 'center' }} onClick={() => { selectARechargePackage(c._id) }}>
                                    <img className="check-mark" id={`${c._id}-check-mark`}  width="0" />
                                    {/* <br/> */}
                                   
                                    <span style={{marginLeft: '10px'}}>{c.packageName} </span>
                                    <br/>
                                    <span style={{marginLeft: '10px'}}>BDT {c.packageAmount} </span>

                                    {/* <span>{c.price} </span> */}

                                </div>
                            </Grid>
                        )

                    })
                    :
                    <p>Loading</p>
                }


            </Grid>
            {/* <div className="row">
                <div className="form-group col-9">



                    <div className="row">
                        {selectRecharges ?
                            selectRecharges.map((c, i) => {
                                return (
                                    <p id={c._id} className="cursor-pointer select-recharge col-md-3" onClick={() => { selectARechargePackage(c._id) }}>
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
            </div> */}


            {
                user ?

                    (!profile.address || !profile.city || !profile.postCode) ?
                        <p>Please fill your address, city postal code in your <Link exact to={() => {
                            return role && role === 1 ? '/admin/dashboard' : '/user/dashboard'
                        }} >profile</Link> before you can order a topup</p>

                        :
                        <Fragment>
                            {/* <div className="form-group col-md-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>FreeFire (In Game) 520 Diamonds</div>
                                <label className="text-muted">Amount to pay: {amount ? <b>{amount}</b> : <b>0</b>}</label>
                            </div> */}

                            <div className="money" style={{marginTop: "20px"}}>

                                <h4 style={{textTransform: "capitalize", marginBottom: "15px"}}>Available Payment Methods: {wallet ? wallet.amount : <span>Loading...</span>}</h4>
                            </div>

                            {wallet && amount ? wallet.amount < amount ?
                                <p>You have less balance than you have to pay. Please <Link to={() => {
                                    if (user.role === 1) {
                                        return '/admin/refill-wallet';
                                    } else {
                                        return '/user/refill-wallet';
                                    }

                                }}><button className="btn btn-primary">add money</button></Link></p>
                                :
                                <Fragment></Fragment>
                                :
                                <Fragment></Fragment>
                            }

                            {/* { amount > adminLimit ? 
                                            <p>You are ordering more than admin can handle. Please select less</p>
                                            :
                                            <Fragment></Fragment>

                                        } */}
                            {/* <h4>Admin Balance: { adminLimit }</h4> */}

                            {diamondValue && amount ?
                                // <p>You will receive - {parseInt(amount / diamondValue)} Diamonds </p>
                                <div></div>
                                :
                                <Fragment></Fragment>
                            }
                            <Grid container spacing={3} >
                                <Grid item xs={12} md={4}>
                                    <Button variant="outlined" style={{width: '200px', height: '150px'}}>
                                        <span style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'space-between'}}>
                                            <img src={require('../../images/logo/Logo.png')} style={{ width: '90%', height: "auto" }} />
                                            <p style={{fontSize: '17px', marginTop: "15px"}}>SELFTEN  <span style={{textTransform: "capitalize"}}>Wallet</span></p>
                                        </span>

                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Button  onClick={() => { orderWithSSLCommerz() }}  variant="outlined" style={{width: '200px', height: '150px'}}>
                                        <span style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'space-between'}}>
                                            <img src={require('../../images/logo/ssl.png')} style={{ width: '90%', height: "auto" }} />
                                            <p style={{fontSize: '17px', marginTop: "15px"}}>SSLCOMMERZ </p>
                                        </span>

                                    </Button>
                                </Grid>
                                
                                <Grid item xs={12} md={4}/>

                            </Grid>

                            {/* <button className="btn btn-outline-primary submit-btn">
                                
                            </button> */}

                            <br />
                            <br />
                            {/* <p onClick={() => { orderWithSSLCommerz() }} className="submit-btn btn btn-outline-primary">Order With Card, Bkash and more</p> */}
                        </Fragment>


                    :
                    <p>Please login to order a topup</p>
            }

            <h5>About {thisTopup.title}</h5>
            <p>{thisTopup.about}</p>
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
        <Layout>
            <div className="row">
                <div className="col-md-12 topup-form-wrapper">
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

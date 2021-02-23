import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getWallet } from '../core/apiCore';
import { getUserProfile } from './../user/apiUser';
import { addToWallet } from './../admin/apiAdmin';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth';
import { AdminLinks } from '../user/AdminDashboard';
import { UserLinks } from '../user/UserDashboard';
import { Link } from 'react-router-dom';
import './refillWallet.css';
import { Grid, Card, Typography, Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwapVertIcon from '@material-ui/icons/SwapVert';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const RefillWallet = () => {
    const classes = useStyles();

    const [profile, setProfile] = useState({});
    const [wallet, setWallet] = useState(0);
    const { user, token } = isAuthenticated();
    const { role } = user;
    const [values, setValues] = useState({
        amount: 0,
        loading: '',
        error: '',
        formData: '',
        addedBalance: '',
    });

    const { amount, loading, error, formData, addedBalance } = values;



    const init = async () => {
        const datas = await getWallet(user._id, token);
        setWallet(datas.amount);
        const data = await getUserProfile(user, token);
        setProfile(data);

        setValues({ ...values, formData: new FormData() })
    }

    useEffect(() => {
        init();
    }, [])


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: addedBalance ? '' : 'none' }}>
            <h2>{`${addedBalance}`}</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );


    const refillWallet = async (event) => {
        event.preventDefault();
        try {
            const data = await addToWallet(user, token, formData);
            if (data.error) {
                return setValues({ ...values, error: data.error })
            }
            window.location.replace(data.GatewayPageURL);
        } catch (err) {
            setValues({ ...values, error: 'Could not perform' })
        }


    }

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    return (
        <Layout title="Request a topup" description={`G'day ${user.name}, ready to add a new topup request?`}>

            <Grid container spacing={3}>
                <Grid item md={3}>

                    <div>{role === 1 ?
                        <AdminLinks />
                        :
                        <UserLinks />
                    }</div>
                </Grid>

                <Grid item md={9}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <ShoppingCartIcon style={{ marginRight: "10px" }} />
                               I am Buyer
                            </Typography>
                            <div style={{ margin: '40px 10px', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Typography variant="h5">$0. 00</Typography>
                                    <Typography variant="body1" style={{ margin: '10px 5px' }}>Account Balance: 6</Typography>
                                    <Button variant="contained" color="primary">
                                        <SwapVertIcon style={{ marginRight: '10px' }} />
                                    Top up account balance
                                </Button>
                                </div>
                            </div>

                        </CardContent>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: "13px" }}>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="h5">0</Typography>
                                <Typography variant="body1" >Total Orders</Typography>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="h5">567</Typography>
                                <Typography variant="body1" >Total Spend</Typography>
                            </div>
                        </div>
                        {/* <CardActions>
                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <Button size="small">Learn More</Button>
                                <Button size="small">Learn More</Button>
                            </div>
                           
                        </CardActions> */}
                    </Card>

                    {/* {showLoading()}
                    {showSuccess()}
                    {showError()}
                    <form className="row wallet" onSubmit={refillWallet}>
                
                        <div className="form-group col-md-4">
                            <p>Balance: {wallet}.00 BDT</p>
                            <label className="text-muted">Add money</label>
                            <input onChange={handleChange('amount')} type="number" className="form-control" value={amount} />
                        <br />

                            {(!profile.address || !profile.city || !profile.postCode) ?
                                <p>Please fill your address, city postal code in your <Link exact to={()=>{
                                    return role === 1 ? '/admin/dashboard' : '/user/dashboard'
                                }} >profile</Link> before you can add money</p>

                                :
                                <input type="submit" className="btn-primary submit-btn" value="Add via credit card, bKash etc" />

                            }
  
                        </div>
                    </form> */}
                </Grid>

            </Grid>
        </Layout>



    )
}

export default RefillWallet;
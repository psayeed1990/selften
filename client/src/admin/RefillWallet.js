import React, { useEffect, useState } from 'react';
import { getWallet } from '../core/apiCore';
import {addToWallet} from './../admin/apiAdmin';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth';
import { AdminLinks } from '../user/AdminDashboard';
import { UserLinks } from '../user/UserDashboard';

const RefillWallet = ()=>{
    const [wallet, setWallet] = useState(0);
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        amount: 0,
        loading: '',
        error: '',
        formData: '',
        addedBalance: '',
    });

    const {amount, loading, error, formData, addedBalance} = values;

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const init = async ()=>{
        const data = await getWallet(user._id, token);
        setWallet(data.amount);
    }

    useEffect(()=>{
        init();
    })

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

    
    const refillWallet = async (event)=>{
        event.prebentDefault();
        try{
            const newWallet = await addToWallet(user, token, formData);
            if (newWallet.error){
                return setValues(...values, {error})
            }
            setWallet(newWallet.amount);
            setValues(...values, {addedBalance: 'Added balance successfully'})
        }catch(err){
            setValues(...values, {error: 'Could not perform'})
        }
        
        
    }

    return(
        <Layout title="Request a topup" description={`G'day ${user.name}, ready to add a new topup request?`}>
            
            <div className="row">
                
                <div className="col-md-3">{user.role === 1 ?
                    <AdminLinks />
                    :
                    <UserLinks />
                }</div>
                <div className="col-md-6 offset-md-2 m-b-250 mb-5">
                
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    <form className="row" onSubmit={refillWallet}>
                
                        <div className="form-group col-md-4">
                            <p>Balance: {wallet}.00 BDT</p>
                            <label className="text-muted">Add money</label>
                            <input onChange={handleChange('amount')} type="number" className="form-control" name="amount" value={amount} />
                        <br />
                            <input type="submit" className="btn-primary" value="Add via credit card, bKash etc" />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
        
            
        
    )
}

export default RefillWallet;
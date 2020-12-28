import React, { Fragment } from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../Layout';

const TopupOrderSuccess = ()=>{
    const {transactionId} = useParams();


    return(
        <Fragment>
            <Layout />
            <h4>Order Successfull</h4>

            <p>Please keep this {transactionId} - transaction id to contact us if your paid but order isn't saved</p>
        </Fragment>
    )
}

export default TopupOrderSuccess;
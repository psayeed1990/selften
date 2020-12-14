import React, {useEffect, useState, Fragment} from 'react';
import { isAuthenticated } from './../../auth';
import { getTopupOrdersAdmin } from '../apiAdmin';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';

const ShowTopupOrders = ()=>{
    const [orders, setOrders] = useState();

    const {user, token} = isAuthenticated();

    useEffect(()=>{
        getTopupOrdersAdmin(user._id, token).then(order=>{
            
            setOrders(order);
        })
    
    },[]);

    return(
        <Fragment>
            
        <Layout
            title="All topup orders"
            description="See new orders"
        ></Layout>

        <div className="row">
            {
                orders ? 
                orders.map(order=>{
                    return(
                        
                                <div className="col-md-6 p-5" key={order._id}>
                                    <Link exact to={`/topup-orders/${order._id}`}>
                                    
                                        <h6>Requested by: { order.user.name }</h6>
                                        </Link>
                                        <h6>Game: {order.topupGameId.title}</h6>
                                        <h6>Pecharge Package: {order.selectRecharge.packageName}</h6>
                                        <h6>Account type: { order.accountType }</h6>
                                        <h6>Number: { order.gmailOrFacebook }</h6>
                                        <h6>Password: { order.password }</h6>
                                        <h6>Paid Amount: { order.price } Tk</h6>
                                        <h6>Status: { order.status } </h6>

                                    
                                </div>          
                       
                    )
                })
                :
                <Fragment>Loading...</Fragment>
            }
        </div>
        </Fragment>

    )
}

export default ShowTopupOrders;
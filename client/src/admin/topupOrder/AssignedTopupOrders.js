import React, {useEffect, useState, Fragment} from 'react';
import { isAuthenticated } from './../../auth';
import { getAssignedTopupOrdersAdmin, updateTopupOrderAdmin } from '../apiAdmin';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';
import { AdminLinks } from '../../user/AdminDashboard';
import moment from 'moment';
import { sendMessage } from '../../core/apiCore';
import './topuporder.css';

const AssignedTopupOrders = ()=>{
    const [orders, setOrders] = useState();
    const {user, token} = isAuthenticated();

    useEffect(()=>{
        getAssignedTopupOrdersAdmin(user._id, token).then(order=>{
            
            setOrders(order);
        })
    
    },[]);

    // update order status
    const markTopupOrderStatus = (orderId, status, customerId) => {
            updateTopupOrderAdmin(orderId, user._id, token, {status, customerId})
                .then(data => {
                    if (data.error) {
                        console.log("couldn't happen");
                    } else {
                        
                        console.log('updated');
                    }
        })

    }

    return(
            
        <Layout
            title="All topup orders"
            description="See new orders"
        >

        <div className="row">
            <div className="col-md-3"><AdminLinks /></div>
            <div className="col-md-9">
                 <div className="row">
            {
                orders ? 
                orders.map(order=>{
                    return(
                           
                                <div className="col-md-4 p-5 topup-orders-list" key={order._id}>
                                    <Link exact to={`/topup-orders/${order._id}`}>
                                        {
                                            order.user ?
                                         <h6>Requested by:  <span className="topup-order-h6">{ order.user.name }</span></h6>
                                         :
                                         <p>User deleted</p>


                                        }
                                    </Link>
                                        <h6 className="hidden">Order ID: <span className="topup-order-h6">{ order._id }</span></h6>
                                        {
                                            order.topupGameId?
                                            <h6>Game:<span className="topup-order-h6"> {order.topupGameId.title}</span></h6>
                                            :
                                            <p className="error">Game deleted</p>

                                        }
                                        {
                                            order.selectRecharge ?
                                        <h6>Pecharge Package: <span className="topup-order-h6">{order.selectRecharge.packageName}</span></h6>

                                        :
                                        <p className="error">Recharge package deleted</p>
                                        }
                                         {
                                            order.gameUserId ?
                                            <h6>Game User Id: <span className="topup-order-h6">{ order.gameUserId }</span></h6>
                                            :
                                            <Fragment>
                                                <h6>Account type:<span className="topup-order-h6">{ order.accountType }</span></h6>
                                                <h6>Number: <span className="topup-order-h6">{ order.gmailOrFacebook }</span></h6>
                                            </Fragment>
                                        }
                                        <h6>Password:<span className="topup-order-h6"> { order.password }</span></h6>
                                        <h6>Paid Amount:<span className="topup-order-h6"> { order.price }Tk</span></h6>
                                        <h6>Status:<span className="topup-order-h6"> {order.status} </span></h6>
                                        
                                        {
                                            order.pair ?
                                            <Link exact to={`/messages/pair/${order.pair._id}`} >
                                                <h5 className="border"><b>Send message</b></h5>
                                            </Link>
                                        :
                                            <Fragment></Fragment>

                                        }
                                        

                                        { order.status === 'completed' || order.status === 'cancelled' ?
                                            <Fragment></Fragment>
                                            :
                                
                                        <Fragment>
                                            Assigned to: you {
                                                order.assignedTo ?
                                                <p><span className="topup-order-h6">{order.assignedTo.name}</span></p>
                                                :
                                                <Fragment>
                                                <p>none</p>
                                                    <Link exact to={`/admin/assign-topup-order/${order._id}`} className="border btn btn-secondary btn-assign"><b>Assign it to a admin</b></Link>
                                                </Fragment>
                                            }
                                            <p className="btn btn-primary submit-btn" role="button" onClick={() => { markTopupOrderStatus(order._id, 'completed', order.user._id) }}>Mark completed</p>
                                            <p className="btn btn-primary submit-btn" role="button" onClick={() => { markTopupOrderStatus(order._id, 'cancelled', order.user._id) }}>Mark cancelled</p>
                                        </Fragment>
                                        }
                                        <p className="time">Time: {moment(order.createdAt).fromNow()}</p>
                                        
                                        
                                    
                                </div>
                                     
                       
                    )
                })
                :
                <Fragment>Loading...</Fragment>
            }
            </div> 
            </div>
        </div>

        </Layout>


    )
}

export default AssignedTopupOrders;
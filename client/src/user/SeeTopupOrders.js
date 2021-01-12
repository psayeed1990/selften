import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getTopupOrdersByUser } from "./apiUser";
import { AdminLinks } from "./AdminDashboard";
import { UserLinks } from "./UserDashboard";

const SeeTopupOrders = ()=>{
    const {user, token} = isAuthenticated();
    const [topupOrders, setTopupOrders] = useState([]);

    const init = async ()=>{
        try{

            const UsersTopupOrders = await getTopupOrdersByUser(user, token);
            console.log(UsersTopupOrders)
            setTopupOrders(UsersTopupOrders);
        
        }catch(err){
            console.log(err)
        }
      
        
    }

    useEffect(()=>{
        init();
    },[])

    return(
        <Layout
            title="Dashboard"
            description={`G'day!`}
            className="container-fluid"
        >
            <div className="row">
                
                <div className="col-md-3">{ user.role === 1 ?
                    
                    <AdminLinks />
                    :
                    <UserLinks />
                }</div>
              
                <div className="col-md-9">
        
                    <h5>Your topup orders</h5>
                    <div className="row">
        
                        {
                            topupOrders.map((order, i)=>(


                                        <div className="col-md-4 p-5" key={order._id}>
                                            <Link exact to={`/topup-orders/${order._id}`}>

                                                <h6>Requested by: { order.user.name }</h6>
                                            </Link>
                                                <h6>Order id: { order._id }</h6>
                                                <h6>Game: {order.topupGameId.title}</h6>
                                                <h6>Pecharge Package: {order.selectRecharge.packageName}</h6>
                                                 {
                                                    order.gameUserId ?
                                                    <h6>Game User Id: { order.gameUserId }</h6>
                                                    :
                                                    <Fragment>
                                                        <h6>Account type: { order.accountType }</h6>
                                                        <h6>Number: { order.gmailOrFacebook }</h6>
                                                    </Fragment>
                                                }
                                                <h6>Password: { order.password }</h6>
                                                <h6>Paid Amount: { order.price } Tk</h6>
                                                <h6>Status: {order.status} </h6>

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
                                                    <b>Assigned to:</b> {
                                                        order.assignedTo ?
                                                        <p>{order.assignedTo.name}</p>
                                                        :
                                                        <Fragment>
                                                            <p>none</p>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                                }

                                            
                                        </div>

                            ) )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SeeTopupOrders;
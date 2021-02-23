
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Backdrop from '../../../../utils/Backdrop'
import { Grid, TableCell, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getTopupOrdersByUser } from "./apiUser";
import { AdminLinks } from "./AdminDashboard";
import { UserLinks } from "./UserDashboard";

const useStyles = makeStyles({
    table: {
        minWidth: '100%',
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'gray',
        // backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const FreelancerWorkSummary = (props) => {

    const classes = useStyles();

    const { user, token } = isAuthenticated();
    const [topupOrders, setTopupOrders] = useState([]);

    const init = async () => {
        try {
            const UsersTopupOrders = await getTopupOrdersByUser(user, token);
            console.log(UsersTopupOrders)
            setTopupOrders(UsersTopupOrders);

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Layout
            title="Dashboard"
            description={`G'day!`}
            className="container-fluid"
        >
            <Grid container spacing={3}>
                <Grid item md={3}>
                    <div>
                        {user.role === 1 ?
                            <AdminLinks />
                            :
                            <UserLinks />
                        }
                    </div>
                </Grid>
                       
                        <Grid item md={9}>
                            <Typography style={{textAlign: 'center', marginBottom: '20px'}} variant="h6">My Orders</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center"><b>Order Id</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>Order Status</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>Order Date</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>Total</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {props.transactionData.transaction_list && props.transactionData.transaction_list.map((point, index) => ( */}
                                        {/* <StyledTableRow key={point.id}>

                                                <StyledTableCell align="center">{getFormatDate(point.created)}</StyledTableCell>
                                                <StyledTableCell align="center">{point.invoice_id}</StyledTableCell>
                                                <StyledTableCell align="center">{point.contract ? point.contract : point.plan}</StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>

                                            </StyledTableRow> */}
                                        <StyledTableRow >
                                            <StyledTableCell align="center">#efs332</StyledTableCell>
                                            <StyledTableCell align="center">Completed</StyledTableCell>
                                            <StyledTableCell align="center">05/02/21</StyledTableCell>
                                            <StyledTableCell align="center">$6203</StyledTableCell>
                                            <StyledTableCell align="center"><VisibilityIcon /></StyledTableCell>
                                        </StyledTableRow>

                                        <StyledTableRow >
                                            <StyledTableCell align="center">#efs332</StyledTableCell>
                                            <StyledTableCell align="center">Completed</StyledTableCell>
                                            <StyledTableCell align="center">05/02/21</StyledTableCell>
                                            <StyledTableCell align="center">$6203</StyledTableCell>
                                            <StyledTableCell align="center"><VisibilityIcon /></StyledTableCell>
                                        </StyledTableRow>

                                        <StyledTableRow >
                                            <StyledTableCell align="center">#efs332</StyledTableCell>
                                            <StyledTableCell align="center">Completed</StyledTableCell>
                                            <StyledTableCell align="center">05/02/21</StyledTableCell>
                                            <StyledTableCell align="center">$6203</StyledTableCell>
                                            <StyledTableCell align="center"><VisibilityIcon /></StyledTableCell>
                                        </StyledTableRow>

                                        <StyledTableRow >
                                            <StyledTableCell align="center">#efs332</StyledTableCell>
                                            <StyledTableCell align="center">Completed</StyledTableCell>
                                            <StyledTableCell align="center">05/02/21</StyledTableCell>
                                            <StyledTableCell align="center">$6203</StyledTableCell>
                                            <StyledTableCell align="center"><VisibilityIcon /></StyledTableCell>
                                        </StyledTableRow>
                                        {/* ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* <Paginator
                                    start={props.start}
                                    end={props.end}
                                    limit={props.limit}
                                    totalCount={props.totalCount}
                                    getInit={props.getTransactionInit}
                                    updateLimit={updateLimit}
                                    getNext={props.getTransactionNext}
                                    getPrev={props.getTransactionPrev}
                                /> */}

                        </Grid>
                    
               
            </Grid>


        </Layout>

    );
};


export default FreelancerWorkSummary;



// import React, { useState, useEffect, Fragment } from "react";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
// import { getTopupOrdersByUser } from "./apiUser";
// import { AdminLinks } from "./AdminDashboard";
// import { UserLinks } from "./UserDashboard";
// import moment from 'moment'
// import './seeTopupOrders.css';

// const SeeTopupOrders = ()=>{
//     const {user, token} = isAuthenticated();
//     const [topupOrders, setTopupOrders] = useState([]);

//     const init = async ()=>{
//         try{

//             const UsersTopupOrders = await getTopupOrdersByUser(user, token);
//             console.log(UsersTopupOrders)
//             setTopupOrders(UsersTopupOrders);

//         }catch(err){
//             console.log(err)
//         }        
//     }

//     useEffect(()=>{
//         init();
//     },[])

//     return(
//         <Layout
//             title="Dashboard"
//             description={`G'day!`}
//             className="container-fluid"
//         >
//             <div className="row">

//                 <div className="col-md-3">{ user.role === 1 ?

//                     <AdminLinks />
//                     :
//                     <UserLinks />
//                 }</div>

//                 <div className="col-md-9">

//                     <h5>My topup orders</h5>
//                     <div className="row">

//                         {
//                             topupOrders.map((order, i)=>(


//                                         <div className="col-md-4 p-5 topup-orders-list" key={order._id}>
//                                                 <h6 className="">Order id: <p className="order-id">{ order._id }</p></h6>

//                                                 <h6>Total Price: { order.price } Tk</h6>
//                                                 <h6>Status: {order.status} </h6>

//                                                 {
//                                                     order.pair ?
//                                                     <Link exact to={`/messages/pair/${order.pair._id}`} >
//                                                         <h5 className="border"><b>Send message</b></h5>
//                                                     </Link>
//                                                 :
//                                                     <Fragment></Fragment>

//                                                 }
//                                                 <h6>Player ID: {order.user._id} </h6>
//                                                 <p className="time">Time: {moment(order.createdAt).fromNow()}</p>


//                                         </div>

//                             ) )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default SeeTopupOrders;
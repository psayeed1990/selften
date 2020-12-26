import React, { useContext, useState, useRef } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { API } from './../config';
import './adminDashboard.css';
import { NotificationsContext } from "../context/notificationsContext";


export const AdminLinks = () => {
    const [notifications, setNotifications] = useContext(NotificationsContext);
    return ( 
        <div className="card">
            <h4 className="card-header">Admin Links</h4>
           
            <ul className="list-group">
            <li className="list-group-item">
                <Link className="nav-link" to="/admin/assigned-topup-orders">
                        Assigned topup orders
                 </Link>
            </li>
             <li className="list-group-item">
                    <Link className="nav-link" to="/admin/topup-orders">
                        See New Topup Orders
                    </Link>
                </li>
            <li className="list-group-item">
                <Link className="nav-link" to="/admin/messages">
                        See messages <sup className="notifications">{ notifications }</sup>
                 </Link>
            </li>

            <li className="list-group-item">
                    <Link className="nav-link" to="/admin/balance-stock">
                        Stocks for topup
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/diamond-value">
                        Diamond or Purchase Point
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/add-coupons">
                        Add coupons
                    </Link>
                </li>
                 <li className="list-group-item">
                    <Link className="nav-link" to="/admin/recharge-package">
                        Create Recharge Package
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/topup">
                        Create Game for Topup
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">
                        Create Category
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/product">
                        Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/orders">
                        View Orders
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/products">
                        Manage Products
                    </Link>
                </li>
               
               
                
            </ul>
        </div>
    );
};

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();



    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                 
                <div className="col-md-3"><AdminLinks /></div>
              
                <div className="col-md-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;

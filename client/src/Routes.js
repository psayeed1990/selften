import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/updateCategory';
import AddTopupThumb from './admin/topup/AddTopupThumb';
import TopupForm from './core/topup/TopupForm.js';
import AddRechargePackage from './admin/rechargePackage/AddRechargePackage';
import ShowTopupOrders from './admin/topupOrder/ShowTopupOrders';
import AddBalance from './admin/balance/AddBalance';
import ShowMessagePair from './message/ShowMessagePair';
import ShowChat from './message/ShowChat';
import { UserProvider } from './context/notificationsContext';
import AssignedTopupOrders from './admin/topupOrder/AssignedTopupOrders';
import ShowAdmins from './admin/topupOrder/ShowAdmins';
import ModifyDiamondsValue from './admin/diamonds/ModifyDiamondsValue';
import AddCoupon from './admin/coupon/AddCoupon';
import ShowCoupon from './admin/coupon/ShowCoupon';
import TopupOrderSuccess from './core/topup/TopupOrderSuccess';
import TopupOrderFail from './core/topup/TopupOrderFail';
import TermsCondition from './core/TermsCondition';
import Shipment from './core/Shipment';
import AboutUs from './core/AboutUs';
import ReturnPolicy from './core/ReturnPolicy';
import PrivacyPolicy from './core/PrivacyPolicy';



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/terms-condition" exact component={TermsCondition} />
                <Route path="/privacy-policy" exact component={PrivacyPolicy} />
                <Route path="/refund-return-policy" exact component={ReturnPolicy} />
                <Route path="/about-us" exact component={AboutUs} />
                <Route path="/shipment-info" exact component={Shipment} />


                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/topup-order/success/:transactionId" exact component={TopupOrderSuccess} />
                <Route path="/topup-order/fail/:transactionId" exact component={TopupOrderFail} />
                
                <UserProvider>
                    <PrivateRoute path="/user/coupons" exact component={ ShowCoupon } />
                    <AdminRoute path="/admin/add-coupons" exact component={ AddCoupon } />
                    <AdminRoute path="/admin/diamond-value" exact component={ ModifyDiamondsValue } />
                    <AdminRoute path="/admin/topup" exact component={AddTopupThumb} />
                    <AdminRoute path="/admin/assign-topup-order/:topupOrderId" exact component={ShowAdmins} />
                    <AdminRoute path="/admin/balance-stock" exact component={ AddBalance } />
                    <AdminRoute path="/admin/topup-orders" exact component={ShowTopupOrders} />
                    <AdminRoute path="/admin/assigned-topup-orders" exact component={AssignedTopupOrders} />
                    <AdminRoute path="/admin/recharge-package" exact component={AddRechargePackage} />
                    <PrivateRoute path="/topups/:id/type/:type" exact component={TopupForm} />
                    <PrivateRoute path="/user/messages" exact component={ShowMessagePair} />
                    <AdminRoute path="/admin/messages" exact component={ShowMessagePair} />
                    <PrivateRoute path="/messages/pair/:pairId" exact component={ShowChat} />
                    
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/category" exact component={AddCategory} />
                    <AdminRoute path="/create/product" exact component={AddProduct} />
                    
                    <AdminRoute path="/admin/orders" exact component={Orders} />
                    <PrivateRoute path="/profile/:userId" exact component={Profile} />
                    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                </UserProvider>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { Card, Container, Grid, CardContent, Button, Typography } from '@material-ui/core';
import logo from '../images/logo/Logo.png';

import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    console.log(data);
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <Fragment>
            <Card variant="outlined" style={{ padding: '15px' }}>
                <CardContent >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '-15px' }}>
                        <img style={{ width: '50%' }} src={logo} />
                    </div>
                    <Typography style={{textAlign: 'center', marginBottom: '10px', fontSize: '22px', color: 'gray'}}>Sign-in to SELFTEN.COM</Typography>
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Phone or Email"
                            variant="outlined"
                            onChange={handleChange("email")}
                            type="text"
                            value={email}
                            placeholder="Enter your Phone or Email"
                        />
                        <br />
                        <br />

                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={handleChange("password")}
                            value={password}
                            placeholder="Enter your Password"
                        />
                        <br />
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button color="primary" style={{ backgroundColor: '#CC4C78' }} variant="contained" onClick={clickSubmit}>
                                Login
                            </Button>
                            <Link exact to="/forget-password" >Forget Password?</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <br/>
            <div style={{textAlign: 'center'}}>
                <Typography variant="body1">Sign-in with social network account</Typography>

                <Button
                      className="googleFbBtn"
                    //   onClick={renderProps.onClick}
                      style={{
                        boxShadow: "0px 3px 6px #00000029",
                        margin: "10px",
                        height: "50px",
                        backgroundColor: "#fff",
                        padding: "6px 12px",
                      }}
                    >
                      <img
                        id="fbImg"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "25px",
                        }}
                        src={require('../images/logo/facebook.png')}
                        alt=""
                      />
                      Facebook
                    </Button>
                    <Button
                      className="googleFbBtn"
                    //   onClick={renderProps.onClick}
                      style={{
                        boxShadow: "0px 3px 6px #00000029",
                        height: "50px",
                        margin: "10px",
                        backgroundColor: "#fff",
                        padding: "6px 12px",
                      }}
                    >
                      <img
                        id="googleImg"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "25px",
                        }}
                        src={require('../images/logo/google.png')}
                        alt=""
                      />
                      Google
                    </Button>
                        
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{outline: 'none', marginTop: '10px', backgroundColor: "#BD1F58"}}
                    >
                        <Link to='/user/sign-up' style={{textDecoration: 'none', color: 'white'}}>
                            New to SELFTEN.COM Sign up now
                        </Link>
                    
                    </Button>
            </div>

            {/* <form>
            <div className="form-group">
                <label className="text-muted">Email or Phone Numbers</label>
                <input
                    onChange={handleChange("email")}
                    type="text"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary submit-btn">
                Login
            </button>
            
        </form> */}



        </Fragment>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Selften"
            className="container col-md-8 offset-md-2"
        >
           
                <Grid container spacing={2} >
                    <Grid md={2} />
                    <Grid md={8} xs={12}>

                        {showLoading()}
                        {showError()}
                        {signUpForm()}
                        {redirectUser()}

                    </Grid>
                    <Grid md={2} />

                </Grid>
           

        </Layout>
    );
};

export default Signin;




// import React, { Fragment, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import TextField from '@material-ui/core/TextField';

// import Layout from "../core/Layout";
// import { signin, authenticate, isAuthenticated } from "../auth";

// const Signin = () => {
//     const [values, setValues] = useState({
//         email: "",
//         password: "",
//         error: "",
//         loading: false,
//         redirectToReferrer: false
//     });

//     const { email, password, loading, error, redirectToReferrer } = values;
//     const { user } = isAuthenticated();

//     const handleChange = name => event => {
//         setValues({ ...values, error: false, [name]: event.target.value });
//     };

//     const clickSubmit = event => {
//         event.preventDefault();
//         setValues({ ...values, error: false, loading: true });
//         signin({ email, password }).then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error, loading: false });
//             } else {
//                 authenticate(data, () => {
//                     setValues({
//                         ...values,
//                         redirectToReferrer: true
//                     });
//                 });
//             }
//         });
//     };

//     const signUpForm = () => (
//     <Fragment>
//         <form>
//             <div className="form-group">
//                 <label className="text-muted">Email or Phone Numbers</label>
//                 <input
//                     onChange={handleChange("email")}
//                     type="text"
//                     className="form-control"
//                     value={email}
//                 />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Password</label>
//                 <input
//                     onChange={handleChange("password")}
//                     type="password"
//                     className="form-control"
//                     value={password}
//                 />
//             </div>
//             <button onClick={clickSubmit} className="btn btn-primary submit-btn">
//                 Login
//             </button>

//         </form>
//         <Link exact to="/forget-password" >Forget Password?</Link>
//     </Fragment>
//     );

//     const showError = () => (
//         <div
//             className="alert alert-danger"
//             style={{ display: error ? "" : "none" }}
//         >
//             {error}
//         </div>
//     );

//     const showLoading = () =>
//         loading && (
//             <div className="alert alert-info">
//                 <h2>Loading...</h2>
//             </div>
//         );

//     const redirectUser = () => {
//         if (redirectToReferrer) {
//             if (user && user.role === 1) {
//                 return <Redirect to="/admin/dashboard" />;
//             } else {
//                 return <Redirect to="/user/dashboard" />;
//             }
//         }
//         if (isAuthenticated()) {
//             return <Redirect to="/" />;
//         }
//     };

//     return (
//         <Layout
//             title="Signin"
//             description="Signin to Selften"
//             className="container col-md-8 offset-md-2"
//         >
//             {showLoading()}
//             {showError()}
//             {signUpForm()}
//             {redirectUser()}
//         </Layout>
//     );
// };

// export default Signin;

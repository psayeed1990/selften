import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../core/apiCore';
import { API } from "../config";
import ShowThumb from '../core/ShowThumb';
// import CategorySkeleton from '../../common/CategorySkeleton';
import { Container, Grid, CardContent, Button, Typography,CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import SliceText from '../utils/SliceText';
import Card from './material/Card';
import HomeApplianceSingleCard from './HomeAppliancesingleCard';
import '../styles.css';

const ShowTopups = () => {
    const [productsBySell, setProductsBySell] = useState([]);

    const init = async () => {
        try {
            const datas = await getProducts('sold');
            setProductsBySell(datas);
        } catch (err) {

        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Fragment>
            <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap", marginBottom: '30px' }}
                className="homeOutside"
            >
                <div className="homeInside">
                <Typography variant="h5" >Home Appliance</Typography>

                </div>


                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="texty"
                            // size="small"
                            // margin = "dense"
                            // value={values.password}
                            // onChange={handleChange('password')}
                            style={{ height: '50px' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disableElevation
                        style={{ marginLeft: '10px' }}
                    >
                        View All
                </Button>
                </div>

            </div>

            <Grid container spacing={3}>
                {productsBySell.length > 0 ? productsBySell.map((product, i) => (

                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <Link to={`/product/$`}>
                            <HomeApplianceSingleCard product = {product} />
                        </Link>
                    </Grid>

                    // {/* <Grid item xs={6} sm={4} md={3} lg={2}>
                    //     <Link to={`/product/$`}>
                    //         <Card >
                    //         <CardMedia
                                   
                    //                 image={require('../images/logo/coc_logo.png')} 
                    //                 title="Paella dish"
                    //             />
                    //             <div style={{ padding: '10px' }}>
                    //                 <Typography
                    //                     variant="h6"
                    //                     style={{ lineHeight: 1 }}
                    //                 >

                    //                     <SliceText number={25}>Normal Demoprofuct form buy and sell</SliceText>
                    //                 </Typography>
                    //                 <Typography style={{ marginTop: '10px', fontWeight: 'bold' }}>
                    //                     $5000
                    //                 </Typography>
                    //             </div>
                    //         </Card>
                    //     </Link>
                    // </Grid> */}



                    // {/* <Grid item xs={6} sm={4} md={3} lg={2}>
                    //     <Link to={`/product/${product._id}`}>
                    //         <Card image={`${API}/product/photo/${product._id}`} text={product.name} >
                    //             <div style={{ padding: '10px' }}>
                    //                 <Typography
                    //                     variant="h6"
                    //                     style={{ lineHeight: 1 }}
                    //                 >

                    //                     <SliceText number={25}>{product.name}</SliceText>
                    //                 </Typography>
                    //                 <Typography style={{ marginTop: '10px', fontWeight: 'bold' }}>
                    //                     ${product.price}
                    //                 </Typography>
                    //             </div>
                    //         </Card>
                    //     </Link>
                    // </Grid> */}

                )) : "loading"
                }


                {/* <Grid item xs={12} sm={6} md={4} lg={2}>
                   <Card image={require('../images/testing/Screenshot_13.png')} text='testing'>
                        <div style={{padding: '10px'}}>
                            <Typography
                                variant="h6" 
                                style={{lineHeight: 1}} 
                            >

                                <SliceText number={25}>Demo Testing text compoennt</SliceText>
                            </Typography>
                            <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>
                                $500.99
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                   <Card image={require('../images/testing/Screenshot_13.png')} text='testing'>
                        <div style={{padding: '10px'}}>
                            <Typography
                                variant="h6" 
                                style={{lineHeight: 1}} 
                            >

                                <SliceText number={25}>Demo Testing text compoennt</SliceText>
                            </Typography>
                            <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>
                                $500.99
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                   <Card image={require('../images/testing/Screenshot_13.png')} text='testing'>
                        <div style={{padding: '10px'}}>
                            <Typography
                                variant="h6" 
                                style={{lineHeight: 1}} 
                            >

                                <SliceText number={25}>Demo Testing text compoennt</SliceText>
                            </Typography>
                            <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>
                                $500.99
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                   <Card image={require('../images/testing/Screenshot_13.png')} text='testing'>
                        <div style={{padding: '10px'}}>
                            <Typography
                                variant="h6" 
                                style={{lineHeight: 1}} 
                            >

                                <SliceText number={25}>Demo Testing text compoennt</SliceText>
                            </Typography>
                            <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>
                                $500.99
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                   <Card image={require('../images/testing/Screenshot_13.png')} text='testing'>
                        <div style={{padding: '10px'}}>
                            <Typography
                                variant="h6" 
                                style={{lineHeight: 1}} 
                            >

                                <SliceText number={25}>Demo Testing text compoennt</SliceText>
                            </Typography>
                            <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>
                                $500.99
                            </Typography>
                        </div>
                    </Card>
                </Grid> */}
            </Grid>



        </Fragment>
    )
}

export default ShowTopups;



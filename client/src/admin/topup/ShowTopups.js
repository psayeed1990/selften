import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopupThumbs } from '../../core/apiCore';
import ShowThumb from '../../core/ShowThumb';
import './showTopup.css';
import TopCateogry from '../../common/TopCategory';
import CategorySkeleton from '../../common/CategorySkeleton';
import { Button, Grid, Typography } from '@material-ui/core';
import Card from '../../common/material/Card';
import SliceText from '../../utils/SliceText';
import { API } from "../../config";


const ShowTopups = () => {
    const [topupThumbnails, setThumbNails] = useState([]);

    const init = async () => {
        try {
            const topupThumbs = await getTopupThumbs();
            setThumbNails(topupThumbs);
        } catch (err) {

        }

    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Fragment>
            <Grid container spacing={3}>

                {
                    topupThumbnails.length > 0 ?
                       topupThumbnails.map((thumb, i) => (
                            <Grid item xs={4} sm={4} md={5} lg={2}>
                                <Link to={`/topups/${thumb._id}/type/${thumb.type}`} style={{textDecoration: 'none'}}>
                                    <Card image={`${API}/topup-thumbs/photo/${thumb._id}`} text={thumb.title} style={{border: 'none', hover: 'none'}}>
                                        <div style={{ padding: '10px' }}>
                                            <Typography
                                                variant="body"
                                                style={{ lineHeight: 1, textTransform: "uppercase", fontSize: "14px" }}
                                            >
                                                <SliceText number={20}>{thumb.title}</SliceText>
                                            </Typography>
                                        </div>
                                    </Card>
                                </Link>
                            </Grid> 
                            
                      

                        ))

                        :

                        <Fragment>
                            <CategorySkeleton height={200} item={[1, 2, 3, 4, 5]} />
                        </Fragment>
                }
                <div style={{margin: '0 auto'}}>
                <Button style={{ marginTop: "20px" }} variant="outlined" color="primary">View All Games</Button>

                </div>
                
            </Grid>
            {/* <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <FormControl  variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="texty"
                        // size="small"
                        // margin = "dense"
                        // value={values.password}
                        // onChange={handleChange('password')}
                        style={{height: '50px'}}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    <SearchIcon/>
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
                    style={{marginLeft: '10px'}}
                >
                    View All
                </Button>
            </div> */}


        </Fragment>
    )
}

export default ShowTopups;












// import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getTopupThumbs } from '../../core/apiCore';
// import ShowThumb from '../../core/ShowThumb';
// import './showTopup.css';
// import TopCateogry from '../../common/TopCategory';
// import CategorySkeleton from '../../common/CategorySkeleton';


// const ShowTopups = ()=>{
//     const [topupThumbnails, setThumbNails] =useState([]);

//     const init = async ()=>{
//         try{
//             const topupThumbs = await getTopupThumbs();
//             setThumbNails(topupThumbs);
//         }catch(err){

//         }

//     }

//     useEffect(()=>{
//         init();          
//     },[]);

//     return(
//         <Fragment>


//             {/* <div className="row">
//                 <div className="col-6">
//                     <h5 className="site-name-footer">Popular Game topup</h5>

//                 </div>
//                 <div  className="col-6">
//                     <div className="row view-all"><Link exact to="/topups">View All Topups</Link></div>

//                 </div>
//             </div> */}


//         {/* <div className="row center-flex"> */}



//                     {
//                         topupThumbnails.length > 0 ? 
//                             <TopCateogry height={200} item = {topupThumbnails} />

//                         // topupThumbnails.map((thumb, i)=>{

//                         //     return(
//                         //         <Fragment>
//                         //         {i < 5 ? 
//                         //         <div className="col-6 col-sm-2 c md={4}ol-lg32 thumb-show" key={thumb._id}>
//                         //             <Link exact to={`/topups/${thumb._id}/type/${thumb.type}`}>

//                         //                 <ShowThumb item={thumb} url="topup-thumbs" />
//                         //                 {/* <TopCateogry /> */}
//                         //                 <h6>{ thumb.title }</h6>
//                         //             </Link>
//                         //         </div> 
//                         //         :
//                         //         <Fragment></Fragment>

//                         //         }
//                         //         </Fragment>

//                         //     )

//                         // })
//                         :
//                         <Fragment>
//                              <CategorySkeleton height={200} item = {[1,2,3,4,5]} />
//                         </Fragment>
//                     }

//         {/* </div> */}

//         </Fragment>
//     )
// }

// export default ShowTopups;
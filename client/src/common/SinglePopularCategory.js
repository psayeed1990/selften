import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActionArea,
    CardMedia,
    Container,
    Typography,
    Grid
} from "@material-ui/core";
// import { connect } from "react-redux";
// import { getTrendingCategory } from "../../../reducer/home";
import { Link } from "react-router-dom";
// import { showIamge } from "../../../utils/utils";
import Carousel from "react-multi-carousel";
// import SliceText from "../../../hoc/SliceText";
import { API } from "../config";
import "react-multi-carousel/lib/styles.css";


function CategoriesWithImg({ item, height }) {

    return (
        <div style={{ paddingTop: "10px", }}>
          
            <Grid container spacing={1}  >

                {item.map((el) => (

                    <Grid item xs={4}>
                      
                           
                            <Link
                            key={item.id}
                            style={{ textDecoration: "none" }}
                            to={`/categories/${el._id}`}
                        >
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={el.name}
                                            height={height || 80}
                                            // image = {require('../images/logo/coc_logo.png')}
                                            image={`${API}/categories/photo/${el._id}`}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            style={{ padding: "10px 0", fontSize: "13px" }}
                                        >
                                            {/* <Typography style={{}}> */}
                                            <p>{el.name}</p>
                                            {/* <SliceText number={14}>{item.name}</SliceText> */}
                                            {/* </Typography> */}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                                </Link>
                          
                       
                    </Grid>
                ))}
            </Grid>
           
        </div>
    );
}

export default CategoriesWithImg;




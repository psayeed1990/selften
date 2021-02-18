import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
   Card,
  CardActionArea,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
// import { connect } from "react-redux";
// import { getTrendingCategory } from "../../../reducer/home";
import { Link } from "react-router-dom";
// import { showIamge } from "../../../utils/utils";
import Carousel from "react-multi-carousel";
// import SliceText from "../../../hoc/SliceText";
import { API } from "../config";
import "react-multi-carousel/lib/styles.css";
import SkeletonPost from '../utils/skeletonPost/SkeletonPost';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 3000, min: 700 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 700, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btn: {
    margin: "-15px",
  },
  buttonHover: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transition: "all .3s",
    "&:hover": {
      backgroundColor: "#00B0FF",
      color: "white",
    },
  },
  buttonHoverColor: {
    marginRight: "30px",
    transition: "all .3s",
    "&:hover": {
      color: "#00B0FF",
    },
  },
}));

function CategoriesWithImg({
item,
height,
}) {
  const classess = useStyles();

  return (
    <Container>
      <div style={{ paddingTop: "10px",}}>
        {item && (
          <Carousel
            responsive={responsive}
            infinite
            slidesToSlide={2}
            autoPlay
            autoPlaySpeed={2000}
          >
            {item.map((item) => (
              
                <div style={{ margin: "5px", height: height || 80 }}>
                 <SkeletonPost  />
                </div>
            
            ))}
          </Carousel>
        )}
      </div>
    </Container>
  );
}

export default CategoriesWithImg;




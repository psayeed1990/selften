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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 3000, min: 700 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 700, min: 500 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 3,
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
    // <Container>
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
              <Link
                key={item.id}
                style={{ textDecoration: "none" }}
                to={`/categories/${item._id}`}
              >
                <div style={{margin: '0 10px'}}>
                  <Card className={classess.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height={height || 80}
                        image={`${API}/categories/photo/${item._id}`}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ padding: "10px 0",  fontSize: "13px"  }}
                      >
                        {/* <Typography style={{}}> */}
                        <p>{item.name}</p>
                          {/* <SliceText number={14}>{item.name}</SliceText> */}
                        {/* </Typography> */}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    // </Container>
  );
}

export default CategoriesWithImg;




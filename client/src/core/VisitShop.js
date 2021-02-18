import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Divider from '@material-ui/core/Divider';


const goods = [
    {
        "id" : "1",
        "image" : 'https://i.ibb.co/StY5gDw/Logo.png'
    },
    {
        "id" : "2",
        "image" : 'https://i.ibb.co/StY5gDw/Logo.png'

    },
    {
        "id" : "3",
        "image" : 'https://i.ibb.co/StY5gDw/Logo.png'

    },
    {
        "id" : "4",
        "image" : 'https://i.ibb.co/StY5gDw/Logo.png'

    },
    {
        "id" : "5",
        "image" : 'https://i.ibb.co/StY5gDw/Logo.png'

    },
    {
        "id" : "6",
        "image" : 'https://i.ibb.co/BwBmZ0J/download-6.jpg'

    }
]


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 700 },
        items: 6
    },
    tablet: {
        breakpoint: { max: 700, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const VisitShop = () => {
    return (
        <Container style={{padding : '30px'}}>
            <Grid container item md={12} style={{paddingTop : '20px', display : 'flex' , justifyContent : "center"}}>
                <Typography variant="h6">
                    Our Shop
                </Typography>
            </Grid>

            <Divider style={{margin : '15px 0'}}/>

            <Carousel
                infinite
                autoPlay
                autoPlaySpeed={5000}
                responsive={responsive} 
            >

                {
                    goods.map((el) => 
                        <Card key={el.id} style ={{margin : '5px'}}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="80"
                                image={el.image}
                                title="goods-images"
                                />
                        </Card>

                    )
                }
            </Carousel>
        </Container>
    );
};

export default VisitShop;

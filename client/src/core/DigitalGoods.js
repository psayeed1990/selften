import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Divider from '@material-ui/core/Divider';


const goods = [
    {
        "id" : "1",
        "name" : "test card 1",
        "tk" : "TK 350",
        "review" : 3,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'
    },
    {
        "id" : "2",
        "name" : "test card 2",
        "tk" : "TK 355",
        "review" : 2,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'

    },
    {
        "id" : "3",
        "name" : "test card 3",
        "tk" : "TK 3500",
        "review" : 1,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'

    },
    {
        "id" : "4",
        "name" : "test card 4",
        "tk" : "TK 560",
        "review" : 3,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'

    },
    {
        "id" : "5",
        "name" : "test card 5",
        "tk" : "TK 6300",
        "review" : 3,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'

    },
    {
        "id" : "6",
        "name" : "test card 6",
        "tk" : "TK 3850",
        "review" : 3,
        "image" : 'https://i.ibb.co/9sqRym9/newBooks.png'

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

const DigitalGoods = () => {
    return (
        <Container style={{padding : '30px'}}>
            <Grid container item md={12} style={{display : 'flex', justifyContent :'space-between', paddingTop : '20px'}}>
                <Typography variant="h6">
                    Digital Goods
                </Typography>
                <Button variant="contained" color="primary">
                    View More
                </Button>
            </Grid>

            <Divider style={{margin : '15px 0'}}/>

            <Carousel
                // showDots={true}
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
                                height="140"
                                image={el.image}
                                title="goods-images"
                                />
                            <CardContent style={{padding : '10px 10px', marginTop : '5px'}}>
                                <Typography variant="h6"  color="textSecondary" style={{fontWeight : '500'}}>
                                   {el.tk}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    <StarRateIcon style={{color : '#ffff00'}}/> 
                                    <StarRateIcon style={{color : '#ffff00'}}/>
                                    <StarRateIcon style={{color : '#ffff00'}}/>
                                    <StarRateIcon style={{color : '#ffff00'}}/>
                                    <StarRateIcon style={{color : '#ffff00'}}/>
                                    {el.review}
                                </Typography>
                                <Typography variant="body1" component="p" style={{fontWeight : '600' , marginRight : '10px'}}>
                                    {el.name}
                                </Typography>
                            </CardContent>
                        </Card>

                    )
                }
            </Carousel>
        </Container>
    );
};

export default DigitalGoods;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { API } from "../config";
import SliceText from '../utils/SliceText';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ product }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`${API}/product/photo/${product._id}`}
                    title={product.name}
                />
                <CardContent>

                    <Typography variant="body1" color="textSecondary" component="h6">
                        <SliceText number={20}>
                            {product.name}

                        </SliceText>

                    </Typography>

                    {/* <Typography variant="h6" color="textSecondary" style={{marginTop: '10px'}} >
          BDT <del>{product.price}</del>
          </Typography> */}
                    <Typography variant="h6" color="textSecondary">

                        BDT {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}
import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";

function CardComponent({
image,
 children,
 text,
 style
}) {
 
  return (
    <Card style={style} elevation={0} variant="outlined">
      <CardActionArea>
        <CardMedia
          style={{borderRadius: '10px'}}
          component="img"
          alt={text}
          image={image}
        />
       {children}
      </CardActionArea>
    </Card>

  );
}

export default CardComponent;




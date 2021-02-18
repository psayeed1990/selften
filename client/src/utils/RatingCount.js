import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function RatingCount({value, style}) {
  
  return (
    <div>
     
      <Box style={style} component="fieldset"  borderColor="transparent">
        <Rating name="read-only" value={value} readOnly />
      </Box>
     
    </div>
  );
}
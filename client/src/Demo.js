import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';


export default function OutlinedCard() {
 

  return (
    <div style={{margin: "100px"}}>
              <div style={{textAlign: "center", marginBottom: "-20px"}}>
        <Button 
          sizes="small" 
          variant="contained" 
          style={{textAlign: 'center', backgroundColor: "#CCF9E2", borderRadius: '10px', color: "#57C797", boxShadow: 'none', fontWeight: "bold"}}>
            SelfTen Credits
        </Button>
        </div>
        <div style={{textAlign: "right", marginTop: "-20px", marginRight: '-10px' }}><p style={{color: "#57C797", fontSize: "19px", fontWeight: "bold"}}>+5</p></div>

    <Card variant="outlined">
      <CardContent>
        <div style={{textAlign: "center"}}>
          <TextField 
            id="standard-basic" 
            size="small"  
            placeholder="Voucher Code" 
            variant="outlined" 
            style={{borderRadius: "20px"}}
          />
        <Button 
          sizes="large" 
          variant="contained" 
          style={{textAlign: 'center', padding: "8px 15px",  borderRadius: 'none', color: "white", boxShadow: 'none', marginLeft: "5px"}}
          color="primary"
        >
           Apply
        </Button>

        </div>
       
       
      </CardContent>
   
    </Card>
    </div>
  );
}

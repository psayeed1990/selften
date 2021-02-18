import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div>
    <List
      dense={true}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Police Apps
        </ListSubheader>
      }
    >
        <Grid container style={{textAlign: "center"}} spacing={2}>
          <Grid item container xs={12}>
            <Grid item xs={6}>
                {/* <img className="img-thumbnail" style={{width: "100px", height: "auto"}} src={require('../../../static/firstApp.png')} /> */}
            </Grid>
            <Grid item xs={6}>
                {/* <img className="img-thumbnail" style={{width: "100px", height: "auto"}} src={require('../../../static/secondApp.png')} /> */}
            </Grid>
          </Grid>
      </Grid>
      <Grid container style={{textAlign: "center"}} spacing={2}>
          <Grid item container xs={12}>
            <Grid item xs={6}>
                {/* <img className="img-thumbnail" style={{width: "100px", height: "auto"}} src={require('../../../static/thirdApp.png')} /> */}
            </Grid>
            <Grid item xs={6}>
                {/* <img className="img-thumbnail" style={{width: "100px", height: "auto"}} src={require('../../../static/forthApp.png')} /> */}
            </Grid>
          </Grid>
      </Grid>
      </List>
    </div>
  );
}
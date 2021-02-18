import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

function Media(props) {
  // const { loading = false } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        {/* <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          }
          action={
              <IconButton aria-label="settings">
               
              </IconButton>
          }
          title={
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          subheader={ 
            <Skeleton animation="wave" height={10} width="40%" />
         }
        />
          <Skeleton animation="wave" variant="rect" className={classes.media} /> */}
      
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
            <React.Fragment>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
              
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 ,marginTop: 20}} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
      
            </React.Fragment>
        </CardContent>
      
      
      
        <Card className={classes.card} elevation={0}>
          <CardHeader
            avatar={
              <Skeleton animation="wave" variant="circle" width={40} height={40} />
            }
            action={
                <IconButton aria-label="settings">
                  {/* <MoreVertIcon /> */}
                </IconButton>
            }
            title={
                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            }
            subheader={ 
              <Skeleton animation="wave" height={10} width="40%" />
          }
          />
          
        </Card>
      </Card>
    </React.Fragment>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <div>
      <Media loading />
    </div>
  );
}

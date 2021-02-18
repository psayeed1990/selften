import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert  elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

 function CustomizedSnackbars(props) {
   
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    props.msg && setOpen(Boolean(props.msg))
  }, [props.msg])

  return (
    <div className={classes.root}>

      <Snackbar 
        open={open} 
        autoHideDuration={props.duration || 6000} 
        anchorOrigin={{
          vertical: 'top',
          horizontal: props.position || 'right',
        }} 
        onClose={handleClose}
      >
        {/* <Alert onClose={handleClose}  severity={props.severity}>
          {props.msg}
        </Alert> */}

        <Alert onClose={handleClose}  severity={props.severity}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='subtitle1'>
                    {props.msg}
                </Typography>
                
                {
                  props.btn && 
                    <Button 
                      variant='contained'
                      color='primary' 
                      size='small' 
                      style={{width: '50%' , margin : '5px auto'}}
                    > 
                      <Link style ={{color: '#ffffff', textDecoration : 'none'}} to='/plan'>
                      {/* <Link style ={{color: '#ffffff', textDecoration : 'none'}} to={props.btnLink}> */}
                         {props.btn} 
                      </Link>
                    </Button>
                }
            </div>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;

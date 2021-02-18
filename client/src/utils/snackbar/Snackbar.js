import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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

 export default function CustomizedSnackbars(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    props.open && setOpen(props.open)
  }, [props.open])

  return (
    <div className={classes.root}>

      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} 
        onClose={handleClose}
      >
        <Alert onClose={handleClose}  severity={props.variant}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

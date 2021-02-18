import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: props => props.align,
    alignItems: 'center',
    
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

 export default function CircularIndeterminate(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

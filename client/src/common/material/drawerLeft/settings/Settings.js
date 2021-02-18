import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleToggle = () => {
    setChecked((prevState) => !prevState);
    localStorage.setItem('checked', !checked);
    props.changeTheme(!checked)
  };


 useEffect(() => {
   const checkedValue = localStorage.getItem('checked') === 'true'
   setChecked(checkedValue);  
 }, [])
 

  return (
    <List 
        subheader={<ListSubheader>Settings</ListSubheader>} 
        className={classes.root}
        dense={true}
    >
      <ListItem>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Change Theme" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle}
            checked={checked}
            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

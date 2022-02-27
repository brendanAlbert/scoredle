import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useEffect } from 'react';

export default function RightDrawer({drawerOpenState, toggleDrawer, setmodalOpenState}) {
  const DRAWER_DIRECTION_FROM_RIGHT = "right";

  const openModal = () => {
    console.log('opening the modal');
    setmodalOpenState(true)
  }

  useEffect(() => {
    console.log({
      drawerOpenState,

    });
  },[]);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key={'Login'}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={'Login'} />
          </ListItem>

          <ListItem button 
          onClick={openModal}
          key={'Add Score'}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Add Score'} />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={DRAWER_DIRECTION_FROM_RIGHT}
        open={drawerOpenState}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

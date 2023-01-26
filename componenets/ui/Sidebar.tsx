import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor='left' open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            // <ListItem button key={index}>{text}</ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            // <ListItem button key={index}>{text}</ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

import { MouseEvent, MouseEventHandler, useContext } from 'react';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';

export const Nanvar = () => {
  const { openSideMenu } = useContext(UIContext);
  const router = useRouter();

  const handleRedirect = (e: any) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link underline='none' color={'white'} href='/' onClick={handleRedirect}>
          <Typography variant='h6'>OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

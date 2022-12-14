import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

export const Topbar = () => {
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container>
          <Toolbar sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Box width="35%">
              <Image
                src="/android-chrome-192x192.png"
                alt="Logo"
                width={50}
                height={50}
              />{' '}
            </Box>
            <Box width="65%" sx={{ zIndex: '5' }}>
              <h2>Sorteador de amigo secreto</h2>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

import { Divider, Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Stack
      direction="row"
      component="footer"
      spacing={8}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
        background: 'rgba(255, 255, 255, 0.165)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: ' blur(2.6px)',
        webkitBackdropFilter: 'blur(2.6px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
      }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        fontWeight={600}
        width="50%"
        maxWidth="200px"
      >
        {' '}
        Desenvolvido por{' '}
        <a
          href="https://linkedin.com/in/johkker"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          Johkker
        </a>{' '}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        width="50%"
        maxWidth="200px"
      >
        Powered by Next, Node & MUI.
      </Typography>
    </Stack>
  );
};

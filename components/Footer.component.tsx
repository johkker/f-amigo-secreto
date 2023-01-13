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
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        bottom: 0,
        right: 0,
        borderTop: '1px solid #bbbbbb',
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

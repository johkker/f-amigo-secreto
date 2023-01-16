import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import QuestionIcon from '@mui/icons-material/QuestionMark';
import CloseButton from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';

export const Topbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-around' }}
          >
            <Box>
              <Image
                src="/android-chrome-192x192.png"
                alt="Logo"
                width={50}
                height={50}
              />{' '}
            </Box>
            <Box sx={{ zIndex: '5' }}>
              <h2>Sorteador de amigo secreto</h2>
            </Box>
            <Box>
              <IconButton onClick={() => handleOpen()}>
                <QuestionIcon color="warning" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <Card sx={{ maxWidth: '500px', padding: '6%' }}>
          <IconButton
            sx={{
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            onClick={handleClose}
          >
            <CloseButton />
          </IconButton>
          <Typography variant="h5" color="text.primary" align="center">
            Como funciona?
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary" align="left">
            1 - O sistema irá verificar se todos participantes estão no
            WhatsApp.
            <br />
            2 - Será feito um sorteio aleatório de quem irá presentear quem.
            <br />
            3 - Uma mensagem será enviada para cada participante com o nome do
            amigo secreto.
            <br />
            4 - Um grupo será criado no WhatsApp com todos os participantes.
            <br />
            5 - Alguém aleatório será escolhido como Admin do grupo.
            <br />6 - O bot irá sair do grupo, para que mantenham a privacidade.
          </Typography>
          <br />
          <Typography variant="h5" color="text.primary" align="center">
            Como utilizar?
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary" align="left">
            - Insira o nome e número de todos os participantes e clique em{' '}
            <b>Sortear</b>.
            <br />
            - O número deve ser inserido no formato: 11999999999, ou seja, com o
            DDD e sem espaços.
            <br />- Não pode ter números repetidos. `
          </Typography>
        </Card>
      </Dialog>
    </>
  );
};

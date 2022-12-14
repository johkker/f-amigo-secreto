import { Button, Card, IconButton, TextField, Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';

interface Participante {
  name: string;
  number: string;
}
interface FormValues {
  name: string;
  value: string;
  endDate: string;
  users: Participante[];
}

export const Main = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState(3);
  const [participantes, setParticipantes] = useState<Participante[]>([
    { name: '', number: '' },
    { name: '', number: '' },
    { name: '', number: '' },
  ]);

  const handleAddParticipante = () => {
    setNumeroParticipantes(numeroParticipantes + 1);
    setParticipantes([...participantes, { name: '', number: '' }]);
  };

  const handleRemoveParticipante = (participanteToRemove: Participante) => {
    if (numeroParticipantes <= 3) {
      toast.error('É necessário no mínimo 3 participantes!');
      return;
    }

    setNumeroParticipantes(numeroParticipantes - 1);
    setParticipantes(
      participantes.filter(
        (participante) => participante !== participanteToRemove
      )
    );
  };

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    number: yup
      .string()
      .required('É necessário informar o número do usuário')
      .matches(
        /([0-9]){2}([0-9]){9}/g,
        'O número do usuário deve seguir o formato 11999999999'
      ),
  });

  const createNewGroupSchema = yup.object().shape({
    name: yup.string().required(),
    value: yup.number().required(),
    endDate: yup.date().required(),
    users: yup
      .array()
      .of(userSchema)
      .required('É necessário adicionar usários no grupo')
      .min(3, 'É necessário no mínimo 3 usuários')
      .test(
        'Números repetidos ou insuficientes',
        'Não é possível adicionar números repetidos nem insuficientes',
        (users) => {
          if (!users) return false;
          return new Set(users).size === users.length;
        }
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: yupResolver(createNewGroupSchema) });

  return (
    <Stack
      spacing={1}
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Toolbar
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: { display: 'none' },
        })}
      />
      <Toolbar />
      <Stack spacing={1} width="90%" maxWidth="450px">
        <form>
          <Stack spacing={1}>
            <h3>Grupo</h3>
            <TextField
              name="name"
              variant="outlined"
              size="small"
              placeholder="Nome do grupo"
              label="Nome"
              color="success"
              aria-label="Nome do grupo"
            />
            <TextField
              name="value"
              variant="outlined"
              size="small"
              placeholder="Valor máximo do presente"
              label="Valor"
              color="success"
              aria-label="Valor máximo do presente"
            />
          </Stack>
          <Stack spacing={1}>
            <Stack
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <h3>Participantes</h3>
              <IconButton
                size="large"
                aria-label="Adicionar participante ao sorteio"
                sx={{ position: 'relative', top: '7px' }}
                onClick={handleAddParticipante}
              >
                <AddIcon htmlColor="green" />
              </IconButton>
            </Stack>
            {participantes.map((participante, index) => {
              return (
                <Card
                  elevation={5}
                  sx={{ padding: '10px' }}
                  key={`participante.name+${index}`}
                >
                  <Stack
                    sx={(theme) => ({
                      flexDirection: theme.breakpoints.up('md')
                        ? 'row'
                        : 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                    })}
                  >
                    <TextField
                      name={`users[${index}].name`}
                      placeholder="Nome do participante"
                      label="Nome"
                      variant="outlined"
                      size="small"
                      color="success"
                      aria-label="Nome do participante a ser adicionado"
                    />
                    <TextField
                      name={`users[${index}].number`}
                      placeholder="Telefone do participante"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      color="success"
                      aria-label="Telefone do participante a ser adicionado"
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveParticipante(participante)}
                    >
                      <DeleteIcon
                        htmlColor="#f57683"
                        sx={{ width: '16px', height: '16px' }}
                      />
                    </IconButton>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
          <Button
            variant="contained"
            color="success"
            sx={{ width: '100%', marginTop: '20px', marginBottom: '50px' }}
          >
            Sortear
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

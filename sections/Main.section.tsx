import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FormValues, Participante } from '../interfaces';
import { createNewGroupSchema } from '../schemas';

export const Main = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState(3);
  const [participantes, setParticipantes] = useState<Participante[]>([
    { name: '', number: '' },
    { name: '', number: '' },
    { name: '', number: '' },
  ]);
  const [loading, setLoading] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: yupResolver(createNewGroupSchema) });

  const onSubmit = async (data: FormValues) => {
    const newValue = Number(data.value);
    const newData = {
      ...data,
      value: newValue,
    };

    setLoading(true);

    await axios
      .post('https://vps43788.publiccloud.com.br:3000', newData, {
        validateStatus(status) {
          return status >= 200 && status < 300 && status !== 204;
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        reset();
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
      });

    setLoading(false);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: '/background.png',
      }}
    >
      <Toolbar
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: { display: 'none' },
        })}
      />
      <Toolbar />
      <Stack spacing={1} width="90%" maxWidth="450px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <h3>Grupo</h3>
            <TextField
              {...register('name')}
              name="name"
              variant="outlined"
              size="small"
              placeholder="Nome do grupo"
              label="Nome"
              color="success"
              aria-label="Nome do grupo"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('value')}
              name="value"
              variant="outlined"
              size="small"
              placeholder="Valor máximo do presente"
              label="Valor"
              color="success"
              aria-label="Valor máximo do presente"
              error={!!errors.value}
              helperText={errors.value?.message}
            />
            <TextField
              {...register('endDate')}
              name="endDate"
              variant="outlined"
              size="small"
              placeholder="Data do amigo secreto"
              label="Data"
              color="success"
              aria-label="Data do amigo secreto"
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          </Stack>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <h3>Participantes</h3>
            <Tooltip title="Adicionar participante">
              <IconButton
                size="large"
                aria-label="Adicionar participante ao sorteio"
                sx={{ position: 'relative', top: '7px' }}
                onClick={handleAddParticipante}
              >
                <AddIcon htmlColor="green" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack spacing={1}>
            <Typography color="error">{errors.users?.message}</Typography>

            {participantes.map((participante, index) => {
              return (
                <Card
                  elevation={5}
                  sx={{
                    animation:
                      'slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                    padding: '10px',
                    border: '2px solid transparent',
                    background:
                      'linear-gradient(#FFFFFF, #FFFFFF) padding-box,linear-gradient(10deg, #FFFFFF 0%, #184A2C 50%,#FFFFFF 100%) border-box',
                  }}
                  key={`participante.name+${index}`}
                >
                  <Stack
                    sx={(theme) => ({
                      flexDirection: theme.breakpoints.up('md')
                        ? 'row'
                        : 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      gap: '3px',
                      paddingTop: '10px',
                    })}
                  >
                    {' '}
                    <TextField
                      {...register(`users.${index}.name`)}
                      name={`users[${index}].name`}
                      placeholder="Nome do participante"
                      label="Nome"
                      variant="outlined"
                      size="small"
                      color="success"
                      aria-label="Nome do participante a ser adicionado"
                      error={!!errors.users?.[index]?.name}
                      helperText={errors.users?.[index]?.name?.message}
                    />
                    <TextField
                      {...register(`users.${index}.number`)}
                      name={`users[${index}].number`}
                      placeholder="Telefone do participante"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      color="success"
                      aria-label="Telefone do participante a ser adicionado"
                      error={!!errors.users?.[index]?.number}
                      helperText={errors.users?.[index]?.number?.message}
                    />
                    <Tooltip title={`Remover ${participante.name}`}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveParticipante(participante)}
                      >
                        <DeleteIcon
                          htmlColor="#f24f5f"
                          sx={{ width: '16px', height: '16px' }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
          <Tooltip title="Realizar sorteio do grupo">
            <LoadingButton
              variant="contained"
              color="success"
              sx={{ width: '100%', marginTop: '20px', marginBottom: '50px' }}
              type="submit"
              loading={loading}
            >
              Sortear
            </LoadingButton>
          </Tooltip>
        </form>
      </Stack>
    </Stack>
  );
};

import {
  Card,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

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

  const userSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    number: yup
      .string()
      .required('Número é obrigatório')
      .matches(/([0-9]){2}([0-9]){9}/g, 'Formato: 00999999999'),
  });

  const createNewGroupSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    value: yup
      .string()
      .required('O valor é obrigatório')
      .matches(/([0-9])/g, 'O valor deve conter somente números'),
    endDate: yup.string().required('A data de término é obrigatória'),
    users: yup
      .array()
      .of(userSchema)
      .required('Mínimo de 3 pessoas')
      .min(3, 'Mínimo de 3 pessoas')
      .test('unique', 'Não é possível adicionar números repetidos', (users) => {
        if (!users) return false;
        const numbers = users.map((user) => user.number);
        const uniqueNumbers = new Set(numbers);
        return numbers.length === uniqueNumbers.size;
      }),
  });
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

            <Typography color="error">{errors.users?.message}</Typography>

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
          <LoadingButton
            variant="contained"
            color="success"
            sx={{ width: '100%', marginTop: '20px', marginBottom: '50px' }}
            type="submit"
            loading={loading}
          >
            Sortear
          </LoadingButton>
        </form>
      </Stack>
    </Stack>
  );
};

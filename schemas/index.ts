import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  number: yup
    .string()
    .required('Número é obrigatório')
    .matches(/([0-9]){2}([0-9]){9}/g, 'Formato: 00999999999'),
});

export const createNewGroupSchema = yup.object().shape({
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

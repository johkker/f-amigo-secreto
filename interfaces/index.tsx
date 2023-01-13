import { ReactNode } from 'react';

export interface Participante {
  name: string;
  number: string;
}
export interface FormValues {
  name: string;
  value: string;
  endDate: string;
  users: Participante[];
}

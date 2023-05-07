import { useQueries } from 'react-query';
import axios from 'axios';

import { CITIES_API_URL, DOCTORS_API_URL, SPECIALTIES_API_URL } from '../constants';

export const useAppointmentQueries = () => {
  const queryConfigurations = [
    {
      queryKey: ['cities'],
      queryFn: () => axios.get(CITIES_API_URL).then((res) => res.data),
    },
    {
      queryKey: ['specialties'],
      queryFn: () => axios.get(SPECIALTIES_API_URL).then((res) => res.data),
    },
    {
      queryKey: ['doctors'],
      queryFn: () => axios.get(DOCTORS_API_URL).then((res) => res.data),
    },
  ];

  const resultQueries = useQueries(queryConfigurations);

  return resultQueries;
};

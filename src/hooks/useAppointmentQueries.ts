import { useQueries } from 'react-query';
import axios from 'axios';

import { CITIES_API_URL, DOCTORS_API_URL, SPECIALITIES_API_URL } from '../constants';

export const useAppointmentQueries = () => {
  const queryConfigurations = [
    {
      queryKey: ['cities'],
      queryFn: () => axios.get(CITIES_API_URL).then((res) => res.data),
    },
    {
      queryKey: ['specialities'],
      queryFn: () => axios.get(SPECIALITIES_API_URL).then((res) => res.data),
    },
    {
      queryKey: ['doctors'],
      queryFn: () => axios.get(DOCTORS_API_URL).then((res) => res.data),
    },
  ];

  const resultQueries = useQueries(queryConfigurations);

  return resultQueries;
};

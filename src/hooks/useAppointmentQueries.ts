import { useQueries } from 'react-query';
import axios from 'axios';

export const useAppointmentQueries = () => {
  const queryConfigurations = [
    {
      queryKey: ['cities'],
      queryFn: () =>
        axios
          .get('https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4')
          .then((res) => res.data),
    },
    {
      queryKey: ['specialties'],
      queryFn: () =>
        axios
          .get('https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca')
          .then((res) => res.data),
    },
    {
      queryKey: ['doctors'],
      queryFn: () =>
        axios
          .get('https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21')
          .then((res) => res.data),
    },
  ];

  const resultQueries = useQueries(queryConfigurations);

  return resultQueries;
};

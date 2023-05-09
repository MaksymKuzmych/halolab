import { Route, Routes } from 'react-router-dom';

import { Form } from '../pages/Form/Form';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

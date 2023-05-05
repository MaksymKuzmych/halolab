import { ErrorBoundary } from 'react-error-boundary';

import './App.scss';
import { Error } from './components/Error/Error';

export const App = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <div className='App'></div>
    </ErrorBoundary>
  );
};

import { ErrorBoundary } from 'react-error-boundary';

import { Error } from './components/Error/Error';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AppRoutes } from './routes/AppRoutes';

import styles from './App.module.scss';

export const App = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Header />
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

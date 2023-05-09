import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@mui/material';

import { Error } from './components/Error/Error';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { theme } from './styles/theme';

import styles from './App.module.scss';

export const App = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <Header />
        <main className={styles.main}>
          <AppRoutes />
        </main>
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

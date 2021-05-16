import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { ThemeProvider } from '@chakra-ui/react';
import theme from '../config/chakraTheme';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from '../components/Login';

function MyApp({ Component, pageProps }) {
  const [user, error, loading] = useAuthState(auth);
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          {loading || error || user ? (
            <>
              <Component {...pageProps} />
            </>
          ) : (
            <>
              <LoginPage {...pageProps} />
            </>
          )}
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

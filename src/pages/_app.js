import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { ThemeProvider, theme } from '@chakra-ui/react';
import { auth } from '../firebase/firebase';
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

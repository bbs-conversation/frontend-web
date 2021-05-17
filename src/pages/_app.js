import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@chakra-ui/react';
import theme from '../config/chakraTheme';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from '../components/Login';
import GlobalStyles from '../config/globalStyles';
import { ChatProvider } from '../context/providers/ChatProvider';
import chatReducer, { chatInitialState } from '../context/reducers/chatReducer';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, error, loading] = useAuthState(auth);

  return (
    <>
      <ChatProvider reducer={chatReducer} initialState={chatInitialState}>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
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
      </ChatProvider>
    </>
  );
}

export default MyApp;

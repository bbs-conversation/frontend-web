import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
import { ThemeProvider } from '@chakra-ui/react';
// import theme from '../config/chakraTheme';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from '../components/Login';
import GlobalStyles from '../config/globalStyles';
import { ChatProvider } from '../context/providers/ChatProvider';
import chatReducer, { chatInitialState } from '../context/reducers/chatReducer';
import { useEffect } from 'react';
import { SocketProvider } from '../context/providers/SocketProvider';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) router.push('/home');
      if (!user) router.push('/login');
      if (error) router.push('/login');
    }
  }, [loading, user, error]);
  // if (loading) return <IndexPage />;
  return (
    <>
      <GlobalStyles />
      {!error || user ? (
        <>
          <SocketProvider
            id={typeof window !== 'undefined' && localStorage.getItem('id')}
          >
            <ChatProvider reducer={chatReducer} initialState={chatInitialState}>
              <ChakraProvider>
                <ThemeProvider theme={theme}>
                  <CSSReset />
                  <Component {...pageProps} />
                </ThemeProvider>
              </ChakraProvider>
            </ChatProvider>
          </SocketProvider>
        </>
      ) : (
        <>
          <ChakraProvider>
            <ThemeProvider theme={theme}>
              {<LoginPage {...pageProps} />}
            </ThemeProvider>
          </ChakraProvider>
        </>
      )}
    </>
  );
}

export default MyApp;

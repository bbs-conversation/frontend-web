import {
  ChakraProvider,
  CSSReset,
  theme,
  ThemeProvider,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import theme from '../config/chakraTheme';
import { auth } from '../config/firebase';
import GlobalStyles from '../config/globalStyles';
import { ChatProvider } from '../context/providers/ChatProvider';
import { SocketProvider } from '../context/providers/SocketProvider';
import chatReducer, { chatInitialState } from '../context/reducers/chatReducer';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  useEffect(() => {
    if (
      router.asPath === '/redirect' ||
      router.asPath === '/' ||
      router.asPath === '/install-app'
    ) {
      return;
    } else if ((!loading && !user) || router.asPath === '/login') {
      router.push('/redirect');
    } else {
      router.push(`/redirect?path=${router.asPath}`);
    }
  }, [loading, user, error]);
  useEffect(() => {
    window.addEventListener('offline', () => {
      toast.info('You are offline', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, []);

  return (
    <>
      <SocketProvider>
        <ChatProvider reducer={chatReducer} initialState={chatInitialState}>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <GlobalStyles />

          <ChakraProvider>
            <ThemeProvider theme={theme}>
              <CSSReset />
              <Component {...pageProps} />
            </ThemeProvider>
          </ChakraProvider>
        </ChatProvider>
      </SocketProvider>
    </>
  );
}

export default MyApp;

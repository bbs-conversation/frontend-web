import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
import { ThemeProvider } from '@chakra-ui/react';
// import theme from '../config/chakraTheme';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from '../components/Login';
import GlobalStyles from '../config/globalStyles';
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  useEffect(() => {
    if (router.asPath === '/redirect' || router.asPath === '/') {
      return;
    } else if ((!loading && !user) || router.asPath === '/login') {
      router.push('/redirect');
    } else {
      router.push(`/redirect?path=${router.asPath}`);
    }
  }, [loading, user, error]);

  return (
    <>
      <ToastContainer
        position='top-right'
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

      {user || !error ? (
        <>
          <ChakraProvider>
            <ThemeProvider theme={theme}>
              <CSSReset />
              <Component {...pageProps} />
            </ThemeProvider>
          </ChakraProvider>
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

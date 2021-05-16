import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { ThemeProvider, theme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

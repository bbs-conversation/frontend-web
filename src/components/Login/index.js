import React, { useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Container,
  Flex,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Header from '../Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleAuth } from '../../config/firebase';
import { FcGoogle } from 'react-icons/fc';
import { BiErrorCircle } from 'react-icons/bi';

const LoginPage = () => {
  const [user, error, loading] = useAuthState(auth);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [loginError, setLoginError] = useState('');
  const loginWithGoogle = () => {
    auth.signInWithPopup(googleAuth).catch((err) => {
      console.error(err), setLoginError(err.message);
    });
  };
  return (
    <>
      <Head>
        <title>Conversations | Login</title>
      </Head>
      <Header
        appName={isLargerThan768 ? 'Conversations | Login' : 'Conversations'}
        withNav={false}
      />
      <Container maxW='container.xl'>
        <Flex>
          {loading && (
            <Button
              margin={'auto'}
              isLoading
              loadingText='Loading'
              colorScheme='gray'
              variant='outline'
              spinnerPlacement='end'
            >
              Loading...
            </Button>
          )}
          {error ||
            (loginError !== '' && (
              <>
                <VStack margin={'auto'}>
                  <Button
                    margin={'auto'}
                    rightIcon={<BiErrorCircle />}
                    colorScheme='gray'
                    variant='outline'
                    isDisabled
                  >
                    An error occurred
                  </Button>
                  <Text margin={'auto'}>{error || loginError}</Text>
                </VStack>
              </>
            ))}
          {!user && (
            <>
              <Button
                margin={'auto'}
                rightIcon={<FcGoogle />}
                colorScheme='gray'
                variant='outline'
                onClick={loginWithGoogle}
              >
                Login with Google
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default LoginPage;

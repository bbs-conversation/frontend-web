import React from 'react';
import Head from 'next/head';
import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react';
import Header from '../Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleAuth } from '../../firebase/firebase';
import { FcGoogle } from 'react-icons/fc';
import { BiErrorCircle } from 'react-icons/bi';

const LoginPage = () => {
  const [user, error, loading] = useAuthState(auth);
  const loginWithGoogle = () => {
    auth.signInWithPopup(googleAuth);
  };
  return (
    <>
      <Head>
        <title>Conversations | Login</title>
      </Head>
      <Header appName={'Conversations | Login'} withNav={false} />
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
          {error && (
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
                <Text margin={'auto'}>{error}</Text>
              </VStack>
            </>
          )}
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

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
import { auth, db, microsoftAuth } from '../../config/firebase';
import { FaMicrosoft } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';

const LoginPage = () => {
  const [user, error, loading] = useAuthState(auth);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [loginError, setLoginError] = useState('');
  const loginWithMicrosoft = () => {
    auth
      .signInWithPopup(microsoftAuth)
      .then((result) => {
        if (result.user) {
          db.collection('users')
            .doc(result.user.uid)
            .set(
              {
                uid: result.user.uid,
                displayName: result.user.displayName,
                metadata: {
                  creationTime: result.user.metadata.creationTime,
                  lastSignInTime: result.user.metadata.lastSignInTime,
                },
                email: result.user.email,
                providerUID: result.user.providerData[0].uid,
                photoUrl: result.user.photoUrl || null,
                phoneNumber: result.user.phoneNumber || null,
                givenName: result.additionalUserInfo.profile.givenName || null,
                lastName: result.additionalUserInfo.profile.surname || null,
                jobTitle: result.additionalUserInfo.profile.jobTitle,
                providerId: result.additionalUserInfo.providerId,
              },
              { merge: true }
            )
            .then(() => {
              console.log('User written to db');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        }
      })
      .catch((err) => {
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
          {!user && !error && !loginError && (
            <>
              <Button
                margin={'auto'}
                rightIcon={<FaMicrosoft />}
                colorScheme='gray'
                variant='outline'
                onClick={loginWithMicrosoft}
                fontSize='22px'
              >
                Login with Microsoft
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default LoginPage;

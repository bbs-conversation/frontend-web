import { Grid, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import useListenToSocket from '../hooks/useListenToSocket';

const IndexPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (loading === false) {
      if (user) router.push('/home');
      if (!user) router.push('/login');
      if (error) router.push('/login');
    }
  }, [error, user, router, loading]);

  useListenToSocket(true, null);

  return (
    <>
      <Head>
        <title>Conversations</title>
      </Head>
      <Grid
        height={'100vh'}
        width={'100%'}
        alignSelf={'center'}
        justifyContent='center'
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          alignSelf={'center'}
          justifyContent='center'
        />
      </Grid>
    </>
  );
};

export default IndexPage;

import { Grid, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import useListenToSocket from '../hooks/useListenToSocket';
import paths from '../config/paths.json';

const Redirect = () => {
  const router = useRouter();
  const { path } = router.query;
  const [user] = useAuthState(auth);
  useListenToSocket(true);
  useEffect(() => {
    if (path) {
      if (!paths.includes(path)) return router.push('/home');
      router.push(path);
    } else if (user) {
      router.push('/home');
    } else if (!user) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [path, router, user]);
  return (
    <>
      <Head>
        <title>Conversations | Redirecting ...</title>
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
          label='Redirecting ...'
        />
      </Grid>
    </>
  );
};

export default Redirect;

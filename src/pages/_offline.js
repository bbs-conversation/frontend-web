import { Grid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Conversations | Offline</title>
      </Head>
      <Grid
        height={'100vh'}
        width={'100%'}
        alignSelf={'center'}
        justifyContent='center'
      >
        <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
          You are offline
        </Text>
      </Grid>
    </>
  );
};

export default IndexPage;

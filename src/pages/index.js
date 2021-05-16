import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Header from '../components/Header';
import { Skeleton } from '@chakra-ui/react';
import { Grid, Box } from '@chakra-ui/react';
import NavigationBlock from '../components/NavigationBlock';

const HomePage = () => {
  useEffect(() => {
    fetch('https://quotes.rest/qod', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setQuote(data.contents.quotes[0].quote))
      .catch((err) => console.error(err));
  }, []);

  const [quote, setQuote] = useState('');

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Header appName={'Conversations'} />
      <Container maxW='container.xl'>
        <Text textAlign='center' fontSize={'4xl'}>
          Hello Akshaj!
        </Text>
        {quote === '' ? (
          <>
            <Skeleton height='20px' />
          </>
        ) : (
          <>
            <Text textAlign='center'>Todays Quote: {quote}</Text>
          </>
        )}
        <Grid
          templateColumns='repeat(auto-fill, minmax(260px, 1fr))'
          gap={6}
          marginTop={5}
        >
          <NavigationBlock
            title={'Chat'}
            linkDescription={'with your counsellors privately'}
          />
          <NavigationBlock
            title={'Schedule'}
            linkDescription={'an appointment with your counsellor'}
          />
          <NavigationBlock
            title={'Request'}
            linkDescription={'your counsellors for a group session'}
          />
          <NavigationBlock
            title={'Attend'}
            linkDescription={'a group session with your peers and counsellors'}
          />
        </Grid>
        <Grid
          templateColumns='repeat(auto-fill, max(260px, 1fr))'
          gap={6}
          marginTop={5}
        >
          <NavigationBlock
            title={'Mindful Activities'}
            linkDescription={'Do mindful activities to calm yourself'}
          />
          <NavigationBlock
            title={'Resources and tips'}
            linkDescription={
              'Get access to resources and tips to help you in your tough times'
            }
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

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
          templateColumns='repeat(auto-fill, minmax(220px, 1fr))'
          gap={6}
          marginTop={5}
        >
          <NavigationBlock /> <NavigationBlock /> <NavigationBlock />
          <NavigationBlock /> <NavigationBlock /> <NavigationBlock />
          <NavigationBlock /> <NavigationBlock /> <NavigationBlock />
          <NavigationBlock /> <NavigationBlock /> <NavigationBlock />
          <NavigationBlock /> <NavigationBlock /> <NavigationBlock />
          <NavigationBlock />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

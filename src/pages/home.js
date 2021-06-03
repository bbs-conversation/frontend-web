import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, useMediaQuery } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import Header from '../components/Header';
import useListenToSocket from '../hooks/useListenToSocket';
import NavigationGrid from '../components/NavigationGrid';
const HomePage = () => {
  useEffect(() => {
    fetch('https://quotes.rest/qod', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setQuote(`Today's quote - ${data.contents.quotes[0].quote}`)
      )
      .catch((err) => {
        console.error(err);
        setQuote(
          `Sorry, there was some error loading the page please try again after sometime`
        );
      });
  }, []);

  const [quote, setQuote] = useState('');

  const [user] = useAuthState(auth);

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  useListenToSocket(true);

  return (
    <>
      <Head>
        <title>Conversations | Home</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' marginBottom={5}>
        {user ? (
          <Text
            textAlign='center'
            fontSize={isLargerThan768 ? '4xl' : '3xl'}
            as={'h3'}
          >
            Hello, {user?.displayName}!
          </Text>
        ) : (
          <>
            <Skeleton height='60px' />
          </>
        )}
        {quote === '' ? (
          <>
            <Skeleton height='20px' />
          </>
        ) : (
          <>
            <Text textAlign='center'>{quote}</Text>
          </>
        )}
        <NavigationGrid />
      </Container>
    </>
  );
};

export default HomePage;

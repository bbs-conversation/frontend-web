import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, useMediaQuery } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { BsChatDots } from 'react-icons/bs';
import {
  AiOutlineSchedule,
  AiOutlineQuestion,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import { GiMeditation } from 'react-icons/gi';
import { FaBook } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const HomePage = () => {
  const NavigationBlock = dynamic(
    () => import('../components/NavigationBlock'),
    {
      ssr: false,
    }
  );
  const Header = dynamic(() => import('../components/Header'), {
    ssr: false,
  });
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
        <Grid
          templateColumns='repeat(auto-fill, minmax(260px, 1fr))'
          gap={6}
          marginTop={5}
        >
          <NavigationBlock
            title={'Chat'}
            linkDescription={'with your counsellors privately'}
            link={'/counsellor-chat'}
            icon={BsChatDots}
            iconSize={32}
          />
          <NavigationBlock
            title={'Appointments'}
            link={'/appointments'}
            linkDescription={'with your counsellors'}
            icon={AiOutlineSchedule}
            iconSize={36}
          />
          <NavigationBlock
            link={'/request'}
            title={'Request'}
            linkDescription={
              'your counsellors for an appointment or a group session'
            }
            icon={AiOutlineQuestion}
            iconSize={32}
          />
          <NavigationBlock
            link={'/group-sessions'}
            title={'Attend'}
            linkDescription={'a group session with your peers and counsellors'}
            icon={AiOutlineVideoCamera}
            iconSize={33}
          />
        </Grid>

        <Grid
          templateColumns='repeat(auto-fill, max(260px, 1fr))'
          gap={6}
          marginTop={5}
        >
          <NavigationBlock
            link={'/'}
            title={'Mindful Activities'}
            linkDescription={'Do mindful activities to calm yourself'}
            icon={GiMeditation}
            iconSize={35}
          />
          <NavigationBlock
            title={'Resources and tips'}
            linkDescription={
              'Get access to resources and tips to help you in your tough times'
            }
            link={'/resources'}
            icon={FaBook}
            iconSize={30}
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

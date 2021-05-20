import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, useMediaQuery, useToast } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Header from '../components/Header';
import { Skeleton } from '@chakra-ui/react';
import { Grid, Box } from '@chakra-ui/react';
import NavigationBlock from '../components/NavigationBlock';
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
import { useChatStateValue } from '../context/providers/ChatProvider';
import { useSocket } from '../context/providers/SocketProvider';
// import { useChatStateValue } from '../context/providers/ChatProvider';

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

  // useEffect(() => {
  //   auth.currentUser
  //     .getIdToken()
  //     .then((token) => console.log(token))
  //     .catch((error) => console.log(error));
  // }, []);

  const [{ messages }, dispatch] = useChatStateValue();
  const toast = useToast();
  const socket = useSocket();
  useEffect(() => {
    if (socket == null) return;
    socket.on('message', (message) => {
      dispatch({
        type: 'ADD_TO_MESSAGES',
        message: message,
      });
      toast({
        title: 'New message',
        description: 'You just recieved a new message',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    });

    return () => socket.off('message');
  }, [socket, dispatch]);

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
            bg = ['Teal.300']
          />
          <NavigationBlock
            title={'Schedule'}
            link={'/'}
            linkDescription={'an appointment with your counsellor'}
            icon={AiOutlineSchedule}
            iconSize={36}
            bg = ['Teal.300']
          />
          <NavigationBlock
            link={'/'}
            title={'Request'}
            linkDescription={'your counsellors for a group session'}
            icon={AiOutlineQuestion}
            iconSize={32}
            bg = ['Teal.300']
          />
          <NavigationBlock
            link={'/'}
            title={'Attend'}
            linkDescription={'a group session with your peers and counsellors'}
            icon={AiOutlineVideoCamera}
            iconSize={33}
            bg = ['Teal.300']
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
            link={'/'}
            icon={FaBook}
            iconSize={30}
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

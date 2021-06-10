import {
  Container,
  Flex,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Skeleton,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, dbTimestamp } from '../config/firebase';
import useListenToSocket from '../hooks/useListenToSocket';

const AppointmentPage = () => {
  const Header = dynamic(() => import('../components/Header'), {
    ssr: false,
  });

  const EventList = dynamic(() => import('../components/EventList'), {
    ssr: false,
  });

  const [user] = useAuthState(auth);

  const queryAll = db
    .collection('appointments')
    .where('forUser', '==', 'all')
    .where('approved', '==', true)
    .where('type', '==', 'groupSession')
    .orderBy('createdAt')
    .limit(10);

  const [value, loading, error] = useCollection(queryAll);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');

  useListenToSocket(true);
  return (
    <>
      <Head>
        <title>Conversations | Group Sessions</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' width={'100%'} mt={2}>
        <Flex
          px={2}
          flexDirection={isLargerThan576 ? 'row' : 'column'}
          alignItems={!isLargerThan576 && 'center'}
        >
          <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
            Group Session
          </Text>
          {isLargerThan576 && <Spacer />}
        </Flex>
        <Grid p={2}>
          {loading && (
            <>
              <Skeleton height={'70px'} marginTop={0} marginBottom={2} />
              <Skeleton height={'70px'} marginTop={2} marginBottom={2} />
              <Skeleton height={'70px'} marginTop={2} marginBottom={2} />
              <Skeleton height={'70px'} marginTop={2} marginBottom={2} />
              <Skeleton height={'70px'} marginTop={2} marginBottom={2} />
            </>
          )}
          {error && (
            <Text color='red'>
              {
                'Sorry there was some error loading the content, please try again later'
              }
            </Text>
          )}
          {value && value.docs.length < 1 && (
            <>
              <Text>No content found</Text>
            </>
          )}
          {value &&
            value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <EventList
                  name={doc.data().sessionName}
                  time={doc.data().time}
                />
              </React.Fragment>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

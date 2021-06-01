import {
  Container,
  Grid,
  Skeleton,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../config/firebase';
import dynamic from 'next/dynamic';
import useListenToSocket from '../hooks/useListenToSocket';

const AppointmentPage = () => {
  useListenToSocket(true);
  const Header = dynamic(() => import('../components/Header'), {
    ssr: false,
  });

  const InfoList = dynamic(() => import('../components/InfoList'), {
    ssr: false,
  });

  const today = new Date();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayFormatted = `${today.getFullYear()}-${month}-${today.getDate()}`;
  const [filterDateValue, setFilterDateValue] = useState(todayFormatted);

  const queryAll = db
    .collection('resources')
    .where('display', '==', 'public')
    .orderBy('createdAt');

  const [value, loading, error] = useCollection(queryAll);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
  return (
    <>
      <Head>
        <title>Conversations | Group Sessions</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' width={'100%'}>
        <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
          Resources and Tips
        </Text>
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
          <VStack>
            {value &&
              value.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  <InfoList
                    text={doc.data().name}
                    link={doc.data().link}
                    createdAt={doc.data().createdAt}
                  />
                </React.Fragment>
              ))}
          </VStack>
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

import {
  Container,
  Flex,
  Grid,
  Input,
  Skeleton,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AppointmentsList from '../components/AppointmentsList';
import Header from '../components/Header';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AppointmentPage = () => {
  const today = new Date();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayFormatted = `${today.getFullYear()}-${month}-${today.getDate()}`;
  const [filterDateValue, setFilterDateValue] = useState();
  const [user, authLoading, authError] = useAuthState(auth);
  const query = db
    .collection('appointments')
    .where('forUser', '==', user?.uid || null);

  const [value, loading, error] = useCollection(query);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // const getCollection = async () => {
  //   await collection.onSnapshot((snapshot) => {
  //     console.log(
  //       snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           data: doc.data(),
  //         };
  //       })
  //     );
  //     setValue(
  //       snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           data: doc.data(),
  //         };
  //       })
  //     );
  //   });
  // };
  // useEffect(() => {
  //   getCollection();
  // }, [getCollection]);

  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
  return (
    <>
      <Head>
        <title>Conversations | Appointments</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' width={'100%'}>
        <Flex
          px={2}
          flexDirection={isLargerThan576 ? 'row' : 'column'}
          alignItems={!isLargerThan576 && 'center'}
        >
          <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
            Appointments
          </Text>
          {isLargerThan576 && <Spacer />}
          <Input
            placeholder='Filter by Date'
            type='date'
            maxWidth={'25vh'}
            defaultValue={todayFormatted}
            value={filterDateValue}
            onChange={(e) => setFilterDateValue(e.target.value)}
          />
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
            <p>
              {
                'Sorry there was some error loading the content, please try again later'
              }
            </p>
          )}
          {value &&
            value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <AppointmentsList
                  appointmentName={doc.data().appointmentName}
                  startTime={doc.data().startTime}
                  endTime={doc.data().endTime}
                />
              </React.Fragment>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

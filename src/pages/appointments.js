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
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, dbTimestamp } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import dynamic from 'next/dynamic';

const AppointmentPage = () => {
  const EventList = dynamic(() => import('../components/EventList'), {
    ssr: false,
  });

  const today = new Date();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayFormatted = `${today.getFullYear()}-${month}-${today.getDate()}`;
  const [filterDateValue, setFilterDateValue] = useState(todayFormatted);
  const [radioValue, setRadioValue] = useState('1');
  const [user] = useAuthState(auth);
  let dateFilterDate = new Date(filterDateValue || todayFormatted);
  let startHours = new Date(dateFilterDate.setHours(0, 0, 0));
  let startTime = dbTimestamp.fromDate(startHours);
  let endHours = new Date(dateFilterDate.setHours(23, 59, 59));
  let endTime = dbTimestamp.fromDate(endHours);
  const queryByDate = db
    .collection('appointments')
    .where('forUser', '==', user?.uid || null)
    .where('startTime', '>=', startTime)
    .where('startTime', '<=', endTime)
    .orderBy('startTime');

  const queryAll = db
    .collection('appointments')
    .where('forUser', '==', user?.uid || null)
    .orderBy('startTime')
    .limit(10);

  const getQuery = () => {
    if (radioValue == '1') {
      return queryByDate;
    } else if (radioValue == '2') {
      return queryAll;
    } else {
      return queryAll;
    }
  };

  const [value, loading, error] = useCollection(getQuery());

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

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
          <RadioGroup
            onChange={setRadioValue}
            value={radioValue}
            alignSelf='center'
            mr={isLargerThan576 && 3}
          >
            <Stack direction='row'>
              <Radio value={'1'}>
                <Tooltip label='See all your appointments by date'>
                  By Date
                </Tooltip>
              </Radio>
              <Radio value={'2'}>
                <Tooltip label='See all your appointments limited to 10'>
                  Show All
                </Tooltip>
              </Radio>
            </Stack>
          </RadioGroup>
          <Input
            disabled={radioValue === '2' ? true : false}
            placeholder='Filter by Date'
            type='date'
            maxWidth={'25vh'}
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
            <Text color='red'>
              {
                'Sorry there was some error loading the content, please try again later'
              }
            </Text>
          )}
          {value && value.docs.length < 1 && (
            <>
              <Text>
                No content found
                {radioValue === '1' && ` for ${filterDateValue}`}
              </Text>
            </>
          )}
          {value &&
            value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <EventList
                  name={doc.data().appointmentName}
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

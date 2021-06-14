import {
  Container,
  Flex,
  Grid,
  Input,
  Radio,
  RadioGroup,
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
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../components/Header';
import { auth, db } from '../config/firebase';
import useListenToSocket from '../hooks/useListenToSocket';

const AppointmentPage = () => {
  useListenToSocket(true);
  const EventList = dynamic(() => import('../components/EventList'), {
    ssr: false,
  });

  const today = new Date();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const todayFormatted = `${today.getFullYear()}-${month}-${day}`;
  const [filterDateValue, setFilterDateValue] = useState(todayFormatted);
  const [radioValue, setRadioValue] = useState('1');
  const [user] = useAuthState(auth);

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const query = db
      .collection('appointments')
      .where('forUser', '==', user?.uid || null)
      .where('approved', '==', true)
      .where('type', 'in', ['peerCounsellor', 'counsellor'])
      .orderBy('createdAt')
      .limit(10);
    if (hasMore == false) return;
    query
      .get()
      .then((data) => {
        if (data.empty || data.docs.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setData(data.docs);
      })
      .catch((err) => {
        setData([]);
        setHasMore(false);
        console.error(err);
      });
  }, []);

  const fetchNextData = (lastDoc) => {
    const query = db
      .collection('appointments')
      .where('forUser', '==', user?.uid || null)
      .where('approved', '==', true)
      .where('type', 'in', ['peerCounsellor', 'counsellor'])
      .orderBy('createdAt')
      .startAfter(lastDoc)
      .limit(10);
    if (hasMore == false) return;
    query
      .get()
      .then((data) => {
        if (data.empty || data.docs.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setData((prevData) => prevData.concat(data.docs));
      })
      .catch((err) => {
        setData([]);
        setHasMore(false);
        console.error(err);
      });
  };

  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
  return (
    <>
      <Head>
        <title>Conversations | Appointments</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' width={'100%'} mt={2}>
        <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
          Appointments
        </Text>
        <Grid p={2}>
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchNextData(data[data.length - 1])}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>End of the appointments</b>
              </p>
            }
          >
            {data &&
              data.map((doc) => (
                <EventList key={doc.id} name={doc.data().sessionName} />
              ))}
          </InfiniteScroll>
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

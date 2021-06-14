import { Container, Grid, Progress, Spinner, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../components/Header';
import { auth, db } from '../config/firebase';
import { dev } from '../config/globalVariables';
import useListenToSocket from '../hooks/useListenToSocket';

const AppointmentPage = () => {
  useListenToSocket(true);
  const EventList = dynamic(() => import('../components/EventList'), {
    ssr: false,
  });

  const [user] = useAuthState(auth);

  const [tokenResult, setTokenResult] = useState(undefined);
  useEffect(() => {
    user &&
      user.getIdTokenResult(dev ? true : false).then((t) => setTokenResult(t));
  }, [user]);

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (!tokenResult) return;
    const query = db
      .collection('appointments')
      .where(
        tokenResult.claims.counsellor ? 'teacher' : 'forUser',
        '==',
        user?.uid
      )
      .where('approved', '==', true)
      .where('type', 'in', ['peerCounsellor', 'counsellor'])
      .orderBy('createdAt', 'desc')
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
        setIsError(false);
      })
      .catch((err) => {
        setData([]);
        setHasMore(false);
        setIsError(true);
        console.error(err);
      });
  }, [tokenResult]);

  const fetchNextData = (lastDoc) => {
    if (!tokenResult) return;
    const query = db
      .collection('appointments')
      .where(
        tokenResult.claims.counsellor ? 'teacher' : 'forUser',
        '==',
        user?.uid || null
      )
      .where('approved', '==', true)
      .where('type', 'in', ['peerCounsellor', 'counsellor'])
      .orderBy('createdAt', 'desc')
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

  // const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
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
          {isError ? (
            <Text fontSize={'lg'} textAlign={'center'} color={'red'}>
              An error occurred, please try again later
            </Text>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={() => fetchNextData(data[data.length - 1])}
              hasMore={hasMore}
              loader={
                <center>
                  <Spinner size='lg' />
                </center>
              }
              scrollThreshold={0.9}
              endMessage={
                <Text textAlign={'center'}>
                  <b>No more appointments found</b>
                </Text>
              }
            >
              {data &&
                data.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <Text>{doc.data().createdAt.toDate().toString()}</Text>
                    <EventList key={doc.id} name={doc.data().sessionName} />
                  </React.Fragment>
                ))}
            </InfiniteScroll>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

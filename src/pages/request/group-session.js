import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import router from 'next/router';

const GroupSession = () => {
  const [loadSessions, setLoadSessions] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [slot, setSlot] = useState('');
  const [teacher, setTeacher] = useState('');

  const query = db
    .collection('counsellors')
    .where('display', '==', 'public')
    .orderBy('name');
  const [counsellors, counsellorsLoading, counsellorsError] =
    useCollection(query);

  const timeSlotsQuery = db
    .collection('timeSlots')
    .where('available', 'array-contains', teacher);
  const [timeSlots, timeSlotsLoading, timeSlotsError] =
    useCollection(timeSlotsQuery);

  const [user] = useAuthState(auth);
  const formData = {
    approved: false,
    display: user?.uid,
    sessionName,
    teacher,
    timeSlot: slot,
    type: 'groupSession',
  };
  const requestGroupSession = (e) => {
    e.preventDefault();
    db.collection('appointments')
      .add(formData)
      .then(() => {
        router.push('/home');
      })
      .catch((e) => {
        toast.error("Couldn't request group session", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(e);
      });

    console.log(formData);
  };
  const showError = () =>
    toast.error("Couldn't load data", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (!counsellorsLoading && counsellorsError) {
      showError();
      console.error(counsellorsError);
    }
  }, [counsellorsLoading, counsellorsError]);
  useEffect(() => {
    if (!timeSlotsLoading && timeSlotsError) {
      showError();
      console.error(timeSlotsError);
    }
  }, [timeSlotsLoading, timeSlotsError]);

  return (
    <>
      <Head>
        <title>Conversations | Request</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />

      <Container maxW='container.xl'>
        <Text
          as={'h2'}
          fontSize={'xl'}
          textAlign={'center'}
          fontWeight={'semibold'}
        >
          Request for a Group Session
        </Text>

        <form onSubmit={requestGroupSession}>
          <FormControl id='name'>
            <FormLabel>Appointment Name</FormLabel>
            <Input
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              type='text'
              isRequired
            />
          </FormControl>
          <FormControl id='teacher'>
            <FormLabel>Teacher</FormLabel>
            <Select
              placeholder='Select counsellor'
              isRequired
              onChange={(e) => setTeacher(e.target.value)}
            >
              {counsellors &&
                counsellors.docs.map((c) => (
                  <option value={c.id}>{c.data().name}</option>
                ))}
            </Select>
          </FormControl>
          {teacher && (
            <FormControl id='teacher'>
              <FormLabel>Time Slot</FormLabel>
              <Select
                placeholder='Select time slot'
                isRequired
                onChange={(e) => setSlot(e.target.value)}
              >
                {timeSlots &&
                  timeSlots.docs.map((c) => (
                    <option value={c.id}>{c.data().name}</option>
                  ))}
              </Select>
            </FormControl>
          )}

          <Button type='submit' colorScheme={'gray'} mt={2} width={'100%'}>
            Submit
          </Button>
        </form>

        {loadSessions && (
          <>
            <Text as={'h4'} fontSize={'xl'} textAlign={'center'}>
              Upcoming and Requested Group Sessions
            </Text>
          </>
        )}
      </Container>
    </>
  );
};

export default GroupSession;

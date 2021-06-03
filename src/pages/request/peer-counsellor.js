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
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { auth, db, dbCurrentTime } from '../../config/firebase';
import useListenToSocket from '../../hooks/useListenToSocket';

const PeerCounsellorAppointment = () => {
  const [loadSessions, setLoadSessions] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [slot, setSlot] = useState('');
  const [teacher, setTeacher] = useState('');
  useListenToSocket(true);

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
  function timeSlotById(id) {
    return id.id === slot;
  }
  const formData = {
    approved: false,
    forUser: user?.uid,
    sessionName,
    teacher,
    timeSlotId: slot,
    startTime:
      timeSlots && slot && timeSlots?.docs?.find(timeSlotById).data().from,
    endTime:
      timeSlots && slot && timeSlots?.docs?.find(timeSlotById).data().till,
    type: 'peerCounsellor',
    createdAt: dbCurrentTime,
  };
  const requestGroupSession = (e) => {
    e.preventDefault();
    db.collection('appointments')
      .add(formData)
      .then(() => {
        router.push('/home');
      })
      .catch((e) => {
        toast.error("Couldn't request peer counsellor appointment", {
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
          Request for a Peer Counsellor Appointment
        </Text>

        <form onSubmit={requestGroupSession}>
          <FormControl id='name'>
            <FormLabel>Appointment Name</FormLabel>
            <Input
              list='sessionNames'
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              type='text'
              autoComplete={'off'}
              isRequired
            />
            <datalist id='sessionNames'>
              <option value='How to prepare for boards' />
              <option value='I want to talk about my studies' />
              <option value='I am not undersatnding a subject' />
              <option value='I am feeling lonely during covid isolation' />
              <option value='I am having problem with a teacher' />
            </datalist>
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

export default PeerCounsellorAppointment;

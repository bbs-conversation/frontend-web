import { Container, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import AppointmentsList from '../components/AppointmentsList';
import Header from '../components/Header';

const AppointmentPage = () => {
  return (
    <>
      <Head>
        <title>Conversations | Appointments</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl' width={'100%'}>
        <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
          Appointments
        </Text>
        <Grid maxHeight='47vh' overflow='scroll'>
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
        </Grid>
        <Text fontSize={'xl'} fontWeight={'semibold'} textAlign={'center'}>
          Request for an Appointment
        </Text>
      </Container>
    </>
  );
};

export default AppointmentPage;

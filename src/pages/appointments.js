import {
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Spacer,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect } from 'react';
import AppointmentsList from '../components/AppointmentsList';
import Header from '../components/Header';

const AppointmentPage = () => {
  const today = new Date();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayFormatted = `${today.getFullYear()}-${month}-${today.getDate()}`;

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
            onChange={(e) => console.log(e.target.value)}
          />
        </Flex>
        <Grid p={2}>
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
          <AppointmentsList />
        </Grid>
      </Container>
    </>
  );
};

export default AppointmentPage;

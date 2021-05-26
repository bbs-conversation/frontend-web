import { Container, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import RequestBlock from '../components/RequestBlock';

const RequestPage = () => {
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
          Request
        </Text>
        <VStack gridGap={2} mt={3}>
          <RequestBlock forEvent={'an appointment'} from={'Counsellor'} />
          <RequestBlock forEvent={'an appointment'} from={'Peer Counsellor'} />
          <RequestBlock forEvent={'a group session'} from={'Counsellor'} />
        </VStack>
      </Container>
    </>
  );
};

export default RequestPage;

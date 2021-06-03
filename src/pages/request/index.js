import { Container, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import useListenToSocket from '../../hooks/useListenToSocket';
const RequestPage = () => {
  const Header = dynamic(() => import('../../components/Header'), {
    ssr: false,
  });

  const RequestBlock = dynamic(() => import('../../components/RequestBlock'), {
    ssr: false,
  });

  useListenToSocket(true);

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
          <RequestBlock
            forEvent={'an appointment'}
            from={'Counsellor'}
            url={'/counsellor'}
          />
          <RequestBlock
            forEvent={'an appointment'}
            from={'Peer Counsellor'}
            url={'/peer-counsellor'}
          />

          <RequestBlock
            forEvent={'a group session'}
            from={'Counsellors'}
            url={'/group-session'}
          />
        </VStack>
      </Container>
    </>
  );
};

export default RequestPage;

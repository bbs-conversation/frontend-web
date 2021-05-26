import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Switch,
  useMediaQuery,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ChatSection from '../components/ChatSection';
import useListenToSocket from '../hooks/useListenToSocket';

const CounsellorChat = () => {
  const [saveChatHistory, setSaveChatHistory] = useState(true);
  const handleSaveChatHistoryToggle = (e) => {
    e.preventDefault();
    setSaveChatHistory(e.target.checked);
    console.log(saveChatHistory);
  };
  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');

  useListenToSocket(true, null);

  return (
    <>
      <Head>
        <title>Conversations | Counsellor Chat</title>
      </Head>
      <Header appName={'Conversations'} withNav={true} />
      <Container maxW='container.xl'>
        <Flex p={0}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href='/'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} href='/counsellor-chat'>
                Counsellor Chat
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Spacer />

          {/* <form onSubmit={(e) => e.preventDefault()}>
            <FormControl
              display='flex'
              alignItems='center'
              zIndex={0}
              position={'static'}
            >
              <FormLabel htmlFor='saveChatHistory' mb='0'>
                Do not save chat to device?
              </FormLabel>
              <Switch
                id='saveChatHistory'
                onChange={handleSaveChatHistoryToggle}
                value={saveChatHistory}
              />
            </FormControl>
          </form> */}
        </Flex>
        <ChatSection />
      </Container>
    </>
  );
};

export default CounsellorChat;

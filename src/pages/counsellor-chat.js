import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Spacer,
  useMediaQuery,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatSection from '../components/ChatSection';
import Header from '../components/Header';
import { auth } from '../config/firebase';
import { useSocket } from '../context/providers/SocketProvider';
const CounsellorChat = () => {
  const [saveChatHistory, setSaveChatHistory] = useState(true);
  const handleSaveChatHistoryToggle = (e) => {
    e.preventDefault();
    setSaveChatHistory(e.target.checked);
  };
  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');

  const router = useRouter();

  const socket = useSocket();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (socket == null) return;
    if (!user) return;
    if (!router.query.id) return;
    socket.emit('chat-with', { user: router.query.id });
  }, [socket, user, router.query.id]);
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

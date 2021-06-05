import {
  Container,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useListenToSocket from '../../hooks/useListenToSocket';
import ChatMessages from '../ChatMessages';
import ChatSectionHeader from '../ChatSectionHeader';
import MobileSidebar from '../ChatSectionHeader/MobileSidebar';
import ChatSidebar from '../ChatSidebar';

const ChatSection = React.memo(() => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const router = useRouter();
  const { id } = router.query;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([]);
  }, [router.query.id]);

  const Chatbox = dynamic(() => import('../Chatbox'), {
    ssr: false,
  });
  const ifToast = () => {
    if (!id || id === undefined) return true;
    if (id) return false;
  };
  useListenToSocket(ifToast(), setMessages, messages);

  return (
    <Container maxW='container.xl' p={0}>
      <Grid
        h='87vh'
        templateRows='repeat(12, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        {!isLargerThan992 && (
          <>
            <MobileSidebar onClose={onClose} isOpen={isOpen} />
          </>
        )}
        <ChatSidebarWrapper
          rowSpan={12}
          colSpan={1}
          display={!isLargerThan992 && 'none'}
          overflow={'scroll'}
        >
          <ChatSidebar />
        </ChatSidebarWrapper>
        <GridItem rowSpan={1} colSpan={isLargerThan992 ? 4 : 5}>
          <ChatSectionHeader
            setChatSidebarOpen={onOpen}
            chatSidebarOpen={isOpen}
          />
        </GridItem>
        {id ? (
          <>
            <GridItem rowSpan={10} colSpan={isLargerThan992 ? 4 : 5}>
              <ChatMessages messages={messages} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={isLargerThan992 ? 4 : 5}>
              <Chatbox setMessages={setMessages} messages={messages} />
            </GridItem>
          </>
        ) : (
          <GridItem
            colSpan={isLargerThan992 ? 4 : 5}
            rowSpan={11}
            alignSelf={'center'}
            justifyContent={'center'}
          >
            <Text as='h3' fontSize='xl' width={'100%'} textAlign={'center'}>
              Please choose one of our counsellors
            </Text>
          </GridItem>
        )}
      </Grid>
    </Container>
  );
});

export default ChatSection;

const ChatSidebarWrapper = styled(GridItem)`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

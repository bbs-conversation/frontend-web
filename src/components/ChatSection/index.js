import {
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import ChatSidebar from '../ChatSidebar';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ChatMessages from '../ChatMessages';
import ChatSectionHeader from '../ChatSectionHeader';
import MobileSidebar from '../ChatSectionHeader/MobileSidebar';

const ChatSection = React.memo(() => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const sideBarColor = useColorModeValue('white', 'gray.600');
  const { onClose, onOpen, isOpen } = useDisclosure();

  const Chatbox = dynamic(() => import('../Chatbox'), {
    ssr: false,
  });
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
              <ChatMessages />
            </GridItem>
            <GridItem rowSpan={1} colSpan={isLargerThan992 ? 4 : 5}>
              <Chatbox />
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

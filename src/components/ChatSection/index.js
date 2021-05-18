import {
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import Chatbox from '../Chatbox';
import ChatMessages from '../ChatMessages';
import ChatSectionHeader from '../ChatSectionHeader';
import ChatSidebar from '../ChatSidebar';

const ChatSection = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const sideBarColor = useColorModeValue('gray.50', 'gray.600');
  return (
    <Container maxW='container.xl' p={0}>
      <Grid
        h='87vh'
        templateRows='repeat(12, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        {!isLargerThan992 && chatSidebarOpen && (
          <>
            <Flex
              position={'fixed'}
              height={'100vh'}
              minW={'60%'}
              top={0}
              left={0}
              bg={sideBarColor}
              overflow={'scroll'}
              flexDirection='column'
              p={2}
            >
              <Flex>
                <IconButton
                  size={'md'}
                  icon={<IoClose />}
                  left={0}
                  alignSelf={'center'}
                  onClick={() => setChatSidebarOpen(false)}
                />
              </Flex>
              <ChatSidebar />
            </Flex>
          </>
        )}
        <GridItem rowSpan={12} colSpan={1} display={!isLargerThan992 && 'none'}>
          <ChatSidebar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={isLargerThan992 ? 4 : 5}>
          <ChatSectionHeader
            setChatSidebarOpen={setChatSidebarOpen}
            chatSidebarOpen={chatSidebarOpen}
          />
        </GridItem>
        <GridItem rowSpan={10} colSpan={isLargerThan992 ? 4 : 5}>
          <ChatMessages />
        </GridItem>
        <GridItem rowSpan={1} colSpan={isLargerThan992 ? 4 : 5}>
          <Chatbox />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ChatSection;

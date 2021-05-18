import { Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Chatbox from '../Chatbox';
import ChatMessages from '../ChatMessages';
import ChatSectionHeader from '../ChatSectionHeader';
import ChatSidebar from '../ChatSidebar';

const ChatSection = () => {
  return (
    <Container maxW='container.xl'>
      <Grid
        h='87vh'
        templateRows='repeat(12, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={12} colSpan={1}>
          <ChatSidebar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <ChatSectionHeader />
        </GridItem>
        <GridItem rowSpan={10} colSpan={4}>
          <ChatMessages />
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <Chatbox />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ChatSection;

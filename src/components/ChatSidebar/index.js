import { Grid } from '@chakra-ui/react';
import React from 'react';
import ChatUser from '../Chatuser';

const ChatSidebar = () => {
  return (
    <Grid overflow='auto'>
      <ChatUser
        name={'Ms. Bhavana Bhasin'}
        role='Counsellor'
        id='asajsasasas'
      />
      <ChatUser name={'Ms. Kamiya Kumar'} role='Counsellor' id='sdsdkasda' />
      <ChatUser name={'Ms. Tanvi Bajaj'} role='Counsellor' id='sasans' />
    </Grid>
  );
};

export default ChatSidebar;

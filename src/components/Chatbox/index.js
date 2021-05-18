import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import styled from 'styled-components';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessage('');
  };
  return (
    <>
      <ChatboxWrapper onSubmit={handleSendMessage}>
        <Flex>
          <FormControl id='first-name' isRequired>
            <Input
              placeholder='Type in a message'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              autoComplete={false}
              name='message'
            />
          </FormControl>
          <IconButton
            variant='outline'
            colorScheme='gray'
            aria-label='Send Message'
            fontSize='20px'
            icon={<IoSend />}
            isRound={true}
            marginLeft={3}
            type='submit'
          />
        </Flex>
      </ChatboxWrapper>
    </>
  );
};

export default Chatbox;

const ChatboxWrapper = styled.form`
  /* position: fixed !important;
  bottom: 0px !important;
  width: 100% !important; */
  max-width: 1280px !important;
  padding: 10px;
  align-items: center !important;
  /* align-self: end !important; */
`;

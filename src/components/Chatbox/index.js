import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import styled from 'styled-components';
import { useChatStateValue } from '../../context/providers/ChatProvider';
import { useSocket } from '../../context/providers/SocketProvider';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [{ messages }, dispatch] = useChatStateValue();
  const socket = useSocket();
  const router = useRouter();
  const { id } = router.query;
  const handleSendMessage = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_MESSAGES',
      message: {
        type: 'fromUser',
        message: message,
        byUser: 'Yashraj',
      },
    });
    socket.emit('send-message', { recipients: [id], text: message });
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
              autoComplete={'off'}
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
  z-index: 0 !important; /* align-self: end !important; */
`;

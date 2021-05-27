import {
  Flex,
  FormControl,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const handleSendMessage = (e) => {
    e.preventDefault();
    db.collection(`chatRooms/${id}/messages`)
      .add({
        message,
        fromUser: user?.uid,
        fromUserName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        toast({
          title: "Couldn't send message",
          variant: 'left-accent',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });
        console.error('Error writing document: ', error);
      });
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

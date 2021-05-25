import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useChatStateValue } from '../context/providers/ChatProvider';
import { useSocket } from '../context/providers/SocketProvider';

const useListenToSocket = (hasToastForMessage, pageId) => {
  const [{ messages }, dispatch] = useChatStateValue();
  const toast = useToast();
  const socket = useSocket();
  useEffect(() => {
    if (socket == null) return;
    socket.on('message', (message) => {
      dispatch({
        type: 'ADD_TO_MESSAGES',
        message: message,
      });
      if (hasToastForMessage) {
        toast({
          title: 'New message',
          description: 'You just recieved a new message',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    });

    socket.on('connect_error', (message) => {
      if (message.type != 'TransportError') {
        dispatch({
          type: 'ADD_TO_MESSAGES',
          message: message,
        });
        toast({
          title: 'Error',
          description: "Couldn't connect to the server",
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      }
    });

    return () => socket.off('message');
  }, [socket, dispatch]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const messageForChannel = messages;

  return { messageForChannel };
};

export default useListenToSocket;

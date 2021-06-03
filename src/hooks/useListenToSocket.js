import React, { useEffect } from 'react';
import { useChatStateValue } from '../context/providers/ChatProvider';
import { useSocket } from '../context/providers/SocketProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

const useListenToSocket = (hasToastForMessage, setMessages, messages) => {
  const [user] = useAuthState(auth);
  const socket = useSocket();
  useEffect(() => {
    if (!user) return;
    if (socket == null) return;
    const showMessage = () =>
      toast.dark('You recieved a message', {
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: true,
      });
    const messageListener = (message) => {
      if (setMessages && messages) {
        setMessages(messages.concat(message));
      }
      console.log(message);
      if (hasToastForMessage) {
        showMessage();
      }
    };
    socket.on('message', messageListener);

    return () => socket.off('message', messageListener);
  }, [socket, user]);

  useEffect(() => {
    if (!user) return;

    if (socket == null) return;

    socket.on('connect_error', (message) => {
      if (message.type != 'TransportError') {
        if (setMessages && messages) {
          setMessages(messages.concat(message));
        }
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

    return () => socket.off('connect_error');
  }, [socket, user]);

  return;
};

export default useListenToSocket;

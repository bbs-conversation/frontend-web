import { Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import ChatMessage from './ChatMessage';

const PreviousMessages = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [previousMessagesError, setPreviousMessagesError] = useState('');
  const [previousMessagesLoading, setPreviousMessagesLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    setPreviousMessagesLoading(true);
    user
      .getIdToken(true)
      .then((token) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/api/chats?user=${router.query.id}`,
          {
            method: 'GET',
            headers: {
              authorization: token,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 200) {
              setPreviousMessages(data.message.messages);
              setPreviousMessagesError('');
            }
            if (data.code === 404) {
              setPreviousMessagesError('No messages found');
              setPreviousMessages([]);
            }
            if (data.code === 400 || data.code === 401) {
              setPreviousMessagesError(data.message);
              setPreviousMessages([]);
            }
            setPreviousMessagesLoading(false);
          });
      })
      .catch((e) => {
        setPreviousMessages([]);
        setPreviousMessagesError('Error getting chat history 500');
        console.error(e);
        setPreviousMessagesLoading(false);
      });
  }, [user, process.env.NEXT_PUBLIC_API_URI, router.query.id]);

  useEffect(() => {
    setPreviousMessages([]);
  }, [router.query.id]);
  return (
    <>
      {!previousMessagesLoading && previousMessagesError !== '' && (
        <>
          <Text color='red'>{previousMessagesError}</Text>
        </>
      )}
      {previousMessagesLoading && (
        <>
          <Spinner />
        </>
      )}
      {previousMessages !== [] &&
        previousMessages.map((m) => (
          <ChatMessage
            type={
              m.sender
                ? m.sender === user.uid
                  ? 'fromUser'
                  : 'toUser'
                : 'fromServer'
            }
            message={m.message}
            name={m.senderName}
            time={m.time}
            key={m.id}
          />
        ))}
    </>
  );
};

export default PreviousMessages;

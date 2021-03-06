import { Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

const ChatMessages = ({ messages }) => {
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
            } else if (data.code === 404) {
              setPreviousMessagesError('No messages found');
              setPreviousMessages([]);
            } else if (data.code === 400 || data.code === 401) {
              setPreviousMessagesError(data.message);
              setPreviousMessages([]);
            } else {
              setPreviousMessagesError(data.message);
              setPreviousMessages([]);
            }
            setPreviousMessagesLoading(false);
          });
      })
      .catch((e) => {
        setPreviousMessages([]);
        setPreviousMessagesError('Error getting chat history');
        console.error(e);
        setPreviousMessagesLoading(false);
      });
  }, [user, process.env.NEXT_PUBLIC_API_URI, router.query.id]);

  useEffect(() => {
    setPreviousMessages([]);
  }, [router.query.id]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [router.query.id, messages, previousMessages]);
  return (
    <>
      <ChatMessagesWrapper overflowY={'scroll'} height={'68vh'} pr={2}>
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
          previousMessages.map((m, i) => (
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
              key={i}
            />
          ))}
        {!previousMessagesLoading &&
          messages &&
          messages.map((m, i) => (
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
              key={i}
            />
          ))}
        <div ref={messagesEndRef} />
      </ChatMessagesWrapper>
    </>
  );
};

export default ChatMessages;

const ChatMessagesWrapper = styled(VStack)`
  -ms-overflow-style: none;
  scrollbar-width: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

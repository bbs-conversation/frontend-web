import { Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';

const ChatMessages = () => {
console.log(`Loading messages`);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const query = db
    .collection(`chatRooms/${router.query.id}/messages`)
    .orderBy('createdAt', 'desc')
    .limit(50);
  const [messages, loading, error] = useCollection(query);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [router.query.id, messages]);
  return (
    <>
      <ChatMessagesWrapper overflowY={'scroll'} height={'68vh'} pr={2}>
        {!loading && error && (
          <>
            <Text color='red'>
              Sorry there was a problem loading the messages
            </Text>
          </>
        )}
        {!error && loading && (
          <>
            <Skeleton height={'40px'} />
            <Skeleton height={'40px'} />
            <Skeleton height={'40px'} />
            <Skeleton height={'40px'} />
            <Skeleton height={'40px'} />
          </>
        )}
        {messages &&
          messages.docs
            .reverse()
            .map((m) => (
              <ChatMessage
                type={m.data().fromUser === user.uid ? 'fromUser' : 'toUser'}
                message={m.data().message}
                name={m.data().fromUserName}
                time={m.data().time}
                key={m.id}
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

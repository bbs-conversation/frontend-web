import { VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useChatStateValue } from '../../context/providers/ChatProvider';
import ChatMessage from './ChatMessage';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ChatMessages = () => {
  const [{ messages }] = useChatStateValue();
  const router = useRouter();
  function filterByChannel(msg) {
    return msg.channelId === router.query.id || msg.channelId === 'all';
  }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [router.query.id, messages]);
  return (
    <>
      <ChatMessagesWrapper overflowY={'scroll'} height={'68vh'} pr={2}>
        {messages.filter(filterByChannel).map((m, i) => (
          <ChatMessage
            type={m.type}
            message={m.message}
            name={m.byUser}
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

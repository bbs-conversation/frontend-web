import { VStack } from '@chakra-ui/react';
import React from 'react';
import { useChatStateValue } from '../../context/providers/ChatProvider';
import ChatMessage from './ChatMessage';
import styled from 'styled-components';

const ChatMessages = () => {
  const [{ messages }] = useChatStateValue();

  return (
    <>
      <ChatMessagesWrapper overflowY={'scroll'} height={'68vh'} pr={2}>
        {messages.map((m, i) => (
          <ChatMessage type={m.type} message={m.message} key={i} />
        ))}
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

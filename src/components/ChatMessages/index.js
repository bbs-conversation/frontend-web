import { VStack } from '@chakra-ui/react';
import React from 'react';
import { useChatStateValue } from '../../context/providers/ChatProvider';
import ChatMessage from './ChatMessage';

const ChatMessages = () => {
  const [{ messages }] = useChatStateValue();

  return (
    <>
      <VStack overflowY={'scroll'} maxHeight={'68vh'}>
        {messages.map((m, i) => (
          <ChatMessage type={m.type} message={m.message} key={i} />
        ))}
      </VStack>
    </>
  );
};

export default ChatMessages;

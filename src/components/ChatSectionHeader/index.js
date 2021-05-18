import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { IoMenu } from 'react-icons/io5';

const ChatSectionHeader = ({ setChatSidebarOpen, chatSidebarOpen }) => {
  const [isLargerThan992] = useMediaQuery('(min-width:992px)');
  return (
    <Flex>
      {!isLargerThan992 && !chatSidebarOpen && (
        <IconButton
          size={'md'}
          icon={<IoMenu />}
          left={0}
          alignSelf={'center'}
          onClick={() => setChatSidebarOpen(true)}
          mr={2}
        />
      )}
      <h1>Hello</h1>
    </Flex>
  );
};

export default ChatSectionHeader;

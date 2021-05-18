import {
  Flex,
  IconButton,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
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
      {!isLargerThan992 && <Spacer />}
      <Text alignSelf={'center'} fontSize={'xl'} fontWeight={'semibold'}>
        Teacher Name
      </Text>
    </Flex>
  );
};

export default ChatSectionHeader;

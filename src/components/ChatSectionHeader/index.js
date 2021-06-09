import { Button, Flex, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { textColor } from '../../config/globalVariables';

const ChatSectionHeader = ({ setChatSidebarOpen, chatSidebarOpen }) => {
  const router = useRouter();
  const [isLargerThan992] = useMediaQuery('(min-width:992px)');
  return (
    <Flex>
      {!isLargerThan992 && (
        <Button
          leftIcon={<RiMenuUnfoldLine />}
          border={'1px'}
          onClick={setChatSidebarOpen}
        >
          Users
        </Button>
      )}
      {!isLargerThan992 && <Spacer />}
      <Text
        alignSelf={'center'}
        fontSize={'xl'}
        fontWeight={'semibold'}
        color={textColor}
      >
        {router.query.name}
      </Text>
    </Flex>
  );
};

export default ChatSectionHeader;

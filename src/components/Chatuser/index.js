import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const ChatUser = ({ name, role, id, setChatSidebarOpen }) => {
  const textColor = useColorModeValue('gray.900', 'gray.900');
  return (
    <Link href={`/counsellor-chat?id=${id}&name=${name}`}>
      <BoxWrapper
        minH={14}
        width={'100%'}
        bg={'gray.100'}
        borderRadius={10}
        marginTop={2}
        marginBottom={2}
        boxShadow={'md'}
        p={2}
      >
        <Text fontSize={'md'} alignSelf='end' color={textColor}>
          {name}
        </Text>
        <Text fontSize={'xs'} alignSelf='start' color={textColor}>
          {role}
        </Text>
      </BoxWrapper>
    </Link>
  );
};

export default ChatUser;

const BoxWrapper = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`;

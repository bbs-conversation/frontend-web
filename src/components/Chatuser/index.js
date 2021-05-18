import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const ChatUser = ({ name, role }) => {
  const textColor = useColorModeValue('gray.900', 'gray.900');
  return (
    <Box
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
    </Box>
  );
};

export default ChatUser;

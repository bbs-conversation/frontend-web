import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

const ChatMessage = ({ message, type, name }) => {
  return (
    <>
      {type === 'fromUser' && (
        <Flex width={'100%'}>
          <Spacer />
          <Box
            pt={2}
            pb={2}
            display={'flex'}
            flexDirection={'column'}
            paddingRight={5}
            paddingLeft={5}
            borderRadius={'12px'}
            bg='gray.100'
          >
            <Text>{message}</Text>
            <Text fontSize={'xs'}>By {name}</Text>
          </Box>
        </Flex>
      )}
      {type === 'toUser' && (
        <Flex width={'100%'}>
          <Box
            pt={2}
            pb={2}
            display={'flex'}
            flexDirection={'column'}
            paddingRight={5}
            paddingLeft={5}
            borderRadius={'12px'}
            bg='gray.100'
          >
            <Text>{message}</Text>
            <Text fontSize={'xs'}>By Yashraj</Text>
          </Box>
          <Spacer />
        </Flex>
      )}
      {type === 'fromServer' && (
        <Flex>
          <Box
            display={'flex'}
            flexDirection={'column'}
            pt={2}
            pb={2}
            paddingRight={5}
            paddingLeft={5}
            borderRadius={'12px'}
            bg='gray.100'
          >
            <Text fontSize={'xs'}>Chat Bot</Text>
            <Text>{message}</Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ChatMessage;

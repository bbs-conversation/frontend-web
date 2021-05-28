import { Box, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

const ChatMessage = ({ message, type, name, time }) => {
  return (
    <>
      {type === 'fromUser' && (
        <Tooltip label={time && `At ${time && new Date(time).toString()}`}>
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
        </Tooltip>
      )}
      {type === 'toUser' && (
        <Tooltip label={time && `At ${time && new Date(time).toString()}`}>
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
              <Text fontSize={'xs'}>By {name}</Text>
            </Box>
            <Spacer />
          </Flex>
        </Tooltip>
      )}
      {type === 'fromServer' && (
        <Tooltip label={time && `At ${time && new Date(time).toString()}`}>
          <Flex flexDirection={'column'}>
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
        </Tooltip>
      )}
    </>
  );
};

export default ChatMessage;

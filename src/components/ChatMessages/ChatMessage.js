import { Box, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

const ChatMessage = ({ message, type, name, time }) => {
  return (
    <>
      {type === 'fromUser' && (
        <Flex width={'100%'}>
          <Spacer />
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            hasArrow={true}
            bg='gray.300'
            color='black'
            fontSize={'xs'}
            placement='left'
          >
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
          </Tooltip>
        </Flex>
      )}
      {type === 'toUser' && (
        <Flex width={'100%'}>
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            hasArrow={true}
            bg='gray.300'
            color='black'
            placement='right'
            fontSize={'xs'}
          >
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
          </Tooltip>
          <Spacer />
        </Flex>
      )}
      {type === 'fromServer' && (
        <Flex flexDirection={'column'}>
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            hasArrow={true}
            bg='gray.300'
            color='black'
            placement='auto'
            fontSize={'xs'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              pt={1}
              pb={1}
              paddingRight={5}
              paddingLeft={5}
              borderRadius={'12px'}
              bg='gray.100'
            >
              <Text fontSize={'xs'}>Chat Bot</Text>

              <Text fontSize={'sm'}>{message}</Text>
            </Box>
          </Tooltip>
        </Flex>
      )}
    </>
  );
};

export default ChatMessage;

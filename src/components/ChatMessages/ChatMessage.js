import { Box, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { textColor } from '../../config/globalVariables';

const ChatMessage = ({ message, type, name, time }) => {
  return (
    <>
      {type === 'fromUser' && (
        <Flex width={'100%'}>
          <Spacer />
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            color={textColor}
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
              borderRadius={'10px'}
              border={'1px solid #5f5f5f21'}
              bg='gray.200'
            >
              <Text color={textColor}>{message}</Text>
              <Text color={textColor} fontSize={'xs'}>
                By {name}
              </Text>
            </Box>
          </Tooltip>
        </Flex>
      )}
      {type === 'toUser' && (
        <Flex width={'100%'}>
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            color={textColor}
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
              borderRadius={'10px'}
              border={'1px solid #5f5f5f21'}
              bg='gray.200'
            >
              <Text color={textColor}>{message}</Text>
              <Text color={textColor} fontSize={'xs'}>
                By {name}
              </Text>
            </Box>
          </Tooltip>
          <Spacer />
        </Flex>
      )}
      {type === 'fromServer' && (
        <Flex flexDirection={'column'}>
          <Tooltip
            label={time && `At ${time && new Date(time).toString()}`}
            color={textColor}
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
              borderRadius={'10px'}
              border={'1px solid #5f5f5f21'}
              bg='gray.200'
            >
              <Text color={textColor} fontSize={'xs'}>
                Chat Bot
              </Text>

              <Text color={textColor} fontSize={'sm'}>
                {message}
              </Text>
            </Box>
          </Tooltip>
        </Flex>
      )}
    </>
  );
};

export default ChatMessage;

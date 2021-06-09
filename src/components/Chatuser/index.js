import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { bgColorsChatUser, textColor } from '../../config/globalVariables';

const ChatUser = ({ name, role, id, setChatSidebarOpen }) => {
  return (
    <Link href={`/counsellor-chat?id=${id}&name=${name}`}>
      <BoxWrapper
        minH={14}
        width={'100%'}
        bg={
          bgColorsChatUser[Math.floor(Math.random() * bgColorsChatUser.length)]
        }
        borderRadius={15}
        marginTop={2}
        marginBottom={2}
        p={2}
        onClick={setChatSidebarOpen}
      >
        <Text
          fontSize={'md'}
          alignSelf='end'
          color={textColor}
          textAlign={'center'}
          fontWeight={500}
        >
          {name}
        </Text>
        <Text
          fontSize={'xs'}
          alignSelf='start'
          color={textColor}
          textAlign={'center'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
        >
          {role}
        </Text>
      </BoxWrapper>
    </Link>
  );
};

export default ChatUser;

const BoxWrapper = styled(Box)`
  transition: all 0.2s ease;
  border: 1px solid #5358bb;
  -webkit-box-shadow: 3px 5px 1px 0px #97b8d7;
  -moz-box-shadow: 3px 5px 1px 0px #97b8d7;
  box-shadow: 3px 5px 1px 0px #97b8d7;
  &:hover {
    cursor: pointer;
    -webkit-box-shadow: 2px 2px 1px 0px #97b8d7;
    -moz-box-shadow: 2px 2px 1px 0px #97b8d7;
    box-shadow: 2px 2px 1px 0px #97b8d7;
  }
`;

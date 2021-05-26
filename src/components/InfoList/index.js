import { Flex, Text, Tooltip, useMediaQuery, VStack } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';

const InfoList = ({ link, text, createdAt }) => {
  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
  const created = new Date(createdAt.seconds * 1000);
  return (
    <InfoListWrapper
      flexDirection='column'
      boxShadow={'md'}
      p={2}
      borderRadius={20}
      height={85}
      width={isLargerThan576 ? '80%' : '100%'}
      border={'2px'}
      borderColor={'gray.300'}
      bg={'gray.100'}
    >
      <Tooltip label={created.toString()}>
        <VStack>
          <Text as={'h3'} fontSize={'2xl'} alignSelf={'center'}>
            {text}
          </Text>
          <Text
            as={'a'}
            fontSize={'sm'}
            margin={'0 !important'}
            alignSelf={'center'}
            href={link}
            target={'_blank'}
          >
            Click here
          </Text>
        </VStack>
      </Tooltip>
    </InfoListWrapper>
  );
};

export default InfoList;

const InfoListWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;

import { Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';

const RequestBlock = ({ forEvent, from, url }) => {
  const [isLargerThan576] = useMediaQuery('(min-width: 576px)');
  return (
    <Link href={`/request${url}`}>
      <RequestBlockWrapper
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
        <VStack>
          <Text as={'p'} fontSize={'sm'} alignSelf={'center'}>
            Request for {forEvent} from our
          </Text>
          <Text as={'h3'} fontSize={'2xl'} alignSelf={'center'}>
            {from}
          </Text>
        </VStack>
      </RequestBlockWrapper>
    </Link>
  );
};

export default RequestBlock;

const RequestBlockWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;

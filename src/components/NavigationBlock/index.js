import React from 'react';
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import { BsArrowRightShort as BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';

const NavigationBlock = ({ title, linkDescription }) => {
  const textHeadingColor = useColorModeValue('black', 'gray.900');
  return (
    <>
      <WrapperBox
        w='100%'
        minH='20'
        bg='gray.100'
        borderRadius={10}
        p={2}
        boxShadow={'md'}
      >
        <Flex>
          <Text fontSize={'2xl'} color={textHeadingColor} alignSelf={'center'}>
            {title}
          </Text>
          <Spacer />
          <Icon
            alignSelf={'center'}
            fontSize={40}
            color={textHeadingColor}
            as={BsArrowRight}
          />
        </Flex>
        <Flex>
          <Text fontSize={'sm'} color={textHeadingColor}>
            {linkDescription}
          </Text>
        </Flex>
      </WrapperBox>
    </>
  );
};

export default NavigationBlock;

const WrapperBox = styled(Box)`
  transition: 0.3s;
  &:hover {
    box-shadow: 2px 2px 0px #d0d3d4;
    cursor: pointer;
  }
`;

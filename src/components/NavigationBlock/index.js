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
import Link from 'next/link';

const NavigationBlock = ({ title, linkDescription, link, icon, iconSize }) => {
  const textHeadingColor = useColorModeValue('black', 'gray.900');
  return (
    <>
      <Link href={link}>
        <WrapperBox
          w='100%'
          minH='20'
          bg='gray.100'
          borderRadius={10}
          p={2}
          boxShadow={'md'}
        >
          <Flex>
            <Text
              fontSize={'2xl'}
              color={textHeadingColor}
              alignSelf={'center'}
            >
              {title}
            </Text>
            <Spacer />
            <Icon
              alignSelf={'center'}
              fontSize={iconSize ? iconSize : 40}
              color={textHeadingColor}
              as={icon ? icon : BsArrowRight}
            />
          </Flex>
          <Flex>
            <Text fontSize={'sm'} color={textHeadingColor}>
              {linkDescription}
            </Text>
          </Flex>
        </WrapperBox>
      </Link>
    </>
  );
};

export default NavigationBlock;

const WrapperBox = styled(Box)`
  transition: 0.3s !important;
  &:hover {
    box-shadow: 2px 2px 0px #d0d3d4 !important;
    cursor: pointer !important;
  }
`;

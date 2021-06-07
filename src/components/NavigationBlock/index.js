import {
  Box,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BsArrowRightShort as BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';

const NavigationBlock = ({
  title,
  linkDescription,
  link,
  icon,
  iconSize,
  bg,
}) => {
  const textHeadingColor = useColorModeValue('black', 'gray.900');
  return (
    <>
      <Link href={link}>
        <WrapperBox
          w='100%'
          minH='24'
          borderRadius={18}
          p={2}
          bg={!bg ? 'white' : bg}
        >
          <Flex>
            <Text
              fontSize={'2xl'}
              color={textHeadingColor}
              alignSelf={'center'}
              color={'#023047'}
              fontWeight={500}
            >
              {title}
            </Text>
            <Spacer />
            <Icon
              alignSelf={'center'}
              fontSize={iconSize ? iconSize : 40}
              color={textHeadingColor}
              as={icon ? icon : BsArrowRight}
              color={'#023047'}
            />
          </Flex>
          <Flex>
            <Text fontSize={'sm'} color={textHeadingColor} color={'#023047'}>
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
  transition: all 0.3s ease !important;
  border: 2.5px solid #00b2ff;
  box-shadow: 5px 6.4px 0px rgba(0, 87, 255, 0.81);

  &:hover {
    box-shadow: 0.9px 0.9px 3px rgba(0, 87, 255, 0.81);
  }
`;

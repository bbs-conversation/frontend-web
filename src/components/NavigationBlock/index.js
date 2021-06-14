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
import { textColor } from '../../config/globalVariables';

const NavigationBlock = ({
  title,
  linkDescription,
  link,
  icon,
  iconSize,
  bg,
}) => {
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
              color={textColor}
              alignSelf={'center'}
              fontWeight={500}
            >
              {title}
            </Text>
            <Spacer />
            <Icon
              alignSelf={'center'}
              fontSize={iconSize ? iconSize : 40}
              color={textColor}
              as={icon ? icon : BsArrowRight}
            />
          </Flex>
          <Flex>
            <Text fontSize={'sm'} color={textColor}>
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

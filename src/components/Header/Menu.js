import React from 'react';
import {
  IconButton,
  ListItem,
  UnorderedList,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import { Link } from '@chakra-ui/react';

import { VscChromeClose } from 'react-icons/vsc';
const Menu = ({ setMenuOpen }) => {
  const menuBgColor = useColorModeValue('gray.50', 'gray.600');
  return (
    <>
      <Box
        p='2'
        position={'fixed'}
        right={0}
        height={'100%'}
        bg={menuBgColor}
        padding={4}
        boxShadow={'md'}
      >
        <IconButton
          size={'md'}
          icon={<VscChromeClose />}
          position={'fixed'}
          right={0}
          marginRight={5}
          onClick={() => setMenuOpen(false)}
        />
        <VStack>
          <Link fontSize={20}>Home</Link>
          <Link fontSize={20}>Chat</Link>
          <Link fontSize={20}>Schedule an appointment</Link>
          <Link fontSize={20}>Request for group session</Link>
          <Link fontSize={20}>Attend group session</Link>
          <Link fontSize={20}>Mindfullness activities</Link>
          <Link fontSize={20}>Resources and Tips</Link>
        </VStack>
      </Box>
    </>
  );
};

export default Menu;

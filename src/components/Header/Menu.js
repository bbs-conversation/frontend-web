import React from 'react';
import { IconButton, VStack, useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { VscChromeClose } from 'react-icons/vsc';

import Link from 'next/link';

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
        zIndex={10000}
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
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Home
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/counsellor-chat'}>
            Chat
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Schedule an appointment
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Request for group session
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Attend group session
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Mindfullness activities
          </ChakraLink>
          <ChakraLink fontSize={20} as={Link} href={'/'}>
            Resources and Tips
          </ChakraLink>
        </VStack>
      </Box>
    </>
  );
};

export default Menu;

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  IconButton,
  Link as ChakraLink,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';

const Menu = ({ onClose, isOpen }) => {
  return (
    <>
      <Drawer
        placement={'right'}
        onClose={onClose}
        isOpen={isOpen}
        colorScheme={'gray'}
        size={'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
            <Flex alignItems={'center'}>
              <Text fontSize={'2xl'}>Menu</Text>
              <Spacer />
              <IconButton as={VscChromeClose} p={2} onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Grid rowGap={2}>
              <ChakraLink fontSize={20} as={Link} href={'/home'}>
                Home
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'/counsellor-chat'}>
                Chat
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'/appointments'}>
                Your appointments
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'/request'}>
                Request
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'/group-sessions'}>
                Group sessions
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'#'}>
                Mindfullness activities
              </ChakraLink>
              <ChakraLink fontSize={20} as={Link} href={'/resources'}>
                Resources and Tips
              </ChakraLink>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import ChatSidebar from '../ChatSidebar';

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer
        placement={'left'}
        onClose={onClose}
        isOpen={isOpen}
        colorScheme={'gray'}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
            <Flex alignItems={'center'}>
              <Text fontSize={'2xl'}>Chat Rooms</Text>
              <Spacer />
              <IconButton as={VscChromeClose} p={2} onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <ChatSidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileSidebar;

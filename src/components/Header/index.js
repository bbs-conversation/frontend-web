import React, { useState } from 'react';
import { Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import Menu from './Menu';
import { IoMenu } from 'react-icons/io5';
import { BsMoon } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { BiUserCircle } from 'react-icons/bi';

const Header = ({ appName, withNav }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBgColor = useColorModeValue('white', '#1A202C');
  const [user] = useAuthState(auth);

  return (
    <>
      <Container
        maxW='container.xl'
        position={'sticky'}
        top={0}
        bg={headerBgColor}
      >
        <Flex>
          <Box p='2'>
            <Text fontWeight='bold' fontSize='3xl'>
              {appName}
            </Text>
          </Box>
          <Spacer />
          {user && (
            <IconButton
              size={'md'}
              icon={<BiUserCircle />}
              right={0}
              alignSelf={'center'}
              onClick={() => auth.signOut()}
              marginRight={2}
            />
          )}
          <IconButton
            size={'md'}
            icon={colorMode === 'light' ? <BsMoon /> : <FiSun />}
            right={0}
            alignSelf={'center'}
            onClick={toggleColorMode}
            marginRight={2}
          />

          {withNav === true && !menuOpen && (
            <>
              <IconButton
                size={'md'}
                icon={<IoMenu />}
                right={0}
                alignSelf={'center'}
                onClick={() => setMenuOpen(true)}
              />
            </>
          )}
          {menuOpen && (
            <>
              <Menu setMenuOpen={setMenuOpen} />
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default Header;

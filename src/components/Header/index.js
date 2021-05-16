import React, { useState } from 'react';
import {
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import Menu from './Menu';
import { IoMenu } from 'react-icons/io5';
import { BsMoon } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { BiUserCircle } from 'react-icons/bi';
import Link from 'next/link';

const Header = ({ appName, withNav }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBgColor = useColorModeValue('white', '#1A202C');
  const [user] = useAuthState(auth);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

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
            <Link href='/'>
              <Text
                fontWeight='bold'
                fontSize={isLargerThan768 ? '3xl' : '2xl'}
                as={'h1'}
              >
                {appName}
              </Text>
            </Link>
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

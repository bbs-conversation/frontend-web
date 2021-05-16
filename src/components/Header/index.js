import React, { useState } from 'react';
import { Text, useColorMode } from '@chakra-ui/react';
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import Menu from './Menu';
import { IoMenu } from 'react-icons/io5';
import { BsMoon } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';

const Header = ({ appName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container maxW='container.xl'>
        <Flex>
          <Box p='2'>
            <Text fontWeight='bold' fontSize='3xl'>
              {appName}
            </Text>
          </Box>
          <Spacer />
          <IconButton
            size={'md'}
            icon={colorMode === 'light' ? <BsMoon /> : <FiSun />}
            right={0}
            alignSelf={'center'}
            onClick={toggleColorMode}
            marginRight={2}
          />
          {!menuOpen && (
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

import {
  Box,
  Container,
  Flex,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiUserCircle } from 'react-icons/bi';
import { IoMenu } from 'react-icons/io5';
import styled from 'styled-components';
import { auth } from '../../config/firebase';
import Menu from './Menu';

const Header = ({ appName, withNav }) => {
  const [user, loading] = useAuthState(auth);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolledEffects, showScrolledEffects] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        showScrolledEffects(true);
      } else showScrolledEffects(false);
    });
  }, []);

  return (
    <>
      <NavWrapper boxShadow={scrolledEffects ? true : false}>
        <Container maxW='container.xl'>
          <Flex>
            <Box px={1} py={3}>
              <Link href={!loading && user ? '/home' : '/login'}>
                <Text
                  fontWeight='bold'
                  fontSize={isLargerThan768 ? '3xl' : '2xl'}
                  color={'#ffffff'}
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
            {/* <IconButton
            size={'md'}
            icon={colorMode === 'light' ? <BsMoon /> : <FiSun />}
            right={0}
            alignSelf={'center'}
            onClick={toggleColorMode}
            marginRight={2}
          /> */}

            {withNav === true && (
              <>
                <IconButton
                  size={'md'}
                  icon={<IoMenu />}
                  right={0}
                  alignSelf={'center'}
                  onClick={onOpen}
                />
              </>
            )}

            <Menu onClose={onClose} isOpen={isOpen} />
          </Flex>
        </Container>
      </NavWrapper>
    </>
  );
};

export default Header;

const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  background: #023047;
  transition: all 0.5s ease;
  box-shadow: ${(props) =>
    props.boxShadow && '0px 7px 28px -15px rgba(0,0,0,0.75)'};
  -webkit-box-shadow: ${(props) =>
    props.boxShadow && '0px 7px 28px -15px rgba(0,0,0,0.75)'};
  -moz-box-shadow: ${(props) =>
    props.boxShadow && '0px 7px 28px -15px rgba(0,0,0,0.75)'};
`;

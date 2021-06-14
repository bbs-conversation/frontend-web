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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiUserCircle } from 'react-icons/bi';
import { HiHome, HiOutlineHome } from 'react-icons/hi';
import { IoMenu } from 'react-icons/io5';
import styled from 'styled-components';
import { auth } from '../../config/firebase';
import { textColor } from '../../config/globalVariables';
import Menu from './Menu';

const Header = ({ appName, withNav }) => {
  const [user, loading] = useAuthState(auth);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolledEffects, showScrolledEffects] = useState(false);
  const [homeIconHovered, setHomeIconHovered] = useState(false);
  const router = useRouter();

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
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            height={isLargerThan768 && '69px'}
          >
            <Box px={1} py={3}>
              <Link href={!loading && user ? '/home' : '/login'}>
                {router.asPath === '/home' ||
                router.asPath === '/login' ||
                router.asPath === '/redirect' ||
                router.asPath === '/' ? (
                  <>
                    <Text
                      fontWeight='bold'
                      fontSize={isLargerThan768 ? '3xl' : '2xl'}
                      color={'#ffffff'}
                      as={'h1'}
                    >
                      {appName}
                    </Text>
                  </>
                ) : (
                  <>
                    {homeIconHovered === false && (
                      <Link href={!loading && user ? '/home' : '/login'}>
                        <HiOutlineHome
                          fontSize={35}
                          color={'#ffffff'}
                          onMouseEnter={() => setHomeIconHovered(true)}
                        />
                      </Link>
                    )}
                    {homeIconHovered === true && (
                      <Link href={!loading && user ? '/home' : '/login'}>
                        <HiHome
                          fontSize={35}
                          color={'#ffffff'}
                          onMouseLeave={() => setHomeIconHovered(false)}
                        />
                      </Link>
                    )}
                  </>
                )}
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
                color={textColor}
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
                  color={textColor}
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

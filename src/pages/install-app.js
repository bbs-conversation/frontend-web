import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import { Button, Container } from '@chakra-ui/react';

const InstallApp = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Conversations | Install</title>
      </Head>
      <Header appName={'Conversations'} withNav={false} />
      <Container maxW='container.xl'>
        <Button width='100%' mt={2} onClick={onClick}>
          Install App
        </Button>
      </Container>
    </>
  );
};

export default InstallApp;

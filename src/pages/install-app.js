import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import { Button, Container } from '@chakra-ui/react';

const InstallApp = () => {
  let defferedPrompt;
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const hideInstallPromotion = () => {
    setShowInstallBtn(false);
  };
  const showInstallPromotion = () => {
    setShowInstallBtn(true);
  };
  useEffect(() => {
    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      hideInstallPromotion();
      // Clear the deferredPrompt so it can be garbage collected
      deferredPrompt = null;
      // Optionally, send analytics event to indicate successful install
      console.log('PWA was installed');
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, []);

  const installPWA = async () => {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  };
  return (
    <>
      <Head>
        <title>Conversations | Install</title>
      </Head>
      <Header appName={'Conversations'} withNav={false} />
      <Container maxW='container.xl'>
        {showInstallBtn && (
          <Button width='100%' mt={2} onClick={installPWA}>
            Hello
          </Button>
        )}
      </Container>
    </>
  );
};

export default InstallApp;

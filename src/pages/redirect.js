import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const Redirect = () => {
  const router = useRouter();
  const { path } = router.query;
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (path) {
      router.push(path);
    } else if (user) {
      router.push('/home');
    } else if (!user) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [path, router, user]);
  return <div>Loading ...</div>;
};

export default Redirect;

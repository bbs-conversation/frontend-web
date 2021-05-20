import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from '../components/Login';
import { auth } from '../config/firebase';

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) router.push('/home');
      if (!user) router.push('/login');
      if (error) router.push('/login');
    }
  }, [loading, user, error]);
  return <LoginPage />;
};

export default Login;

import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import io from 'socket.io-client';
import { auth } from '../../config/firebase';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      user
        .getIdToken()
        .then((token) => {
          const newSocket = io(process.env.NEXT_PUBLIC_SOCKETIO_URI, {
            randomizationFactor: 1,
            query: { id: user.uid, token },
          });
          setSocket(newSocket);

          return () => newSocket.close();
        })
        .catch((err) => {
          console.error(err);
          return;
        });
    } else {
      return;
    }
  }, [user]);

  useEffect(() => {
    if (socket === null || socket === undefined) return;
    if ((!user && !loading) || error) {
      socket.emit('disconnect_user');
    }
  }, [user, loading, error, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

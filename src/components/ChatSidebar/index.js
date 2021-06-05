import { Grid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase';
import ChatUser from '../Chatuser';

const ChatSidebar = React.memo(({ onClose }) => {
  const [user] = useAuthState(auth);
  const [tokenClaims, setTokenClaims] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    user && user.getIdTokenResult(true).then((t) => setTokenClaims(t.claims));
    user && user.getIdToken(true).then((t) => setToken(t));
  }, [user]);

  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setLoading(true);
    if (!user) return;
    if (token === null) return;
    if (tokenClaims === null) return;
    const query = db
      .collection('counsellors')
      .where('display', '==', 'public')
      .orderBy('name');

    if (tokenClaims.counsellor) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/chat-rooms`, {
        method: 'GET',
        headers: { authorization: token },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            setValue(data.message);
            setError('');
          } else if (data.code === 404) {
            setError('No messages found');
            setValue([]);
          } else if (data.code === 400 || data.code === 401) {
            setError(data.message);
            setValue([]);
          } else {
            setError(data.message);
            setValue([]);
          }
          setLoading(false);
        })

        .catch((e) => {
          setValue([]);
          setError('Error getting chat history');
          console.error(e);
          setLoading(false);
        });
    } else if (!tokenClaims.counsellor) {
      query.onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (doc) => {
          if (doc) {
            setLoading(false);
            setValue(doc.docs);
          }
        },
        (error) => {
          setError(error);
        }
      );
    }
  }, [user, tokenClaims, db, token]);

  useEffect(() => {
    if (!loading && error) {
      console.error(error);
    }
  }, [error, loading]);

  return (
    <Grid overflowY='auto'>
      {loading && (
        <>
          <Skeleton
            height={'50px'}
            speed={1.2}
            marginTop={0}
            marginBottom={2}
          />
          <Skeleton
            height={'50px'}
            speed={1.2}
            marginTop={2}
            marginBottom={2}
          />
          <Skeleton
            height={'50px'}
            speed={1.2}
            marginTop={2}
            marginBottom={2}
          />
        </>
      )}
      {user && tokenClaims !== null && tokenClaims.counsellor === true && (
        <>
          {!loading && error && (
            <Text color='red.500'>
              {
                'Sorry there was some error loading the content, please try again later'
              }
            </Text>
          )}
          {value &&
            value.map((doc, i) => (
              <React.Fragment key={i}>
                <ChatUser
                  setChatSidebarOpen={onClose}
                  name={doc.name}
                  role={'User'}
                  id={doc.users.filter((u) => u !== user.uid)}
                />
              </React.Fragment>
            ))}
        </>
      )}
      {user && tokenClaims !== null && tokenClaims.counsellor === false && (
        <>
          {!loading && error && (
            <Text color='red.500'>
              {
                'Sorry there was some error loading the content, please try again later'
              }
            </Text>
          )}
          {value &&
            value.map((doc) => (
              <React.Fragment key={doc.id}>
                <ChatUser
                  setChatSidebarOpen={onClose}
                  name={doc.data().name}
                  role={doc.data().role.displayRole}
                  id={doc.id}
                />
              </React.Fragment>
            ))}
        </>
      )}
    </Grid>
  );
});

export default ChatSidebar;

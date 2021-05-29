import { Grid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ChatUser from '../Chatuser';
import { auth, db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatSidebar = React.memo(() => {
  const [user] = useAuthState(auth);

  // prettier-ignore
  const query = db
    .collection('chatRooms')
    .where('users', 'array-contains', user?.uid || null)
    .where('display', '==', 'public')
    .orderBy('name');

  const [value, loading, error] = useCollection(query)

  useEffect(() => {
    if (!loading && error) {
      console.error(error);
    }
    if (loading) console.log(`Loading`);
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
      {!loading && error && (
        <Text color='red.500'>
          {
            'Sorry there was some error loading the content, please try again later'
          }
        </Text>
      )}
      {value &&
        value.docs.map((doc) => (
          <React.Fragment key={doc.id}>
            <ChatUser
              name={doc.data().name}
              role={doc.data().purpose}
              id={doc.id}
            />
          </React.Fragment>
        ))}
    </Grid>
  );
})

export default ChatSidebar;

import { Flex, Grid, GridItem, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const EventList = ({ name, time }) => {
  const [isLargerThan576] = useMediaQuery('(min-width: 576)');

  return (
    <Grid
      templateColumns='repeat(6, 1fr)'
      marginTop={2}
      marginBottom={2}
      border={'1px'}
      borderRadius={10}
    >
      <GridItem w='100%' h={16} bg='gray.500' colSpan={2} borderLeftRadius={10}>
        <Flex flexDir={'column'} p={1}>
          <Text
            fontSize={'2xl'}
            fontWeight='semibold'
            color={'white'}
            textAlign='center'
          >
            {/* {start.getDate()} */}
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight='semibold'
            color={'white'}
            textAlign='center'
          >
            {/* {month} {start.getFullYear()} */}
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        w='100%'
        h={16}
        bg='gray.50'
        colSpan={4}
        borderRightRadius={10}
        alignItems='center'
      >
        <Flex
          flexDir={'column'}
          p={1}
          justifyContent={'center'}
          alignSelf='center'
        >
          <Text
            fontSize={'lg'}
            fontWeight='semibold'
            color={'gray.900'}
            textAlign='center'
          >
            {name}
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight='semibold'
            color={'gray.900'}
            textAlign='center'
            alignSelf={'center'}
            justifyContent='end'
          >
            {time}
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default EventList;

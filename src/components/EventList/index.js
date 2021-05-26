import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const EventList = ({ name, startTime, endTime }) => {
  const start = startTime.toDate();
  const end = endTime.toDate();

  let monthArray = [];
  monthArray[0] = 'January';
  monthArray[1] = 'February';
  monthArray[2] = 'March';
  monthArray[3] = 'April';
  monthArray[4] = 'May';
  monthArray[5] = 'June';
  monthArray[6] = 'July';
  monthArray[7] = 'August';
  monthArray[8] = 'September';
  monthArray[9] = 'October';
  monthArray[10] = 'November';
  monthArray[11] = 'December';
  const month = monthArray[start.getMonth()];

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
            {start.getDate()}
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight='semibold'
            color={'white'}
            textAlign='center'
          >
            {month} {start.getFullYear()}
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
            {start.getHours()}:{start.getMinutes()} - {end.getHours()}:
            {end.getMinutes()}
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default EventList;

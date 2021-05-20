import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

const AppointmentsList = () => {
  return (
    <Grid templateColumns='repeat(6, 1fr)' marginTop={2} marginBottom={2}>
      <GridItem
        w='100%'
        border={'1px'}
        h={16}
        bg='blue.400'
        colSpan={2}
        borderLeftRadius={10}
      >
        <Flex flexDir={'column'} p={1}>
          <Text
            fontSize={'2xl'}
            fontWeight='semibold'
            color={'white'}
            textAlign='center'
          >
            20
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight='semibold'
            color={'white'}
            textAlign='center'
          >
            May 2021
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        w='100%'
        border={'1px'}
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
            This is the title
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight='semibold'
            color={'gray.900'}
            textAlign='center'
            alignSelf={'center'}
            justifyContent='end'
          >
            19:00 - 19:30
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default AppointmentsList;

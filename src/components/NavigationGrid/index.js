import { Grid } from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineQuestion,
  AiOutlineSchedule,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import NavigationBlock from '../NavigationBlock';

const NavigationGrid = () => {
  return (
    <>
      <Grid
        templateColumns='repeat(auto-fill, minmax(295px, 1fr))'
        gap={6}
        marginTop={5}
      >
        <NavigationBlock
          title={'Chat'}
          linkDescription={'with your counsellors privately'}
          link={'/counsellor-chat'}
          icon={BsChatDots}
          bg={'#EAE4E9'}
          iconSize={32}
        />
        <NavigationBlock
          title={'Appointments'}
          link={'/appointments'}
          linkDescription={'with your counsellors'}
          icon={AiOutlineSchedule}
          bg={'#FFF1E6'}
          iconSize={36}
        />
        <NavigationBlock
          link={'/request'}
          bg={'#F0EFEB'}
          title={'Request'}
          linkDescription={
            'your counsellors for an appointment or a group session'
          }
          icon={AiOutlineQuestion}
          iconSize={32}
        />
      </Grid>

      <Grid
        templateColumns='repeat(auto-fill, max(295px, 1fr))'
        gap={6}
        marginTop={5}
      >
        <NavigationBlock
          link={'/'}
          bg={'#E5E8EF'}
          title={'Mindful Activities'}
          linkDescription={'Do mindful activities to calm yourself'}
          icon={GiMeditation}
          iconSize={35}
        />
        <NavigationBlock
          title={'Resources and tips'}
          bg={'#E9DDDE'}
          linkDescription={
            'Get access to resources and tips to help you in your tough times'
          }
          link={'/resources'}
          icon={FaBook}
          iconSize={30}
        />
      </Grid>
    </>
  );
};

export default NavigationGrid;

import { Grid } from '@chakra-ui/react';
import React from 'react';
import NavigationBlock from '../NavigationBlock';
import { BsChatDots } from 'react-icons/bs';
import {
  AiOutlineSchedule,
  AiOutlineQuestion,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import { GiMeditation } from 'react-icons/gi';
import { FaBook } from 'react-icons/fa';

const NavigationGrid = () => {
  return (
    <>
      <Grid
        templateColumns='repeat(auto-fill, minmax(260px, 1fr))'
        gap={6}
        marginTop={5}
      >
        <NavigationBlock
          title={'Chat'}
          linkDescription={'with your counsellors privately'}
          link={'/counsellor-chat'}
          icon={BsChatDots}
          iconSize={32}
        />
        <NavigationBlock
          title={'Appointments'}
          link={'/appointments'}
          linkDescription={'with your counsellors'}
          icon={AiOutlineSchedule}
          iconSize={36}
        />
        <NavigationBlock
          link={'/request'}
          title={'Request'}
          linkDescription={
            'your counsellors for an appointment or a group session'
          }
          icon={AiOutlineQuestion}
          iconSize={32}
        />
        <NavigationBlock
          link={'/group-sessions'}
          title={'Attend'}
          linkDescription={'a group session with your peers and counsellors'}
          icon={AiOutlineVideoCamera}
          iconSize={33}
        />
      </Grid>

      <Grid
        templateColumns='repeat(auto-fill, max(260px, 1fr))'
        gap={6}
        marginTop={5}
      >
        <NavigationBlock
          link={'/'}
          title={'Mindful Activities'}
          linkDescription={'Do mindful activities to calm yourself'}
          icon={GiMeditation}
          iconSize={35}
        />
        <NavigationBlock
          title={'Resources and tips'}
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

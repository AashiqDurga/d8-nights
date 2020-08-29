import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import list  from '../screens/matches/list/list';
import chat from '../screens/matches/chat/chat';

const Stack = createStackNavigator();


export const MatchesNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='list' component={list}/>
    <Stack.Screen name='chat' component={chat}/>
  </Stack.Navigator>
);

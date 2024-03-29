import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  profile  from '../screens/profile/main/main-profile';
import editProfile from '../screens/profile/edit/edit-profile';

const Stack = createStackNavigator();


export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='profile' component={profile}/>
    <Stack.Screen name='editProfile' component={editProfile}/>
  </Stack.Navigator>
);

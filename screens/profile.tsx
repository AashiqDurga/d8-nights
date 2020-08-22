import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props:any) => (
  <Icon {...props} name='arrow-back' />
);

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='D8 Nights' alignment='center' />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Profile</Text>
      </Layout>
    </SafeAreaView>
  );
};
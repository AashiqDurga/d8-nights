import React from "react";
import { SafeAreaView } from "react-native";
import { Text, Divider, Layout, TopNavigation } from "@ui-kitten/components";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="D8 Nights" alignment="center" />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>D8's</Text>
      </Layout>
    </SafeAreaView>
  );
};

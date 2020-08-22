import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigation/app-navigator";
import { default as theme } from "./theme.json";
import { SafeAreaView } from "react-native";

// const HomeScreen = () => (
//   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text category='h1'>HOME</Text>
//   </Layout>
// );

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
      </SafeAreaView>
    </ApplicationProvider>
  </>
);

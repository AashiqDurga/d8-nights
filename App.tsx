import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator, Foo } from "./navigation/app-navigator";
import { default as theme } from "./theme.json";

import { SafeAreaProvider } from "react-native-safe-area-context";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider >
        {/* <AppNavigator /> */}
        <Foo/>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
);

import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator, Auth } from "./navigation/app-navigator";
import { default as theme } from "./theme.json";
import { SafeAreaProvider } from "react-native-safe-area-context";

const state = {
  userToken: ""
};
export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider>
        {state.userToken == null ? (
          // No token found, user isn't signed in
          <Auth />
        ) : (
          // User is signed in
          <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
              <SafeAreaProvider>
                <AppNavigator />
              </SafeAreaProvider>
            </ApplicationProvider>
          </>
        )}
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
);

// if (state.isLoading) {
//   // We haven't finished checking for the token yet
//   return <SplashScreen />;
// }

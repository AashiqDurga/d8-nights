import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator, Auth } from "./navigation/app-navigator";
import { default as theme } from "./theme.json";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Hub } from "aws-amplify";
import config from "./aws-exports";
import { NavigationContainer } from "@react-navigation/native";
Amplify.configure(config);

const app = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log("A new auth event has happened: ", data);
      if (payload.event === "signIn") {
        setSignedIn(true);
        console.log("a user has signed in!");
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
      }
    });
  }, [signedIn]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
          <NavigationContainer>
            {signedIn == false ? (
              // No token found, user isn't signed in
              <Auth />
            ) : (
              // User is signed in
              <AppNavigator />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

export default app;

// if (state.isLoading) {
//   // We haven't finished checking for the token yet
//   return <SplashScreen />;
// }

import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator, AuthNav  } from "./navigation/app-navigator";
import { default as theme } from "./theme.json";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
import { NavigationContainer } from "@react-navigation/native";
Amplify.configure(config);

const app = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme } }>
        <SafeAreaProvider>
          <NavigationContainer>
            {!isAuthenticated
            ? (
              // No token found, user isn't signed in
              <AuthNav />
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

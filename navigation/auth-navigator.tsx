import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signIn from "../screens/auth/sign-in"


const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="signIn" component={signIn} />
  </Stack.Navigator>
);

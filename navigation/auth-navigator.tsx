import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signIn from "../screens/auth/sign-in"
import signUp from "../screens/auth/sign-up";


const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="signIn" component={signIn} />
    <Stack.Screen name="signUp" component={signUp} />
  </Stack.Navigator>
);

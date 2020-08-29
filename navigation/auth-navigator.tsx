import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signIn from "../screens/auth/sign-in/sign-in"
import signUp from "../screens/auth/sign-up/sign-up";
import confirm from "../screens/auth/confirm/confirm";


const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="signIn" component={signIn} />
    <Stack.Screen name="signUp" component={signUp} />
    <Stack.Screen name="confirm" component={confirm} />
  </Stack.Navigator>
);

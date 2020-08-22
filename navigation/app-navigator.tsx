import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import {
  Layout,
  Text,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";

const bottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Profile" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <bottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <bottomTab.Screen name="Home" component={HomeScreen} />
    <bottomTab.Screen name="Profile" component={ProfileScreen} />
  </bottomTab.Navigator>
);
export const AppNavigator = () => (
  <NavigationContainer>
    {/* <HomeNavigator /> */}
    <TabNavigator />
  </NavigationContainer>
);

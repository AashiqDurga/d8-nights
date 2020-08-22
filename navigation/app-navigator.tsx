import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import Profile  from "../screens/profile/index";
import {
  Layout,
  Text,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

const bottomTab = createBottomTabNavigator();

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;
const ChatIcon = (props: any) => <Icon {...props} name="message-square-outline" />;
const ProfileIcon = (props: any) => <Icon {...props} name="person-outline" />;
const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={ChatIcon} />
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={ProfileIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <bottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <bottomTab.Screen name="Dates" component={HomeScreen} />
    <bottomTab.Screen name="Home" component={HomeScreen} />
    <bottomTab.Screen name="Profile" component={Profile} />
  </bottomTab.Navigator>
);
export const AppNavigator = () => (
  <NavigationContainer>
    {/* <HomeNavigator /> */}
    <TabNavigator />
  </NavigationContainer>
);

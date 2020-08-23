import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import  DeckScreen  from "../screens/deck/home2";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { ProfileNavigator } from "./profile-navigator";
import { MatchesNavigator } from "./matches-navigator";

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
    <bottomTab.Screen name="Matches" component={MatchesNavigator} />
    <bottomTab.Screen name="Home" component={DeckScreen} />
    <bottomTab.Screen name="Profile" component={ProfileNavigator} />
  </bottomTab.Navigator>
);
export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

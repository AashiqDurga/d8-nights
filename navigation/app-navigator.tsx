import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckScreen from "../screens/deck/deck";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { ProfileNavigator } from "./profile-navigator";
import { MatchesNavigator } from "./matches-navigator";
import { AuthNavigator } from "./auth-navigator";
import { createStackNavigator } from "@react-navigation/stack";

const bottomTab = createBottomTabNavigator();
const stack = createStackNavigator();

const HomeIcon = (props: any) => <Icon {...props} name="heart-outline" />;
const ChatIcon = (props: any) => (
  <Icon {...props} name="message-circle-outline" />
);
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

export const Auth = () => (
  <stack.Navigator headerMode="none">
    <stack.Screen name="Auth" component={AuthNavigator} />
    <stack.Screen name="Home" component={AppNavigator} />
  </stack.Navigator>
);
export const AppNavigator = () => (
  <bottomTab.Navigator
    initialRouteName="Deck"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <bottomTab.Screen name="Matches" component={MatchesNavigator} />
    <bottomTab.Screen name="Deck" component={DeckScreen} />
    <bottomTab.Screen name="Profile" component={ProfileNavigator} />
  </bottomTab.Navigator>
);


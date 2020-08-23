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
import { AuthNavigator } from "./auth-navigator";
import { createStackNavigator } from "@react-navigation/stack";

const bottomTab = createBottomTabNavigator();
const stack = createStackNavigator();

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

const HomeNavigator = () => (
  <stack.Navigator headerMode='none'>
    <stack.Screen name='Auth' component={AuthNavigator}/>
  </stack.Navigator>
);
const TabNavigator = () => (
  <bottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <bottomTab.Screen name="Matches" component={MatchesNavigator} />
    <bottomTab.Screen name="Home" component={DeckScreen} />
    <bottomTab.Screen name="Profile" component={ProfileNavigator} />
  </bottomTab.Navigator>
);

export const Foo = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

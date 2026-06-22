import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingScreen from '../screens/SettingScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBar={({ state, navigation, insets }) => (
        <CustomTabBar state={state} navigation={navigation} insets={insets} />
      )}
      screenOptions={{ headerShown: false }}
      initialRouteName="Explore"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

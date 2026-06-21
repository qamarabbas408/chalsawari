import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingScreen from '../screens/SettingScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

function ExploreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontFamily: 'Inter-SemiBold', color: '#00635A' }}>Explore</Text>
      <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: '#334155', marginTop: 8 }}>Discover something new</Text>
    </View>
  );
}

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

// src/navigation/BottomNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import BookingScrreen from '../screens/BookingScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

// export default function BottomNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused }) => {
//           let iconSource;

//           if (route.name === 'Home') {
//             iconSource = focused
//               ? require('../assets/icons/bottom_nav/profile.png')
//               : require('../assets/icons/bottom_nav/profile-active.png');;
//           } else if (route.name === 'Profile') {
//             iconSource = focused
//               ? require('../assets/icons/bottom_nav/profile.png')
//               : require('../assets/icons/bottom_nav/profile-active.png');
//           } 
//           // else if (route.name === 'Settings') {
//           //   iconSource = focused
//           //     ? require('../assets/settings-active.png')
//           //     : require('../assets/settings.png');
//           // }

//           return (
//             <Image
//               source={iconSource}
//               style={{ width: 24, height: 24, resizeMode: 'contain' }}
//             />
//           );
//         },
//         tabBarActiveTintColor: '#22c55e', // theme green
//         tabBarInactiveTintColor: '#9ca3af', // gray
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
//     </Tab.Navigator>
//   );
// }


import { View, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e5e7eb',
          height: 45,
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;

          switch (route.name) {
            case 'Home':
              iconSource = focused
                ? require('../assets/icons/bottom_nav/profile.png')
                : require('../assets/icons/bottom_nav/profile.png');
              label = 'Home';
              break;
            case 'Bookings':
              iconSource = focused
                ? require('../assets/icons/bottom_nav/profile.png')
                : require('../assets/icons/bottom_nav/profile.png');
              label = 'Bookings';
              break;
            // case 'Wallet':
            //   iconSource = focused
            //     ? require('../assets/wallet-active.png')
            //     : require('../assets/wallet.png');
            //   label = 'Wallet';
            //   break;
            // case 'Profile':
            //   iconSource = focused
            //     ? require('../assets/profile-active.png')
            //     : require('../assets/profile.png');
            //   label = 'Profile';
            //   break;
          }

          return (
            <View style={styles.tabItem}>
              <View style = {{
                padding:20, 
                backgroundColor:"#fff",
                borderRadius:100,
                alignItems:"center",
                bottom:60,
                }}>
                <Image source={iconSource} style={[styles.icon, { tintColor: focused ? '#eab308' : '#9ca3af' }]} />
                {/* <Text
                  style={[
                    GlobalStyles.caption,
                    { color: focused ? '#eab308' : '#9ca3af', marginTop: 4 },
                  ]}
                >
                  {label}
                </Text> */}
              </View>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingScrreen} />
      {/* <Tab.Screen name="Wallet" component={WalletScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex:1,
  },
  icon: {
    // maxWidth: 50,
    width: 24,
    height: 24,
    resizeMode: 'contain',
    objectFit:"contain"
  },
});

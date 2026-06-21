import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

const TEAL = '#00635A';
const AMBER = '#E07A00';
const WHITE = '#FFFFFF';
const SCREEN_BG = '#F0F0F0';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_HEIGHT = 65;
const FAB_SIZE = 56;
const FAB_RADIUS = FAB_SIZE / 2;
const FAB_PAD = 5;
const FAB_PADDED_SIZE = FAB_SIZE + FAB_PAD * 2;
const FAB_PADDED_RADIUS = FAB_PADDED_SIZE / 2;
const CORNER_RADIUS = 24;
const ICON_SIZE = 22;

interface TabRoute {
  key: string;
  name: string;
}

interface CustomTabBarProps {
  state: {
    routes: TabRoute[];
    index: number;
  };
  navigation: {
    navigate: (name: string) => void;
  };
  insets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

function labelColor(isFocused: boolean) {
  return isFocused ? AMBER : WHITE;
}

export default function CustomTabBar({ state, navigation, insets }: CustomTabBarProps) {
  const totalHeight = BAR_HEIGHT + insets.bottom;

  const handleTabPress = useCallback(
    (routeName: string) => {
      navigation.navigate(routeName);
    },
    [navigation],
  );

  const renderTabContent = (route: TabRoute, index: number) => {
    const isFocused = state.index === index;

    if (index === 2) {
      return (
        <TouchableOpacity
          key={route.key}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Explore')}
          style={styles.exploreColumn}
        >
          <Text style={[styles.label, { color: WHITE, fontFamily: 'Inter-SemiBold' }]}>
            EXPLORE
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={route.key}
        activeOpacity={0.7}
        onPress={() => handleTabPress(route.name)}
        style={styles.tabItem}
      >
        {route.name === 'Setting' ? (
          <Image
            source={isFocused ? require('../assets/icons/bottom_nav/profile-active.png') : require('../assets/icons/bottom_nav/profile.png')}
            style={[styles.icon, { tintColor: isFocused ? undefined : WHITE }]}
          />
        ) : (
          <Text style={[styles.iconText, { color: isFocused ? AMBER : WHITE }]}>
            {route.name === 'Home' ? '✦' : route.name === 'Events' ? '◆' : '●'}
          </Text>
        )}
        <Text style={[styles.label, { color: labelColor(isFocused) }]}>
          {route.name === 'Bookings' ? 'Booking' : route.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      <View style={[styles.barArea, { height: BAR_HEIGHT }]}>
        <View style={styles.contentRow}>
          {state.routes.map((route, index) => renderTabContent(route, index))}
        </View>
      </View>

      <View
        style={[
          styles.fabContainer,
          {
            top: -FAB_RADIUS,
            left: (SCREEN_WIDTH - FAB_PADDED_SIZE) / 2,
          },
        ]}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Explore')} style={styles.fabPad}>
          <View style={styles.fab}>
            <Text style={styles.fabIcon}>✦</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: SCREEN_WIDTH,
  },
  barArea: {
    backgroundColor: TEAL,
    borderTopLeftRadius: CORNER_RADIUS,
    borderTopRightRadius: CORNER_RADIUS,
    justifyContent: 'flex-end',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  exploreColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: ICON_SIZE,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  fabPad: {
    width: FAB_PADDED_SIZE,
    height: FAB_PADDED_SIZE,
    borderRadius: FAB_PADDED_RADIUS,
    backgroundColor: SCREEN_BG,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_RADIUS,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: 22,
    color: WHITE,
  },
});

import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { recolorLottie } from '../utils/lottieUtils';

const TEAL = '#00635A';
const ORANGE = '#f97316';
const WHITE = '#FFFFFF';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_HEIGHT = 65;
const FAB_SIZE = 56;
const FAB_RADIUS = FAB_SIZE / 2;
const FAB_PAD = 5;
const FAB_PADDED_SIZE = FAB_SIZE + FAB_PAD * 2;
const FAB_PADDED_RADIUS = FAB_PADDED_SIZE / 2;
const CORNER_RADIUS = 24;
const ICON_SIZE = 24;
const FAB_ICON_SIZE = 26;

const RAW_SOURCES: Record<string, any> = {
  Home: require('../assets/animations/tab-icons/home.json'),
  Events: require('../assets/animations/tab-icons/calendar.json'),
  Bookings: require('../assets/animations/tab-icons/bookmark.json'),
  Setting: require('../assets/animations/tab-icons/settings.json'),
};

const SOURCE_ORANGE = Object.fromEntries(
  Object.entries(RAW_SOURCES).map(([k, v]) => [k, recolorLottie(v, ORANGE)])
);

const SOURCE_WHITE = Object.fromEntries(
  Object.entries(RAW_SOURCES).map(([k, v]) => [k, recolorLottie(v, WHITE)])
);

const EXPLORE_SOURCE_WHITE = recolorLottie(require('../assets/animations/tab-icons/explore.json'), WHITE);
const EXPLORE_SOURCE_ORANGE = recolorLottie(require('../assets/animations/tab-icons/explore.json'), ORANGE);

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

export default function CustomTabBar({ state, navigation, insets }: CustomTabBarProps) {
  const totalHeight = BAR_HEIGHT + insets.bottom;
  const lottieRefs = useRef<(LottieView | null)[]>([]);
  const fabLottieRef = useRef<LottieView | null>(null);
  const isExploreFocused = state.index === 2;

  useEffect(() => {
    lottieRefs.current.forEach((ref, i) => {
      if (i === state.index) {
        ref?.reset();
        ref?.play();
      } else {
        ref?.reset();
      }
    });
    if (isExploreFocused) {
      fabLottieRef.current?.reset();
      fabLottieRef.current?.play();
    } else {
      fabLottieRef.current?.reset();
    }
  }, [state.index]);

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
        <LottieView
          key={isFocused ? 'active' : 'inactive'}
          ref={ref => { lottieRefs.current[index] = ref; }}
          source={isFocused ? SOURCE_ORANGE[route.name] : SOURCE_WHITE[route.name]}
          style={styles.lottieIcon}
          loop={false}
          autoPlay={false}
          resizeMode="contain"
        />
        <Text style={[styles.label, { color: isFocused ? ORANGE : WHITE }]}>
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
            <LottieView
              key={isExploreFocused ? 'active' : 'inactive'}
              ref={ref => { fabLottieRef.current = ref; }}
              source={isExploreFocused ? EXPLORE_SOURCE_ORANGE : EXPLORE_SOURCE_WHITE}
              style={styles.fabLottie}
              loop={false}
              autoPlay={false}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
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
    paddingBottom: 4,
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
  lottieIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    
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
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
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
    overflow: 'hidden',
  },
  fabIcon: {
    fontSize: 22,
    color: WHITE,
  },
  fabLottie: {
    width: FAB_ICON_SIZE,
    height: FAB_ICON_SIZE,
  },
});

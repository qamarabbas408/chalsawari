import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { recolorLottie } from '../utils/lottieUtils';
import GlobalFonts from '../styles/GlobalFonts';

const { width } = Dimensions.get('window');

const exploreWhite = recolorLottie(require('../assets/animations/tab-icons/explore.json'), '#FFFFFF');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
    ]).start(() => {
      Animated.timing(taglineAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      setShowLoader(true);
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'Intro' }] })
        );
      }, 2500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash-bg.png')} style={styles.background} />

      <LinearGradient
        colors={['rgba(15,23,42,0.2)', 'rgba(88,28,135,0.5)', 'rgba(15,23,42,0.85)']}
        locations={[0, 0.4, 1]}
        style={styles.gradient}
      />

      <View style={styles.contentCenter}>
        <Animated.View
          style={[styles.logoWrapper, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Image
            source={require('../assets/chal-sawari-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: taglineAnim }]}>
          Your ride. Your city. Anytime.
        </Animated.Text>

        {showLoader && (
          <Animated.View style={[styles.compassContainer, { opacity: taglineAnim }]}>
            <LottieView
              source={exploreWhite}
              style={styles.compass}
              loop
              autoPlay
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.65,
    height: 120,
  },
  tagline: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 8,
    marginBottom: 40,
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compass: {
    width: 44,
    height: 44,
  },
});

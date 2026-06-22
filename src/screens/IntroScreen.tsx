import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, AppState, TouchableOpacity, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import GlobalFonts from '../styles/GlobalFonts';
import { useFocusEffect } from '@react-navigation/native';
import { handleNavigationTo } from '../utils/AppUtils';

const { width } = Dimensions.get('window');

const PURPLE = '#581c87';
const ORANGE = '#f97316';
const WHITE = '#FFFFFF';

export default function IntroScreen({ navigation }: any) {
  const animationRef = useRef<LottieView>(null);
  const appState = useRef(AppState.currentState);
  const pressed = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        animationRef.current?.play();
      } else if (nextAppState.match(/inactive|background/)) {
        animationRef.current?.pause();
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      animationRef.current?.play();
      return () => animationRef.current?.pause();
    }, [])
  );

  const handlePress = () => {
    if (pressed.current) return;
    pressed.current = true;
    handleNavigationTo(navigation, 'Auth');
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/intro-car.json')}
        style={styles.background}
        autoPlay
        loop
        resizeMode="cover"
      />

      <LinearGradient
        colors={['#0f172a', 'rgba(88,28,135,0.85)', 'rgba(15,23,42,0.55)', 'rgba(15,23,42,0.45)']}
        locations={[0, 0.35, 0.75, 1]}
        style={styles.overlay}
      />

      <View style={styles.topAccent} />

      <View style={styles.content}>
        <Image
          source={require('../assets/chal-sawari-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Your ride. Your city. Anytime.</Text>

        <View style={styles.featureRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Fast & reliable</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Affordable fares</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Safe drivers</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started →</Text>
        </TouchableOpacity>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: ORANGE,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    paddingBottom: 50,
    paddingTop: 30,
  },
  logo: {
    width: width * 0.85,
    height: 90,
    marginBottom: 8,
    marginLeft: -4,
  },
  tagline: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 36,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  chipText: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  button: {
    backgroundColor: ORANGE,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 17,
    color: WHITE,
  },
});

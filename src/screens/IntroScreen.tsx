import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Text, AppState } from 'react-native';
import LottieView from 'lottie-react-native';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
import AppColors from '../styles/AppColors';
import { useFocusEffect } from '@react-navigation/native';
import { handleNavigationTo } from '../utils/AppUtils';

interface IntroScreenProps {
  navigation: any;
}

export default function IntroScreen({ navigation }: IntroScreenProps) {
  const animationRef = useRef<LottieView>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        animationRef.current?.play();
      } else if (nextAppState.match(/inactive|background/)) {
        animationRef.current?.pause();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      animationRef.current?.play();
      return () => {
        animationRef.current?.pause();
      };
    }, [])
  );

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

      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.heading}>Welcome to</Text>

          <Image
            source={require('../assets/chal-sawari-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.description}>
            ChalSawari brings you a seamless ride experience with comfort and trust.
          </Text>

          <AppButton
            textStyle={[GlobalStyles.body2, GlobalStyles.textLight]}
            variant="roundedShiny"
            style={styles.button}
            title="Proceed"
            onPress={()=>handleNavigationTo(navigation, 'Auth')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 60,
    gap: 8,
  },
  logo: {
    width: 240,
    height: 100,
    marginVertical: 4,
  },
  description: {
    ...GlobalStyles.body2,
    ...GlobalStyles.textLight,
    marginBottom: 12,
    marginLeft: 12,
  },
  heading: {
    ...GlobalStyles.h1,
    ...GlobalStyles.textLight,
    marginLeft: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 100,
    backgroundColor: AppColors.primaryBg,
    width: '100%',
  },
});
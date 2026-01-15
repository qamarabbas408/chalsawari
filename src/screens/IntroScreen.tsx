// src/screens/IntroScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Animated, AppState } from 'react-native';
import Video from 'react-native-video';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
import AppColors from '../styles/AppColors';
import { CommonActions, useFocusEffect } from '@react-navigation/native';

interface IntroScreenProps {
  navigation: any;
}

export default function IntroScreen({ navigation }: IntroScreenProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<Video>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const appState = useRef(AppState.currentState);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setPaused(false); // Resume video when app comes to foreground
      } else if (nextAppState.match(/inactive|background/)) {
        setPaused(true); // Pause video when app goes to background
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle screen focus (navigation)
  useFocusEffect(
    React.useCallback(() => {
      setPaused(false); // Resume when screen is focused
      return () => {
        setPaused(true); // Pause when screen loses focus
      };
    }, [])
  );

  // Smooth fade transition from image to video
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoReadyForDisplay = () => {
    setVideoReady(true);
    // Fade out the fallback image smoothly
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleProceed = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Background looping video */}
      <Video
        ref={videoRef}
        source={require('../assets/intro.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
        paused={paused}
        playInBackground={false}
        playWhenInactive={false}
        onLoad={handleVideoLoad}
        onReadyForDisplay={handleVideoReadyForDisplay}
        onError={(error) => {
          console.error('Video error:', error);
          setVideoLoaded(false);
        }}
        // Performance optimizations
        poster={undefined} // Disable default poster for custom fallback
        posterResizeMode="cover"
        bufferConfig={{
          minBufferMs: 2000,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
        maxBitRate={2000000} // Limit bitrate for faster loading
      />

      {/* Fallback image with smooth fade transition */}
      {!videoReady && (
        <Animated.Image
          style={[styles.video, { opacity: fadeAnim }]}
          source={require('../assets/intro-bg.jpeg')}
          resizeMode="cover"
          fadeDuration={0} // Disable default fade for custom animation
        />
      )}

      {/* Overlay content */}
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
            onPress={handleProceed}
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
  video: {
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
    backgroundColor: AppColors.background,
    width: '100%',
  },
});
// src/screens/IntroScreen.tsx
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
import AppColors from '../styles/AppColors';
import { CommonActions } from '@react-navigation/native';
export default function IntroScreen({ navigation }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <View style={styles.container}>
      {/* Background looping video */}

      <Video
        source={require('../assets/intro.mp4')} // replace with your video file
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
        onLoad={() => setVideoLoaded(true)}
      />

      {/* Fallback image until video is ready */}
      {!videoLoaded && (
        <Image style={styles.video} source={require('../assets/intro-bg.jpeg')} />
      )}


      {/* Overlay content */}
      <View style={styles.overlay}>
        <Text style={styles.heading}>
          Welcome to
        </Text>

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
          variant='roundedShiny'
          style={styles.button} title={'Proceed'} onPress={() => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          )} />
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', },
  video: { ...StyleSheet.absoluteFill },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 100,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logo: { width: 240, height: 100, marginVertical: 4, objectFit: "contain" },
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
    width: "100%"
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

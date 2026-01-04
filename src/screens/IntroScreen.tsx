// src/screens/IntroScreen.tsx
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Background looping video */}
      {/* <Video
        source={require('../assets/intro.mp4')} // replace with your video file
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      /> */}

      {/* Overlay content */}
      <View style={styles.overlay}>
        <Text style={[GlobalStyles.h2, GlobalStyles.textLight]}>
          Welcome to
        </Text>
        <Image
          source={require('../assets/chal-sawari-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          Chal Sawari brings you a seamless ride experience with comfort and trust.
        </Text>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Home')} // navigate to your main app
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity> */}

        <AppButton
        variant='roundedShiny'
        style={{
          paddingHorizontal: 100
        }} title={'Proceed'} onPress={function (): void {
          
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { ...StyleSheet.absoluteFillObject },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 36,
    paddingVertical: 45,
  },
  logo: { width: 160, height: 100, marginBottom: 4 },
  description: {
    ...GlobalStyles.desc1,
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#581c87',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

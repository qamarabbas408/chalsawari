// src/screens/IntroScreen.tsx
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
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
          <Text style={[GlobalStyles.h5, GlobalStyles.textLight,{
            fontWeight: "900"
          }]}>ChalSawari</Text> brings you a seamless ride experience with comfort and trust.
        </Text>

        {/* <View style={
          {
            backgroundColor: "red",
            // alignItems:"center"
            
          }
        }> */}
          <AppButton
            textStyle={[GlobalStyles.body2, GlobalStyles.textLight]}
            variant='roundedShiny'
            style={styles.button} title={'Proceed'} onPress={function (): void {

            }} />
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { ...StyleSheet.absoluteFill },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 100,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logo: { width: 200, height: 100, marginVertical: 4, objectFit: "cover" },
  description: {
    ...GlobalStyles.body1,
    ...GlobalStyles.textLight,
    marginBottom: 12,
    marginLeft: 12,
  },
  heading: {
    ...GlobalStyles.h1,
    ...GlobalStyles.textLight,
    // marginBottom: 12,
    marginLeft: 12,
  },
  button: {
    backgroundColor: '#581c87',
    paddingVertical: 12,
    paddingHorizontal: 100,
    // marginLeft: 12,
    
    width: "100%"
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Loader from '../components/Loader';

const { height, width } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    // Main container animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLoader(true);
      // Simulate API call with 5s delay 
      setTimeout(() => {
        // Example in SplashScreen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Intro' }],
          })
        );

      }, 5000);

    });

  }, []);

  return (

    <View style={styles.container}>

      <Image source={require('../assets/splash-bg.png')} style={styles.background} />

      <View style={styles.contentContainer}>
        {/* Animated Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View>
            {/* Logo Image */}
            <Animated.Image

              source={require('../assets/chal-sawari-logo.png')}
              style={[
                styles.logo,

                {
                  transform: [{ scale: scaleAnim }],
                  opacity: scaleAnim,
                },
              ]}
              resizeMode="contain"

            />

          </View>

        </Animated.View>

        {
          showLoader ? <Loader /> : <View style={{
            width: 60,
            height: 60

          }}></View>
        }
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#0f172a',
  },
  contentContainer: {
    width: width,
    maxWidth: 400,
    height: height,
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    position: 'relative',
    zIndex: 10,
  },
  logo: {
    width: width * 0.98,
    height: 200,
    zIndex: 20,
  },

});

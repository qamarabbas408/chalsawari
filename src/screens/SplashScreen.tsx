import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { checkFirstLaunch } from '../utils/firstLaunch';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [logoOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const init = async () => {
      const first = await checkFirstLaunch();
      setIsFirstLaunch(first);

      // Animate logo
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        if (!first) {
          // Skip video, finish after logo
          onFinish();
        }
      });
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo animation */}
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[styles.logo, { opacity: logoOpacity }]}
      />

      {/* Video only on first launch */}
      {isFirstLaunch && (
        <Video
          source={require('../assets/intro.mp4')}
          style={styles.video}
          resizeMode="cover"
          repeat
          onLoad={() => {
            // Delay finish until video has played a bit
            setTimeout(onFinish, 3000);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 200 },
  video: { ...StyleSheet.absoluteFillObject },
});

export default SplashScreen;

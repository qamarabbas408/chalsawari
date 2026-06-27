import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import GlobalFonts from '../styles/GlobalFonts';

type AppInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  secureTextEntry?: boolean;
  error?: string;
  inputLabel?: string;
  labelStyle?: TextStyle;
  placeholderTextColor?: string;
  eyeTintColor?: string;
};

export type AppInputRef = {
  shake: () => void;
};

const ERROR_COLOR = '#ef4444';
const ERROR_BORDER = 'rgba(239,68,68,0.6)';
const NORMAL_BORDER = 'rgba(255,255,255,0.15)';

const AppInput = forwardRef<AppInputRef, AppInputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      style,
      textStyle,
      secureTextEntry = false,
      error,
      inputLabel,
      labelStyle,
      placeholderTextColor = 'rgba(255,255,255,0.35)',
      eyeTintColor = 'rgba(255,255,255,0.5)',
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const errorOpacity = useRef(new Animated.Value(0)).current;
    const errorTranslateY = useRef(new Animated.Value(-4)).current;
    const shakeTranslateX = useRef(new Animated.Value(0)).current;
    const borderAnim = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
      shake: () => {
        Animated.sequence([
          Animated.timing(shakeTranslateX, {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeTranslateX, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeTranslateX, {
            toValue: -8,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeTranslateX, {
            toValue: 8,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeTranslateX, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }));

    useEffect(() => {
      if (error) {
        Animated.parallel([
          Animated.timing(errorOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(errorTranslateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.parallel([
          Animated.timing(errorOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(errorTranslateY, {
            toValue: -4,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }, [error]);

    const borderColor = borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [NORMAL_BORDER, ERROR_BORDER],
    });

    return (
      <View style={styles.container}>
        {inputLabel && (
          <Text style={[styles.label, labelStyle, error && styles.labelError]}>
            {inputLabel}
          </Text>
        )}
        <Animated.View style={[styles.inputWrapper, style, { borderColor }]}>
          <Animated.View style={{ transform: [{ translateX: shakeTranslateX }] as any, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <TextInput
              style={[styles.input, textStyle]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
            />
            <View style={styles.trailing}>
              {error && (
                <View style={styles.errorIconWrap}>
                  <Text style={styles.errorIcon}>!</Text>
                </View>
              )}
              {secureTextEntry && (
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Image
                    source={
                      isPasswordVisible
                        ? require('../assets/icons/eye-open.png')
                        : require('../assets/icons/eye-closed.png')
                    }
                    style={[styles.eyeIcon, { tintColor: eyeTintColor }]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>
        {error ? (
          <Animated.View
            style={[
              styles.errorContainer,
              { opacity: errorOpacity, transform: [{ translateY: errorTranslateY }] },
            ]}
          >
            <Text style={styles.error}>{error}</Text>
          </Animated.View>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    marginLeft: 4,
  },
  labelError: {
    color: ERROR_COLOR,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: NORMAL_BORDER,
    borderRadius: 16,
    paddingHorizontal: 18,
  },
  input: {
    flex: 1,
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 15,
    color: '#fff',
    paddingVertical: 16,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: ERROR_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 13,
    fontFamily: GlobalFonts.Inter.Bold,
  },
  errorContainer: {
    marginTop: 4,
    marginLeft: 4,
  },
  error: {
    color: ERROR_COLOR,
    fontSize: 12,
    fontFamily: GlobalFonts.Inter.Regular,
  },
  errorPlaceholder: {
    height: 18,
    marginTop: 4,
    marginLeft: 4,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  eyeButton: { paddingHorizontal: 8 },
});

export default AppInput;

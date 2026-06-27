import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalFonts from '../styles/GlobalFonts';

export type ToastType = 'error' | 'success' | 'warning' | 'info';

type Props = {
  message: string;
  type: ToastType;
  duration: number;
  onDismiss: () => void;
};

const TYPE_COLORS: Record<ToastType, { bg: string; accent: string }> = {
  error: { bg: 'rgba(239,68,68,0.15)', accent: '#ef4444' },
  success: { bg: 'rgba(34,197,94,0.15)', accent: '#22c55e' },
  warning: { bg: 'rgba(249,115,22,0.15)', accent: '#f97316' },
  info: { bg: 'rgba(59,130,246,0.15)', accent: '#3b82f6' },
};

export default function AppToast({ message, type, duration, onDismiss }: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -120,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => onDismiss());
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  const colors = TYPE_COLORS[type];

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 8,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.toast, { backgroundColor: colors.bg, borderColor: colors.accent }]}
        onPress={handleDismiss}
      >
        <View style={[styles.accentBar, { backgroundColor: colors.accent }]} />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 28,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 48,
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  message: {
    flex: 1,
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 13,
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
});

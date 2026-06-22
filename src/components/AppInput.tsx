import React, { Fragment, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
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

const AppInput: React.FC<AppInputProps> = ({
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
}: AppInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={styles.container}>
      {inputLabel && (
        <Text style={[styles.label, labelStyle]}>{inputLabel}</Text>
      )}
      <View style={[styles.inputWrapper, style]}>
        <TextInput
          style={[styles.input, textStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
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
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
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
  error: {
    color: '#ef4444',
    fontSize: 12,
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

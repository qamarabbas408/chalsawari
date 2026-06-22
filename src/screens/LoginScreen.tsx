import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFonts from '../styles/GlobalFonts';
import AppInput from '../components/AppInput';
import { handleNavigationTo } from '../utils/AppUtils';

const ORANGE = '#f97316';
const WHITE = '#FFFFFF';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    const newErrors: any = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleNavigationTo(navigation, 'BottomTabs');
    }
  };

  return (
    <LinearGradient
      colors={['#0f172a', 'rgba(88,28,135,0.9)', 'rgba(88,28,135,0.6)']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Login to your Account</Text>
        <Text style={styles.subheading}>Sign in to continue your ride</Text>

        <View style={styles.form}>
          <AppInput
            placeholder="John Doe"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
            inputLabel="Username"
          />

          <AppInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            inputLabel="Password"
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.signInButton}
            onPress={handleLogin}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialCircle}>
            <Image
              source={require('../assets/icons/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Image
              source={require('../assets/icons/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 28,
  },
  backText: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },
  heading: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 28,
    color: WHITE,
    marginBottom: 6,
  },
  subheading: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 32,
  },
  form: {
    marginBottom: 28,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  checkMark: {
    fontSize: 13,
    color: WHITE,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  signInButton: {
    backgroundColor: ORANGE,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  signInText: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 16,
    color: WHITE,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  orText: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  socialCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  signupLink: {
    fontFamily: GlobalFonts.Inter.SemiBold,
    fontSize: 14,
    color: ORANGE,
  },
});

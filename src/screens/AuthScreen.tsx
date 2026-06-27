import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFonts from '../styles/GlobalFonts';
import AppColors from '../styles/AppColors';
import { handleNavigationTo } from '../utils/AppUtils';

const ORANGE = '#f97316';
const WHITE = '#FFFFFF';

export default function AuthScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={AppColors.gradientStandard}
      locations={AppColors.gradientStandardLocations}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <Image
            source={require('../assets/chal-sawari-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Let's get started!</Text>
          <Text style={styles.subheading}>Sign in to continue your ride experience</Text>
        </View>

        <View style={styles.socialSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.socialButton}
            onPress={() => console.log('Google login')}
          >
            <Image
              source={require('../assets/icons/google.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.socialButton}
            onPress={() => console.log('Facebook login')}
          >
            <Image
              source={require('../assets/icons/facebook.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.passwordButton}
          onPress={() => handleNavigationTo(navigation, 'Login')}
        >
          <Text style={styles.passwordText}>Sign in with Password</Text>
        </TouchableOpacity>

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
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 20,
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
  },
  socialSection: {
    gap: 14,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 16,
    height: 56,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  socialIcon: {
    width: 22,
    height: 22,
  },
  socialText: {
    fontFamily: GlobalFonts.Inter.Medium,
    fontSize: 15,
    color: '#1f2937',
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
  passwordButton: {
    backgroundColor: ORANGE,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  passwordText: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 16,
    color: WHITE,
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

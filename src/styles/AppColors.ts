// src/styles/AppColors.ts

const AppColors = {
  // Primary brand colors
  primaryBg: '#581c87',   // deep purple background
  secondaryBg: '#22c55e',
  primary: '#0f172a',      // dark navy
  secondary: '#475569',    // slate gray

  // Accent colors
  orange: '#f97316',
  red: '#ef4444',
  yellow: '#eab308',
  blue: '#3b82f6',

  // Neutral palette
  white: '#ffffff',
  black: '#000000',
  grayLight: '#f1f5f9',
  grayDark: '#334155',

  inputBg : '#ebf1f4',
  transparent: 'transparent',

  // Gradient colors (shared across screens)
  gradientDarkNavy: '#0f172a',
  gradientPurple: 'rgba(88,28,135,0.9)',
  gradientPurpleLight: 'rgba(88,28,135,0.6)',
  gradientPurpleOverlay: 'rgba(88,28,135,0.85)',
  gradientDarkFade: 'rgba(15,23,42,0.55)',
  gradientDarkFadeLight: 'rgba(15,23,42,0.45)',

  // Splashscreen overlay
  gradientSplashOverlay: 'rgba(88,28,135,0.5)',
  gradientDarkFadeStrong: 'rgba(15,23,42,0.85)',
  gradientDarkFadeWeak: 'rgba(15,23,42,0.2)',

  // Standard 3-stop gradient array & locations
  gradientStandard: ['#0f172a', 'rgba(88,28,135,0.9)', 'rgba(88,28,135,0.6)'] as readonly string[],
  gradientStandardLocations: [0, 0.5, 1] as readonly number[],
};

export default AppColors;

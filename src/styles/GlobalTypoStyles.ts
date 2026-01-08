import { StyleSheet } from 'react-native';
import AppColors from './AppColors'; // Assuming AppColors is needed for text colors
import GlobalFonts from './GlobalFonts'; // Assuming GlobalFonts is needed for font families

const GlobalTypoStyles = StyleSheet.create({
  // -- HEADING LEVELS --

  // Use for main screen titles. The most prominent text.
  h1: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 40,
    lineHeight: 44,
    color: AppColors.primary,
  },
  // Use for major section titles.
  h2: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 36,
    lineHeight: 38,
    color: AppColors.primary,
  },
  // Use for sub-section titles.
  h3: {
    fontFamily: GlobalFonts.Poppins.SemiBold,
    fontSize: 30,
    lineHeight: 32,
    color: AppColors.primary,
  },
  // Use for smaller titles, like on cards or list items.
  h4: {
    fontFamily: GlobalFonts.Poppins.SemiBold,
    fontSize: 24,
    lineHeight: 28,
    color: AppColors.primary,
  },
  // Use for labels or text that needs emphasis but isn't a title.
  h5: {
    fontFamily: GlobalFonts.Poppins.Medium,
    fontSize: 20,
    lineHeight: 24,
    color: AppColors.primary,
  },

   h6: {
    fontFamily: GlobalFonts.Poppins.Medium,
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.primary,
  },
  // -- BODY & DESCRIPTION TEXT --

  // Use for the main, default body text for reading.
  body1: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 20,
    lineHeight: 30, // ~1.5x font size for readability
    color: AppColors.secondary,
  },
  // Use for slightly less important text or secondary descriptions.
  body2: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.secondary,
  },
   body3: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 16,
    lineHeight: 24, // ~1.5x font size for readability
    color: AppColors.secondary,
  },
  // Use for captions, helper text, or legal disclaimers.
  caption: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.secondary,
  },
  // Use for small labels or text that needs emphasis above a title.
  overline: {
    fontFamily: GlobalFonts.Inter.SemiBold,
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: AppColors.secondary,
  },

  // -- BUTTON & EMPHASIS TEXT --

  // A standalone style for buttons.
  button: {
    fontFamily: GlobalFonts.Poppins.Medium,
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.white, // Assuming buttons have light text
  },
});

export default GlobalTypoStyles;

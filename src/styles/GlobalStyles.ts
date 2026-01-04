import { StyleSheet } from 'react-native';
import AppColors from './AppColors';
import GlobalFonts from './GlobalFonts';

const RootStyles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48,
    fontFamily: GlobalFonts.Montserrat.Bold,
    color: AppColors.primary,
  },
  h2: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    marginBottom: 12,
    fontFamily: GlobalFonts.Montserrat.SemiBold,
    color: AppColors.primary,
  },
  h3: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 8,
    fontFamily: GlobalFonts.Montserrat.SemiBold,
    color: AppColors.primary,
  },
  h4: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 8,
    fontFamily: GlobalFonts.Poppins.Medium,
    color: AppColors.primary,
  },
  h5: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 8,
    fontFamily: GlobalFonts.Poppins.Medium,
    color: AppColors.primary,
  },

  desc1: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    fontFamily: GlobalFonts.Inter.Regular,
    color: AppColors.secondary,
  },
  desc2: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: GlobalFonts.Inter.Regular,
    color: AppColors.secondary,
  },
  desc3: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: GlobalFonts.Inter.Regular,
    color: AppColors.secondary,
  },
  desc4: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: GlobalFonts.Inter.Regular,
    color: AppColors.secondary,
  },
  desc5: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
    fontFamily: GlobalFonts.Inter.Regular,
    color: AppColors.secondary,
  },

  textLight: {
    color: AppColors.white,
    fontFamily: GlobalFonts.Inter.Regular,
  },

  shinyBorder: {
    borderWidth: 2,
    borderColor: AppColors.orange,
    borderRadius: 12,
    shadowColor: AppColors.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },

  roundedBorder: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  vhCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GlobalStyles = {
  ...RootStyles,

  h1Light: {
    ...RootStyles.h1,
    color: AppColors.white,
  },

  shinyBorderBackgroundColor: {
    ...RootStyles.shinyBorder,
    shadowColor: AppColors.background,
    borderColor: AppColors.background,
  },
};

export default GlobalStyles;

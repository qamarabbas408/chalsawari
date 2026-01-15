import { StyleSheet } from 'react-native';
import AppColors from './AppColors';
import GlobalFonts from './GlobalFonts';
import GlobalTypoStyles from './GlobalTypoStyles';

const RootStyles = StyleSheet.create({

  textLight: {
    color: AppColors.white,
  },

  shinyBorder: {
    borderWidth: 0.5,
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

  roundedBorder8: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

});

const GlobalStyles = {
  ...RootStyles,
  ...GlobalTypoStyles,
  shinyBorderBackgroundColor: {
    ...RootStyles.shinyBorder,
    shadowColor: AppColors.primaryBg,
    borderColor: AppColors.primaryBg,
  },
  roundedBorderw1: {
    ...RootStyles.roundedBorder,
    borderColor: AppColors.grayDark,
    borderWidth: 1
  },
  line: { flex: 1, height: 1, backgroundColor: '#d1d5db', marginHorizontal: 8, },

};

export default GlobalStyles;

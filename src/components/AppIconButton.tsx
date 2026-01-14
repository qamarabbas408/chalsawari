import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

type IconButtonProps = {
  title: string;
  onPress: () => void;
  icon: ImageSourcePropType; // icon image source
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'default' | 'roundedShiny' | 'roundedBorder8';
};

const AppIconButton: React.FC<IconButtonProps> = ({
  title,
  onPress,
  icon,
  style,
  textStyle,
  variant = 'default',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'roundedShiny':
        return styles.roundedShiny;
      case 'roundedBorder8':
        return styles.roundedBorder8;
      default:
        return styles.default;
    }
  };

  return (
    <TouchableOpacity
      style={[getVariantStyle(), style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />
        <Text style={[GlobalStyles.button, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedShiny: {
    ...GlobalStyles.shinyBorder,
    backgroundColor: '#581c87',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedBorder8: {
    ...GlobalStyles.roundedBorder8,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
});

export default AppIconButton;

import React, { useRef } from 'react';
import {
    TouchableWithoutFeedback,
    Animated,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Image,
    ImageSourcePropType,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import AppColors from '../styles/AppColors';
import App from '../../App';

type ButtonProps = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'default' | 'roundedShiny' | 'rounded';
    icon?: ImageSourcePropType;
};

const AppButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'default',
    icon,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95, // shrink a bit
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // back to normal
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getVariantStyle = () => {
        switch (variant) {
            case 'roundedShiny':
                return styles.roundedShiny;
            case 'rounded':
                return styles.rounded;
            default:
                return styles.button;
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.size, getVariantStyle(), style, {
                flexDirection: "row",
                gap: 16,
                transform: [{ scale: scaleAnim }]
            }]}>
                {
                    icon && <Image source={icon} style={{
                        height: 24,
                        width: 24,
                    }} />
                } <Text style={[styles.text, textStyle]}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    size: {
        height: 60,
    },
    button: {
        backgroundColor: AppColors.white,
        ...GlobalStyles.vhCenter,
        ...GlobalStyles.roundedBorder8,
        color: AppColors.black,
    },
    roundedShiny: {
        ...GlobalStyles.vhCenter,
        ...GlobalStyles.shinyBorderBackgroundColor,
        ...GlobalStyles.roundedBorder,
        backgroundColor: AppColors.white,
        color: AppColors.black,
    },
    rounded: {
        ...GlobalStyles.vhCenter,
        ...GlobalStyles.roundedBorder,
        ...GlobalStyles.roundedBorderw1,
        backgroundColor: AppColors.white,
        color: AppColors.black,

    },
    text: {
        color: '#fff',
    },
});

export default AppButton;

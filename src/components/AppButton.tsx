import React, { useRef } from 'react';
import {
    TouchableWithoutFeedback,
    Animated,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

type ButtonProps = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'default' | 'roundedShiny';
};

const AppButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'default',
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
            <Animated.View style={[getVariantStyle(), style, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0f172a',
        ...GlobalStyles.vhCenter,
        ...GlobalStyles.roundedBorder,
    },
    roundedShiny: {
        backgroundColor: '#581c87',
        ...GlobalStyles.vhCenter,
        ...GlobalStyles.shinyBorderBackgroundColor,
        ...GlobalStyles.roundedBorder,
    },
    text: {
        ...GlobalStyles.desc1,
        color: '#fff',
    },
});

export default AppButton;

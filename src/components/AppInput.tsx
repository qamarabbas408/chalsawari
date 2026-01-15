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
import GlobalStyles from '../styles/GlobalStyles';
import AppColors from '../styles/AppColors';

type AppInputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    secureTextEntry?: boolean;
    error?: string;
    inputLabel?: string;
};

const AppInput: React.FC<AppInputProps> = ({
    placeholder,
    value,
    onChangeText,
    style,
    textStyle,
    secureTextEntry = false,
    error,
    inputLabel
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    return (
        <View style={styles.container}>
            {
                inputLabel && <Text style={[GlobalStyles.body3, {
                    marginLeft: 24,
                    marginBottom: 4
                }]}>{inputLabel}</Text>
            }
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[styles.input, GlobalStyles.body3, style, textStyle]}
                    placeholder={placeholder}
                    placeholderTextColor={AppColors.grayDark} // light gray placeholder
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                />
                {
                    secureTextEntry && (
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            <Image source={isPasswordVisible ? require('../assets/icons/eye-open.png') : require('../assets/icons/eye-closed.png')} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    )
                }
            </View>
            {<Text style={styles.error}>{error ?? null}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 12,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 50,
        backgroundColor: AppColors.inputBg,
        paddingHorizontal: 18,
    },
    input: {
        flex: 1,
        paddingVertical: 20,
    },
    error: {
        color: AppColors.red,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 24
    },
    eyeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: AppColors.grayDark
    },
    eyeButton: { paddingHorizontal: 8, },
});

export default AppInput;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput'; // your reusable input component
import { ScrollView } from 'react-native';
import { error } from 'node:console';
import AppColors from '../styles/AppColors';
export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleLogin = () => {
        let newErrors: any = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Login successful');
            // navigation.navigate('Home');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Back Icon + Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/back.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <Text style={GlobalStyles.h5}>Back</Text>
            </View>
            
                {/* Heading */}
                <Text style={[GlobalStyles.h2, styles.heading]}>
                    Login to your Account
                </Text>

                {/* Username Input */}
                <AppInput
                    placeholder="John Doe"
                    value={username}
                    onChangeText={setUsername}
                    error={errors.username}
                    inputLabel='Username'
                />
            

                {/* Password Input */}
                <AppInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    error={errors.password}
                    
                />
                

                {/* Remember Me */}
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                    <Text style={GlobalStyles.body3}>Remember me</Text>
                </TouchableOpacity>

                {/* Sign In CTA */}
                <AppButton
                    title="Sign In"
                    variant="roundedShiny"
                    style={styles.signInButton}
                    textStyle={GlobalStyles.button}
                    onPress={handleLogin}
                />

                {/* OR Separator */}
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={[GlobalStyles.body3, {
                        fontWeight: "bold"
                    }]}>or continue with</Text>
                    <View style={styles.line} />
                </View>

                {/* Social Logins */}
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

                {/* Signup Redirect */}
                <View style={styles.signupContainer}>
                    <Text style={GlobalStyles.body3}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={[GlobalStyles.body3, styles.signupLink]}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 48,
        // height: 500 , 
        // overflow:"hidden"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
        gap: 12,
    },
    heading: {
        marginBottom: 36,
        // textAlign: 'center',
    },

    error: {
        color: 'red',
        marginBottom: 12,
        fontSize: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: AppColors.primaryBg,
    },
    signInButton: {
        width: '100%',
        marginVertical: 12,
        backgroundColor: AppColors.primaryBg,
        paddingVertical: 12,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        width: '100%',
        justifyContent: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#d1d5db',
        marginHorizontal: 8,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
    },
    socialCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#d1d5db',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    socialIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
    },
    signupLink: {
        color: AppColors.secondaryBg,
        marginLeft: 6,
        fontFamily: 'Poppins-SemiBold',
    },
});

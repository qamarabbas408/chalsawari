import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import AppButton from '../components/AppButton';
import AppIconButton from '../components/AppIconButton';
import AppColors from '../styles/AppColors';
import { ScrollView } from 'react-native';
export default function LoginScreen({ navigation }) {
    return (
        <ScrollView
            contentContainerStyle={
                styles.container
            }
        >
            {/* Logo */}
            <Image
                source={require('../assets/chal-sawari-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Heading */}
            <Text style={[GlobalStyles.h2, { marginBottom: 12 }]}>Let’s get started</Text>
            <AppButton
                title="Sign in with Google"
                variant="rounded"
                style={[styles.button, {
                    backgroundColor: AppColors.white,
                }]}
                textStyle={[GlobalStyles.button, {
                    color: AppColors.black
                }]}
                icon={require('../assets/icons/google.png')}
                onPress={() => console.log('Password login')}
            />
            <AppButton
                title="Sign in with Facebook"
                variant="rounded"
                style={[styles.button, {
                    backgroundColor: AppColors.white,
                }]}
                textStyle={[GlobalStyles.button, {
                    color: AppColors.black
                }]}
                onPress={() => console.log('Password login')}
                icon={require('../assets/icons/facebook.png')}

            />
            <View style={styles.orContainer}>
                <View style={GlobalStyles.line} />
                <Text style={GlobalStyles.body3}>OR</Text>
                <View style={GlobalStyles.line} />
            </View>

            <AppButton
                title="Sign in with Password"
                variant="roundedShiny"
                style={styles.button}
                textStyle={GlobalStyles.button}
                onPress={() => console.log('Password login')}
            />

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
        backgroundColor: '#fff', // white background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 24,
    },
    button: {
        width: '100%',
        marginVertical: 8,
        backgroundColor: '#581c87', // consistent CTA color
        paddingVertical: 12,
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    signupLink: {
        color: '#22c55e', // theme green for link
        marginLeft: 6,
        fontFamily: 'Poppins-SemiBold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        width: '100%',
        justifyContent: 'center',
    },
});

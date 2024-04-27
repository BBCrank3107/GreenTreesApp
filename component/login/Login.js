import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';

const Login = ({navigation}) => {
    const [securePassword, setSecurePassword] = useState(true);

    return (
        <ImageBackground style={styles.backgroundImage} source={require('./images/background.jpg')}>
            <StatusBar barStyle={'light-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.container}>
                            {/* Container */}
                            <View style={styles.formContainer}>
                                {/* email */}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Enter your email'
                                        autoCapitalize='none'
                                    />
                                </View>
                                {/* password */}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Enter your password'
                                        autoCapitalize='none'
                                        secureTextEntry={securePassword}
                                    />
                                    <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={styles.visibilityIcon}>
                                        <Image source={securePassword ? require('./images/hide.png') : require('./images/view.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                                {/* Button Login */}
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button}
                                    onPress={()=>{
                                        navigation.navigate('HomeTabs')
                                    }}>
                                        <Text style={styles.buttonText}>Log in</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.forgotPasswordContainer}>
                                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                </View>
                            </View>
                            {/* Bottom */}
                            {/* Button Create Account */}
                            <View style={styles.createAccountContainer}>
                                <TouchableOpacity style={styles.createAccountButton}
                                onPress={()=>{
                                    navigation.navigate('SignUp')
                                }}
                                >
                                    <Text style={styles.createAccountButtonText}>Create Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        height: 75,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 15,
        fontSize: 21,
        paddingStart: 10,
    },
    visibilityIcon: {
        position: 'absolute',
        right: 20,
        top: '28%',
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    buttonContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
    },
    forgotPasswordContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        padding: 10,
    },
    forgotPasswordText: {
        fontSize: 21,
        color: 'white',
    },
    createAccountContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    createAccountButton: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: 'blue',
        borderWidth: 1,
    },
    createAccountButtonText: {
        color: 'blue',
        fontSize: 21,
    },
});

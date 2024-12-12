import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase";
import { useAuthRequest } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';


export default function Loginpage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '410766952418-jt8bee0qn0quqir3meeqgbpgdduh9kji.apps.googleusercontent.com',
        scopes: ["email", "profile"],
        redirectUri: makeRedirectUri({ useProxy: true }),
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((result) => {
                    console.log("Google Sign-in Success: ", result);
                    Alert.alert("Success", "Google sign-in successful!");
                    navigation.navigate("Dashboard");
                })
                .catch((error) => {
                    console.error("Google sign-in error: ", error);
                    Alert.alert("Error", "Google sign-in failed");
                });
        }
    }, [response]);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert("Success", "You have successfully logged in!");
                navigation.navigate("Dashboard");
            })
            .catch((error) => {
                console.error("Login error: ", error.message);
                Alert.alert("Error", "Invalid credentials");
            });
    };

    const [fontsLoaded] = useFonts({
        'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
        'PoppinsExtraBold': require('../assets/Fonts/Poppins-ExtraBold.ttf'),
        'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    const image = require('../assets/cat.png');
    const google = require('../assets/google.png');
    const facebook = require('../assets/facebook.png');

    return (
        <View>
            <Image source={image} style={styles.img} />
            <Text style={[styles.title1, styles.title]}>Hello, Welcome to</Text>
            <Text style={[styles.title2, styles.title]}>Smart Pet Feeder</Text>

            <View style={{ marginTop: 30 }}>
                <View style={styles.email}>
                    <Feather name="mail" size={30} color="black" style={styles.emailIcon} />
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="Email"
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    <Feather name="lock" size={30} color="black" style={styles.lockIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={showPassword}
                        placeholderTextColor="black"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
                        {showPassword ? <Feather name="eye-off" size={30} color="black" style={styles.eyeIcon} /> :
                            <Feather name="eye" size={30} color="black" style={styles.eyeIcon} />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SentEmail')}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                    <Text style={styles.btntxt}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.or}>or sign in with</Text>

                <View style={styles.social}>
                    <TouchableOpacity onPress={() => promptAsync()} style={styles.google}>
                        <Image source={google} alt="Google" style={styles.googleIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.facebook}>
                        <Image source={facebook} alt="Facebook" style={styles.facebookIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.account}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signup}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    img: {
        height: 258,
        width: 290,
        marginHorizontal: 60,
        marginVertical: 100,
    },
    title: {
        textAlign: 'center',
    },

    title1: {
        fontSize: 24,
        fontFamily: 'PoppinsRegular',
        marginTop: -100
    },
    title2: {
        fontSize: 24,
        fontFamily: 'PoppinsExtraBold',
        marginTop: -10
    },
    input: {
        height: 55,
        width: 316,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 55,
        marginBottom: 20,
        paddingLeft: 60,
        paddingRight: 40,
        paddingTop: 12,
        fontFamily: 'PoppinsRegular',
        fontSize: 22,
        opacity: 0.5,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C87F6',
        width: 316,
        height: 50,
        borderRadius: 30,
        marginHorizontal: 55,
    },

    btntxt: {
        fontSize: 23,
        color: 'white',
        fontFamily: 'PoppinsBold',
    },

    or: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
    },

    social: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },

    google: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        borderRadius: 30,
        marginHorizontal: 55,
        marginTop: 20,
        left: 80,
    },

    googleIcon: {
        height: 30,
        width: 30,
    },

    facebook: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        borderRadius: 30,
        marginHorizontal: 55,
        marginTop: 20,
        left: -80,
    },

    facebookIcon: {
        height: 30,
        width: 30,
    },

    email: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    emailIcon: {
        marginRight: 10,
        position: 'absolute',
        left: 70,
        top: 12,
        opacity: 0.5,
    },

    lockIcon: {
        marginRight: 10,
        position: 'absolute',
        left: 70,
        top: 12,
        opacity: 0.5,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 65,
        top: 12,
    },
    eyeIcon: {
        opacity: 0.5,
    },
    forgot: {
        textAlign: 'right',
        marginTop: -10,
        marginRight: 60,
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#6C87F6',
        textDecorationLine: 'underline',
    },

    account: {
        textAlign: 'center',
        marginTop: 120,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        left: -30
    },

    signup: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        color: '#6C87F6',
        textDecorationLine: 'underline',
        position: 'absolute',
        left: 270,
        top: -35
    },
});

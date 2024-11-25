import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, rtdb } from "../firebase";  // Import Firebase configuration
import { ref, set } from "firebase/database";  // Import Realtime Database functions

export default function Signuppage({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isFormValid = () =>
        username.length >= 3 && // Username must be at least 3 characters long
        email.includes("@") &&
        password === confirmPassword &&
        password.length >= 8;

    const handleSignup = async () => {
        if (!isFormValid()) {
            Alert.alert(
                "Try again",
                "Please enter a valid username, email, and matching passwords with at least 8 characters"
            );
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Check if user is authenticated
            const userId = userCredential.user.uid;
            console.log("Authenticated User ID:", userId);  // Log the user ID to ensure the user is logged in

            // Reference to the user's data in Realtime Database
            const userRef = ref(rtdb, 'users/' + userId);

            // Store the user data
            await set(userRef, {
                username: username,
                email: email,
            });

            Alert.alert("Success", `Account created successfully for ${username}`);
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigation.navigate("Login");

        } catch (error) {
            console.log("Error during signup:", error);
            Alert.alert("Error", `Error creating user: ${error.message}`);
        }
    };

    const [fontsLoaded] = useFonts({
        'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
        'PoppinsExtraBold': require('../assets/Fonts/Poppins-ExtraBold.ttf'),
        'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backIcon}>
                <Feather name="chevron-left" size={60} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Create an account</Text>

            <View style={{ marginTop: 30 }}>
                <View style={styles.email}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="black"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.email}>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="Email"
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={handleSignup} style={styles.btn}>
                    <Text style={styles.btntxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 50,
        marginLeft: 10,
    },

    title: {
        fontSize: 32,
        textAlign: 'center',
        color: 'black',
        marginTop: 70,
        paddingTop: -30,
        fontFamily: 'PoppinsBold',
    },

    input: {
        height: 68,
        width: 320,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 50,
        marginBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'PoppinsRegular',
        fontSize: 22,
        opacity: 0.5,
    },

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        backgroundColor: '#6C87F6',
        width: 323,
        height: 56,
        borderRadius: 30,
        marginHorizontal: 45,
    },

    btntxt: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'PoppinsBold',
    },

    email: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

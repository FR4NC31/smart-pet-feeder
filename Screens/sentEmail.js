import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase";

export default function SentEmailpage({ navigation }) {
  const [email, setEmail] = useState("");

  const [fontsLoaded] = useFonts({
    'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
    'PoppinsExtraBold': require('../assets/Fonts/Poppins-ExtraBold.ttf'),
    'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Successfully sent reset email
        Alert.alert("Success", "Password reset email has been sent!");
        navigation.navigate('Login'); // Navigate back to login page
      })
      .catch((error) => {
        // Handle errors (e.g., invalid email)
        console.error("Error sending reset email: ", error.message);
        Alert.alert("Error", "Failed to send reset email. Please check the email address.");
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backIcon}>
        <Feather name="chevron-left" size={60} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Send Email Address</Text>

      <View style={{ marginTop: 50 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btntxt}>Submit</Text>
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
    marginTop: 200,
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
});

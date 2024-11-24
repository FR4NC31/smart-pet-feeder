import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { Ionicons, Feather } from '@expo/vector-icons';

import React from 'react'

export default function Loginpage({navigation}) {

    const [showPassword, setShowPassword] = React.useState(true);

    const [fontsLoaded] = useFonts({
        'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
        'PoppinsExtraBold': require('../assets/Fonts/Poppins-ExtraBold.ttf'),
        'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf')
      });

      if (!fontsLoaded) {
        return null;
      }

    const image = require('../assets/cat.png');
  return (
    <View>
        <Image source={image} style={styles.img} />
      <Text style={[styles.title1, styles.title]}>Hello, Welcome to</Text>
      <Text style={[styles.title2, styles.title]}>Smart Pet Feeder</Text>

      <View style={{marginTop: 30}}>
        <View style={styles.email}>
          <Ionicons name="mail-outline" size={40} color="black" style={styles.emailIcon} />
          <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" placeholderTextColor="black"  />
        </View>
        <Feather name="lock" size={40} color="black" style={styles.lockIcon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={showPassword} placeholderTextColor="black" />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <Feather name="eye-off" size={30} color="black" style={styles.eyeIcon} /> : <Feather name="eye" size={30} color="black" style={styles.eyeIcon} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.btn}>
          <Text style={styles.btntxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SentEmail')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.account}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
        height: 68,
        width: 316,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 55,
        marginBottom: 30,
        paddingLeft: 65,
        paddingRight: 65,
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
        fontSize: 23,
        color: 'white',
        fontFamily: 'PoppinsBold',
    },

    email: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    emailIcon: {
      marginRight: 10,
      position: 'absolute',
      left: 65,
      top: 15,
      opacity: 0.5,
    },

    lockIcon: {
        marginRight: 10,
        position: 'absolute',
        left: 65,
        top: 110,
        opacity: 0.5,
      },
    eyeIcon: {
        marginRight: 10,
        position: 'absolute',
        left: 330,
        top: -77,
        opacity: 0.5,
      },
      forgot: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        textDecorationLine: 'underline',
      },

      account: {
        textAlign: 'center',
        marginTop: 140,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        left: -40
      },

      signup: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        color: '#6C87F6',
        textDecorationLine: 'underline',
        position: 'absolute',
        left: 260,
        top: -35
      },
})

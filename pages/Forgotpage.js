import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import React from 'react'

export default function Signuppage({navigation}) {

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
      <Text style={styles.title}>Forgot Password</Text>

      <View style={{marginTop: 30}}>
        <TextInput style={styles.input} placeholder="New Password" placeholderTextColor="black" secureTextEntry={true} />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="black" secureTextEntry={true} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
          <Text style={styles.btntxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: 'black',
        marginTop: 170,
        paddingTop: -30,
        fontFamily: 'PoppinsBold',
        },

    input: {
        height: 68,
        width: 316,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 45,
        marginBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'PoppinsRegular',
        fontSize: 20,
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
        fontFamily: 'PoppinsRegular',
        },
})

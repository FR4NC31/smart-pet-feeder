import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import React from 'react'

export default function Forgotpage({navigation}) {

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
      <TouchableOpacity onPress={() => navigation.navigate('SentEmail')} style={styles.backIcon}>
            <Feather name="chevron-left" size={60} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>

      <View style={{marginTop: 80}}>
        <TextInput style={styles.input} placeholder="New Password" placeholderTextColor="black" secureTextEntry={true} />
        <TextInput style={styles.input} placeholder="Re-enter Password" placeholderTextColor="black" secureTextEntry={true} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
          <Text style={styles.btntxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
        marginTop: 170,
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
        fontSize: 20,
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
})

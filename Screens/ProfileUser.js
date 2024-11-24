import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react'

export default function ProfileUser({navigation}) {

    const [fontsLoaded] = useFonts({
        'MonserratBold':require('../assets/Fonts/Montserrat-Bold.ttf'),
        'PoppinsBold' :require('../assets/Fonts/Poppins-Bold.ttf')
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
    <View>
        <View style={styles.profile}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Feather name="chevron-left" size={60} color="black" style={styles.backIcon} />
            </TouchableOpacity>
            <Image source={require('../assets/profile.png')} style={styles.img} />
            <Text style={styles.name}>Juan Dela Cruz</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logout}>
            <MaterialIcons name="logout" size={24} color="black" style={styles.logoutIcon}/>
            <Text style={styles.logtext}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    profile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#7990EC',
        height: 330,
    },

    backIcon: {
        marginTop: -50,
        marginLeft: 10,
    },

    img: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },      

    name: {
        fontSize: 20,
        marginTop: 10,
        color: 'white',
        fontFamily: 'MonserratBold',
    },

    logout: {
        flexDirection: 'row',
        marginTop: 50,
        marginHorizontal: 50,
    },

    logoutIcon: {
        marginTop: 60,
        marginRight: 20,
        marginLeft: -30,
        fontSize: 40,
    },

    logtext: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'PoppinsBold',
        marginTop: 62,
    },

})

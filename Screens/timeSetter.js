import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { useFonts } from 'expo-font';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import React from 'react'

export default function TimeSetter({navigation}) {

    const [fontsLoaded] = useFonts({
        'MontserratBold': require('../assets/Fonts/Montserrat-Bold.ttf')
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
    <View style={{backgroundColor: '#fff'}}>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backIcon}>
                <Feather name="chevron-left" size={60} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{marginTop: -70}}>
            <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.time}>
                <Text style={styles.timetxt}>11:00</Text>
                <Text style={styles.shifttxt}>AM</Text>
                <Feather name="chevron-down" size={60} color="black" style={styles.arrow}/>
            </TouchableOpacity>
        </View>
        


        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.icon}>
                <Ionicons name="home-outline" size={40} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Timer')} style={styles.icon}>
                <Feather name="plus" size={40} color="black" style={styles.timeset}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.icon}>
                <FontAwesome name="user-o" size={40} color="black"/>
            </TouchableOpacity>
        </View>
        
      
    </View>
  )
}

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 40,
        paddingLeft: 10,
        padding: 10,
        backgroundColor: '#7990EC',
    },

    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 17,
        backgroundColor: '#D9D9D9',
        padding: 20,
        width: 390,
        borderRadius: 10,
    },

    timetxt: {
        fontSize: 50,
        color: 'black',
        fontFamily: 'MontserratBold',
    },

    shifttxt: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'MontserratBold',
        marginLeft: -170,
        marginTop: 10,
    },

    arrow: {
        marginTop: -30,
        fontSize: 40,
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 585,
        marginBottom: 10,
        marginHorizontal: 5,
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: 410,
        padding: 10,
    },

    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    timeset: {
        backgroundColor: '#7990EC',
        padding: 5,
        borderRadius: 100,
    },
      
})

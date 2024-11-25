import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons';
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";

export default function Dashboardpage({navigation}) {

    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            // Successfully logged out
            Alert.alert("Success", "You have been logged out!");
            navigation.navigate('Login'); // Navigate back to the login screen
          })
          .catch((error) => {
            // Handle any errors that occur during logout
            console.error("Error logging out: ", error.message);
            Alert.alert("Error", "There was an issue logging out.");
          });
      };

    const [fontsLoaded] = useFonts({
        'MontserratBold': require('../assets/Fonts/Montserrat-Bold.ttf')
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
    <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
            <Image source={require('../assets/profile.png')} style={styles.profile} />
            </TouchableOpacity>
        <FontAwesome name="bell-o" size={40} color="black" style={styles.notifIcon}/>

        <Image source={require('../assets/dash.png')} style={styles.dashimg} />
        <Text style={styles.title}>Choose Pet</Text>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('TimeSetter')} style={styles.petBtn}>
            <Image source={require('../assets/dog.png')} style={{height: 70, width: 40, marginLeft: -250, marginTop: -10}} />
            <Text style={styles.btntxt}>Dog</Text>
            <FontAwesome name="angle-right" size={60} color="black" style={{marginLeft: 240, marginTop: -50}} />
        </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('TimeSetter')} style={styles.petBtn}>
            <Image source={require('../assets/cat2.png')} style={{height: 70, width: 40, marginLeft: -250, marginTop: -10}} />
            <Text style={styles.btntxt}>Cat</Text>
            <FontAwesome name="angle-right" size={60} color="black" style={{marginLeft: 240, marginTop: -50}} />
        </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('TimeSetter')} style={styles.petBtn}>
            <Image source={require('../assets/bird.png')} style={{height: 70, width: 40, marginLeft: -250, marginTop: -10}} />
            <Text style={styles.btntxt}>Bird</Text>
            <FontAwesome name="angle-right" size={60} color="black" style={{marginLeft: 240, marginTop: -50}} />
        </TouchableOpacity>
        </View>
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Pet1')} style={styles.icon}>
                <Ionicons name="home-outline" size={40} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Pet1')} style={styles.icon}>
                <Ionicons name="information-circle-outline" size={50} color="black" style={{marginTop: 1}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.icon}>
                <MaterialIcons name="logout" size={40} color="black"/>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    profile: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: 52,
        marginLeft: 15,
    },

    notifIcon: {
        marginTop: -43,
        marginLeft: 80,
    },

    dashimg: {
        height: 160,
        width: 350,
        marginTop: 50,
        marginLeft: 37,
    },

    title: {
        fontSize: 32,
        textAlign: 'center',
        color: 'black',
        marginTop: 80,
        fontFamily: 'MontserratBold',
        },

    petBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: 350,
        height: 90,
        borderRadius: 10,
        marginHorizontal: 40,
    },

    btntxt: {
        fontSize: 32,
        color: 'black',
        fontFamily: 'MontserratBold',
        marginVertical: -10,
        marginTop: -50,
        marginLeft: -100,
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 70,
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
})

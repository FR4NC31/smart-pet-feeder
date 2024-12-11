import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function ProfileUser({ navigation }) {
  const [username, setUsername] = useState('');
  const [fontsLoaded] = useFonts({
    'MonserratBold': require('../assets/Fonts/Montserrat-Bold.ttf'),
    'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const auth = getAuth(); // Access Firebase Auth
        const userId = auth.currentUser.uid; // Get the current user's UID
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}/username`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val());
          } else {
            console.error('No username found');
          }
        });
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backIcon}>
          <Feather name="chevron-left" size={60} color="black"  />
        </TouchableOpacity>
        <Image source={require('../assets/user.png')} style={styles.img} />
        <Text style={styles.name}>{username || 'Loading...'}</Text>
      </View>
    </View>
  );
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
    marginLeft: -340,
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
});

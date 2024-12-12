import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set, update } from 'firebase/database';
export default function ProfileUser({ navigation }) {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [petName, setPetName] = useState('');
  const [fontsLoaded] = useFonts({
    'MonserratBold': require('../assets/Fonts/Montserrat-Bold.ttf'),
    'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf'),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newPetName, setNewPetName] = useState('');

  const saveUserData = async (userId, username, bio, petName) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    try {
      await set(userRef, {
        username,
        bio,
        petName,
      });
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}`);

        const snapshot = await get(userRef); // Using get() to fetch data once
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username || 'No username available');
          setBio(data.bio || 'No bio available');
          setPetName(data.petName || 'No pet selected');
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setNewBio(bio);
    setNewPetName(petName);
    setIsModalVisible(true);
  };

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    try {
      await update(ref(getDatabase(), `users/${userId}`), {
        bio: newBio,
        petName: newPetName,
      });
      setBio(newBio);
      setPetName(newPetName);
      console.log("Profile updated successfully");

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backIcon}>
          <Feather name="chevron-left" size={60} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/user.png')} style={styles.img} />
        <Text style={styles.name}>{username || 'Loading...'}</Text>
        <Text style={styles.bio}>{bio || 'No bio available'}</Text>
        <Text style={styles.petName}>Pet: {petName || 'No pet selected'}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Update Bio"
              value={newBio}
              onChangeText={setNewBio}
            />
            <TextInput
              style={styles.input}
              placeholder="Update Pet Name"
              value={newPetName}
              onChangeText={setNewPetName}
            />
            <Button title="Save" onPress={handleSaveProfile} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View>
        <TouchableOpacity style={styles.logout} onPress={handleEditProfile}>
          <MaterialIcons name="mode-edit" style={styles.logoutIcon} />
          <Text style={styles.logtext}>Edit Profile</Text>
        </TouchableOpacity>
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
    height: 400,
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
  bio: {
    fontSize: 16,
    marginTop: 5,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  petName: {
    fontSize: 18,
    marginTop: 5,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  logout: {
    flexDirection: 'row',
    marginTop: 50,
    left: 110,
    width: 200,
    height: 50,
    backgroundColor: '#7990EC',
    borderRadius: 40,
  },
  logoutIcon: {
    fontSize: 25,
    color: 'white',
    left: 15,
    top: 10,
  },
  logtext: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'PoppinsBold',
    marginTop: -50,
    left: 20,
    top: 58,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

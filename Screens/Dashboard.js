import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, rtdb } from "../firebase";
import { ref, get, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function Dashboardpage({ navigation }) {
    const [username, setUsername] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const isFocused = useIsFocused();

    const [fontsLoaded] = useFonts({
        'MontserratBold': require('../assets/Fonts/Montserrat-Bold.ttf')
    });

    const fetchUsername = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const usernameRef = ref(rtdb, `users/${user.uid}/username`);
                const snapshot = await get(usernameRef);
                if (snapshot.exists()) {
                    setUsername(snapshot.val());
                } else {
                    console.log("No username found in database.");
                    setUsername("Guest");
                }
            } catch (error) {
                console.error("Error fetching username: ", error);
                Alert.alert("Error", "Failed to fetch username.");
            }
        } else {
            console.log("No user logged in.");
            Alert.alert("Error", "No user logged in.");
        }
    };

    const loadSelectedPet = async () => {
        const storedPet = await AsyncStorage.getItem('selectedPet');
        if (storedPet) {
            setSelectedPet(storedPet);
        } else {
            setSelectedPet(null);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchUsername();
            loadSelectedPet();
        }
    }, [isFocused]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('selectedPet');
            await signOut(auth);
            Alert.alert("Success", "You have been logged out!");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error logging out: ", error.message);
            Alert.alert("Error", "There was an issue logging out.");
        }
    };

    const handlePetSelection = async (pet) => {
        setSelectedPet(pet);
        await AsyncStorage.setItem('selectedPet', pet);

        const user = auth.currentUser;
        if (user) {
            try {
                const userPetRef = ref(rtdb, `users/${user.uid}/petName`);
                await set(userPetRef, pet);
                console.log("Selected pet saved to database: ", pet);
            } catch (error) {
                console.error("Error saving selected pet to database: ", error.message);
                Alert.alert("Error", "Failed to save selected pet.");
            }
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
                <Image source={require('../assets/user.png')} style={styles.profile} />
            </TouchableOpacity>
            <Text style={styles.username}>Welcome,</Text>
            <Text style={styles.usernamedb}>{username}</Text>

            <Image source={require('../assets/dash.png')} style={styles.dashimg} />

            {selectedPet === null ? (
                <Text style={styles.title}>Choose Pet</Text>
            ) : (
                <Text style={styles.title}>{`Selected Pet: ${selectedPet}`}</Text>
            )}

            {selectedPet === null && (
                <>
                    <View>
                        <TouchableOpacity onPress={() => handlePetSelection('Dog')} style={styles.petBtn}>
                            <Image source={require('../assets/dog.png')} style={{ height: 70, width: 40, marginLeft: -250, marginTop: -10 }} />
                            <Text style={styles.btntxt}>Dog</Text>
                            <FontAwesome name="angle-right" size={60} color="black" style={{ marginLeft: 240, marginTop: -50 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => handlePetSelection('Cat')} style={styles.petBtn}>
                            <Image source={require('../assets/cat2.png')} style={{ height: 70, width: 40, marginLeft: -250, marginTop: -10 }} />
                            <Text style={styles.btntxt}>Cat</Text>
                            <FontAwesome name="angle-right" size={60} color="black" style={{ marginLeft: 240, marginTop: -50 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => handlePetSelection('Bird')} style={styles.petBtn}>
                            <Image source={require('../assets/bird.png')} style={{ height: 70, width: 40, marginLeft: -250, marginTop: -10 }} />
                            <Text style={styles.btntxt}>Bird</Text>
                            <FontAwesome name="angle-right" size={60} color="black" style={{ marginLeft: 240, marginTop: -50 }} />
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {selectedPet && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TimeSetter')} style={styles.SelectedPetBtn}>
                        <Text style={styles.Selectedbtntxt}>Set Feeding Alarm for {selectedPet}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedPet(null)} style={styles.SelectedPetBtn}>
                        <Text style={styles.Selectedbtntxt}>Change Pet</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.icon}>
                    <Ionicons name="home" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={styles.icon}>
                    <Ionicons name="information-circle-outline" size={50} color="black" style={{ marginTop: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.icon}>
                    <MaterialIcons name="logout" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: 52,
        marginLeft: 15,
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
        marginTop: 290,
        fontFamily: 'MontserratBold',
        top: -200,
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
        top: -200,
    },

    SelectedPetBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: 350,
        height: 50,
        borderRadius: 30,
        marginHorizontal: 40,
        top: -100,
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
        position: 'absolute',
        bottom: -100,
        width: '100%',
        borderTopColor: 'black',
        borderTopWidth: 1,
        paddingVertical: -50,
        backgroundColor: 'white',
    },

    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
        marginLeft: 30,
        marginRight: 30,
    },

    username: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'MontserratBold',
        position: 'absolute',
        top: 65,
        left: 80,
    },

    usernamedb: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'MontserratBold',
        position: 'absolute',
        top: 67,
        left: 175,
    },
});

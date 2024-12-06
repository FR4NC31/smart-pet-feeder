import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useFonts } from 'expo-font';

export default function About() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const members = [
        { id: '1', name: 'Giniel Reciles', position:'Leader', role: 'Project Manager', image: require('../assets/user.png') },
        { id: '2', name: 'Kenneth Pelicano', position:'Member', role: 'UI/UX Designer', image: require('../assets/user.png') },
        { id: '3', name: 'Rachelle Pantinople', position:'Member', role: 'Front-End Developer', image: require('../assets/user.png') },
        { id: '4', name: 'Francis Ibañez', position:'Member', role: 'Back-End Developer', image: require('../assets/user.png') },
        { id: '5', name: 'Ryan Bedes', position:'Member', role: 'Release Manager', image: require('../assets/user.png') },
        { id: '6', name: 'Dylan Ricalde', position:'Member', role: 'Database Administrator', image: require('../assets/user.png') },
        { id: '7', name: 'Genny Arriesgado', position:'Member', role: 'Assurance Specialist for Quality & Security', image: require('../assets/user.png') },
        { id: '8', name: 'Mianne Seno', position:'Member', role: 'User Insights Specialist', image: require('../assets/user.png') },
      ];

    const [fontsLoaded] = useFonts({
        'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf'),
        'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.backIcon}
      >
        <Feather name="chevron-left" size={60} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>About Us</Text>
        <ScrollView>
            <View style={styles.grid}>
                {members.map((member) => (
                <View key={member.id} style={styles.memberBox}>
                    <Image source={member.image} style={styles.memberImage} />
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberPos}>{member.position}</Text>
                    <Text style={styles.memberOrder}>{member.role}</Text>
                </View>
                ))}

            </View>
        </ScrollView>


      {/* Add Alarm Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>

      </Modal>




    </View>
  );
}

const styles = StyleSheet.create({

  backIcon: {
    marginTop: 40,
    paddingLeft: 10,
    padding: 10,
    backgroundColor: '#7990EC',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    marginTop: 30,
    fontFamily: 'PoppinsBold',
  },
    grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 50,
    },
    titlemembers: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'Palanquin',
    },

    memberBox: {
    width: 160,
    height: 170,
    backgroundColor: '#7990EC',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 65,
    marginLeft: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 8,
    },
    memberImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    bottom: 55,
    },
    memberName: {
    fontSize: 14,
    fontFamily: 'PoppinsBold',
    color: '#fff',
    bottom: 45,
    textAlign: 'center',
    },
    memberPos: {
    fontSize: 12,
    color: '#DFECE8',
    bottom: 45,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    },
    memberOrder: {
    fontSize: 12,
    color: '#DFECE8',
    fontFamily: 'PoppinsBold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    padding: 10,
    bottom: 15,
    },
})

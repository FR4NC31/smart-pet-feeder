import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function About({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);  // Added state for selected member

  // Updated members array with description and custom images for modal only
  const members = [
    {
      id: '1',
      name: 'Giniel Reciles',
      position: 'Leader',
      role: 'Project Manager',
      description: 'Leads the team and ensures smooth project execution.',
      image: require('../assets/GinielJun.png'),  // Custom image path for modal
    },
    {
      id: '2',
      name: 'Kenneth Pelicano',
      position: 'Member',
      role: 'UI/UX Designer',
      description: 'Designs the user interface and experience of the app.',
      image: require('../assets/Kenneth.png'),  // Custom image path for modal
    },
    {
      id: '3',
      name: 'Rachelle Pantinople',
      position: 'Member',
      role: 'Front-End Developer',
      description: 'Develops the front-end part of the application.',
      image: require('../assets/Rachelle.png'),  // Custom image path for modal
    },
    {
      id: '4',
      name: 'Francis Ibañez',
      position: 'Member',
      role: 'Back-End Developer',
      description: 'Develops the back-end part of the application.',
      image: require('../assets/FrancisEdgard.png'),  // Custom image path for modal
    },
    {
      id: '5',
      name: 'Ryan Bedes',
      position: 'Member',
      role: 'Release Manager',
      description: 'Develops the back-end part of the application.',
      image: require('../assets/Ryan.png'),  // Custom image path for modal
    },
    {
      id: '6',
      name: 'Dylan Ricalde',
      position: 'Member',
      role: 'Database Administrator',
      description: 'Develops the back-end part of the application.',
      image: require('../assets/Dylan.jpg'),  // Custom image path for modal
    },
    {
      id: '7',
      name: 'Genny Arriesgado',
      position: 'Member',
      role: 'Assurance Specialist for Quality and Security',
      description: 'Develops the back-end part of the application.',
      image: require('../assets/Genny.png'),  // Custom image path for modal
    },
    {
      id: '8',
      name: 'Mianne Seno',
      position: 'Member',
      role: 'User Insights Specialist',
      description: 'Develops the back-end part of the application.',
      image: require('../assets/Mianne.png'),  // Custom image path for modal
    },
  ];

  const [fontsLoaded] = useFonts({
    'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf'),
    'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Function to open modal with the selected member
  const openModal = (member) => {
    setSelectedMember(member);  // Set selected member when clicked
    setIsModalVisible(true);  // Show the modal
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);  // Hide the modal
  };

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
              {/* Default image in the ScrollView */}
              <Image source={require('../assets/user.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberPos}>{member.position}</Text>
              <TouchableOpacity
                onPress={() => openModal(member)}  // Open modal with member data
                style={styles.memberButton}
              >
                <Text style={styles.memberOrder}>{member.role}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {selectedMember && (
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles[`modalContent_${selectedMember.role.replace(/\s+/g, '')}`]]}>
              {/* Custom image in the modal */}
              <Image source={selectedMember.image} style={styles.modalImage} />

              {/* Make sure all text components are wrapped properly */}
              <Text style={styles.modalName}>{selectedMember.name ? selectedMember.name : 'Name Missing'}</Text>
              <Text style={styles.modalRole}>{selectedMember.role ? selectedMember.role : 'Role Missing'}</Text>
              <Text style={styles.modalDescription}>{selectedMember.description ? selectedMember.description : 'Description Missing'}</Text>

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 40,
    paddingLeft: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'PoppinsBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  memberBox: {
    width: 170,
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
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#fff',
    bottom: 45,
    textAlign: 'center',
  },
  memberPos: {
    fontSize: 14,
    color: '#DFECE8',
    bottom: 45,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  memberOrder: {
    fontSize: 13,
    color: '#DFECE8',
    fontFamily: 'PoppinsBold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    padding: 10,
    bottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 22,
    fontFamily: 'PoppinsBold',
    color: '#333',
    textAlign: 'center',
  },
  modalRole: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#7990EC',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#fff',
  },
});

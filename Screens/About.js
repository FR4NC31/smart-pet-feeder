import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function About({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);


  const members = [
    {
      id: '1',
      name: 'Giniel Reciles',
      position: 'Leader',
      role: 'Project Manager',
      description: 'I oversee the development and deployment of mobile applications connected to IoT devices. My role involves managing end-to-end projects, coordinating cross-functional teams, and ensuring the successful integration of hardware, software, and connectivity solutions.',
      image: require('../assets/GinielJun.png'),
    },
    {
      id: '2',
      name: 'Kenneth Pelicano',
      position: 'Member',
      role: 'UI/UX Designer',
      description: 'As the UI/UX Designer for our mobile app Smart Pet Feeder, I am responsible for creating an intuitive, visually engaging, and seamless user experience that enhances pet care. My role involves designing user interfaces that are both functional and aesthetically pleasing, ensuring the app is easy to navigate for pet owners.',
      image: require('../assets/Kenneth.png'),
    },
    {
      id: '3',
      name: 'Rachelle Pantinople',
      position: 'Member',
      role: 'Front-End Developer',
      description: 'As the front-end developer for the "Smart Pet Feeder" app, my role involves crafting an intuitive and visually appealing interface that enhances the overall user experience. I design and implement interactive features, and seamless interactions to ensure a smooth and enjoyable experience for pet owners. My goal is to translate the app`s functionalities into an engaging and user-friendly interface, making it easy for users to monitor and manage their pet`s feeding schedule from their devices.',
      image: require('../assets/Rachelle.png'),
    },
    {
      id: '4',
      name: 'Francis Ibañez',
      position: 'Member',
      role: 'Back-End Developer',
      description: 'As a backend developer for the Smart Pet Feeder Mobile Application, I designed and maintained server-side logic, managed databases for storing pet and feeding schedules, and implemented APIs to seamlessly connect the app with the feeder hardware. I ensured system reliability, optimized performance, and supported real-time communication for user commands and device responses.',
      image: require('../assets/FrancisEdgard.png'),
    },
    {
      id: '5',
      name: 'Ryan Bedes',
      position: 'Member',
      role: 'Release Manager',
      description: 'As the Release Manager for the Smart Pet Feeder Mobile system, I am responsible for overseeing the planning, coordination, and deployment of all updates, features, and releases. I ensure that each release is delivered on schedule and meets quality standards without disruptions. My role involves managing timelines, collaborating with development and QA teams, addressing issues promptly, and maintaining clear communication with stakeholders. I also ensure the system’s performance, usability, and reliability align with user expectations, delivering an optimized experience for pet owners.',
      image: require('../assets/Ryan.png'),
    },
    {
      id: '6',
      name: 'Dylan Ricalde',
      position: 'Member',
      role: 'Database Administrator',
      description: 'As a Database Administrator (DBA) on our project, my responsibility is to manage and monitor the application database to assure their security, efficiency, and stability. I am in charge of developing, implementing, and maintaining the database structure, ensuring that data is stored in a form that enables the application`s operation. This involves maintaining data backups, enhancing database performance, and resolving issues with data integrity or access. In addition, I communicate greatly with the development team to ensure that the database satisfies the project`s goals and needs while maintaining to acceptable operations for security and scalability. My role is critical to ensuring a smooth flow of data that supports the entire app.',
      image: require('../assets/Dylan.jpg'),
    },
    {
      id: '7',
      name: 'Genny Arriesgado',
      position: 'Member',
      role: 'Assurance Specialist for Quality and Security',
      description: 'As an Assurance Specialist for Quality & Security overseeing the "Smart Pet Feeder" application, my job is to ensure the app works well and is safe for users. I check that it feeds pets reliably and is easy to use. I also make sure that user data is protected from unauthorized access. By testing the app and working with my teams, I help ensure that the final product is safe, efficient, and enjoyable for pet owners and their furry friends.',
      image: require('../assets/Genny.png'),
    },
    {
      id: '8',
      name: 'Mianne Seno',
      position: 'Member',
      role: 'User Insights Specialist',
      description: 'As a User Insight Analyst for the Smart Pet Feeder app, I enhanced the user experience by incorporating features such as pet type selection, a customizable feeding schedule, and engaging visuals. These improvements ensured the app was tailored, functional, and appealing to pet owners.',
      image: require('../assets/Mianne.png'),
    },
  ];

  const [fontsLoaded] = useFonts({
    'PoppinsBold': require('../assets/Fonts/Poppins-Bold.ttf'),
    'PoppinsRegular': require('../assets/Fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);
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
              <Image source={require('../assets/user.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberPos}>{member.position}</Text>
              <TouchableOpacity
                onPress={() => openModal(member)}
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
              <Image source={selectedMember.image} style={styles.modalImage} />

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

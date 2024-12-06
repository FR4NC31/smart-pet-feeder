import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
<<<<<<< HEAD
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import useAlarmTrigger from '../useAlarmTrigger';


TaskManager.defineTask('ALARM_TRIGGER_TASK', async () => {
    try {
      const { checkAndTriggerAlarms } = useAlarmTrigger();
      await checkAndTriggerAlarms(); // Trigger alarm check
      return BackgroundFetch.Result.NewData; // Fetch new data
    } catch (error) {
      console.error('Error in alarm trigger task:', error);
      return BackgroundFetch.Result.Failed;
    }
  });

=======
>>>>>>> 3a14dd75709acdb1957c74a262929e3284514e5d

export default function TimeSetter({ navigation }) {
  const { checkAndTriggerAlarms } = useAlarmTrigger();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [times, setTimes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  // Firebase database and auth reference
  const db = getDatabase();
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Get the current user's ID

<<<<<<< HEAD
  const fetchAlarmsFromFirebase = async () => {
    const db = getDatabase();
    const userId = "user123"; // Replace with actual user ID

    onValue(ref(db, `alarms/${userId}`), (snapshot) => {
      const alarms = snapshot.val();
      if (alarms) {
        Object.keys(alarms).forEach((alarmId) => {
          const { time, active } = alarms[alarmId];
          if (active) {
            scheduleAlarmNotification(time);
          }
        });
      }
    });
  };

  useEffect(() => {
    // Start background task
    const registerBackgroundFetch = async () => {
      try {
        await BackgroundFetch.registerTaskAsync('ALARM_TRIGGER_TASK', {
          minimumInterval: 60 * 15, // Check alarms every 15 minutes
          stopOnTerminate: false, // Keep running when the app is terminated
          startOnBoot: true, // Start the task after a device reboot
        });
      } catch (error) {
        console.error('Error registering background task:', error);
      }
    };

    registerBackgroundFetch();
  }, []);

  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm Triggered",
          body: "Your alarm is ringing!",
          sound: true, // Enable sound
        },
        trigger: {
          seconds: 10, // Schedule it 10 seconds from now
        },
      });
      console.log("Notification scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  // Call this function where needed
  scheduleNotification();

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permissions not granted!');
    }
  };

  useEffect(() => {
    requestNotificationPermissions();
    fetchAlarmsFromFirebase(); // Start fetching alarms
  }, []);

  // Fetch alarms from the database on component mount
  useEffect(() => {
    if (!userId) return; // Ensure user is logged in

=======
  // Fetch alarms from the database on component mount
  useEffect(() => {
    if (!userId) return; // Ensure user is logged in

>>>>>>> 3a14dd75709acdb1957c74a262929e3284514e5d
    const alarmsRef = ref(db, `alarms/${userId}`);
    const unsubscribe = onValue(alarmsRef, (snapshot) => {
      const data = snapshot.val();
      const alarmsList = data
        ? Object.entries(data).map(([id, alarm]) => ({ id, ...alarm }))
        : [];
      setTimes(alarmsList);
    });

    return () => unsubscribe(); // Clean up the listener
  }, [userId]);

  const handleSave = async () => {
    if (!hour || !minute || !selectedPeriod) {
      alert('Please ensure all fields are filled correctly.');
      return;
    }

    const formattedTime = `${hour}:${minute} ${selectedPeriod}`;
    const newAlarm = { time: formattedTime, isEnabled: true };

    try {
      const alarmsRef = ref(db, `alarms/${userId}`);
      await push(alarmsRef, newAlarm); // Add new alarm to the database
<<<<<<< HEAD
      await scheduleNotification(formattedTime); // Schedule push notification
=======
>>>>>>> 3a14dd75709acdb1957c74a262929e3284514e5d
      closeModal();
    } catch (error) {
      console.error('Error saving alarm:', error.message);
      alert('Failed to save the alarm. Please try again.');
    }
  };

<<<<<<< HEAD

=======
>>>>>>> 3a14dd75709acdb1957c74a262929e3284514e5d
  const handleEditSave = async () => {
    if (!hour || !minute || !selectedPeriod) {
      alert('Please ensure all fields are filled correctly.');
      return;
    }

    const formattedTime = `${hour}:${minute} ${selectedPeriod}`;
    const updatedAlarm = {
      time: formattedTime,
      isEnabled: times[editingIndex].isEnabled,
    };

    try {
      const alarmRef = ref(db, `alarms/${userId}/${times[editingIndex].id}`);
      await update(alarmRef, updatedAlarm); // Update alarm in the database
<<<<<<< HEAD
      await scheduleNotification(formattedTime); // Reschedule push notification
=======
>>>>>>> 3a14dd75709acdb1957c74a262929e3284514e5d
      closeEditModal();
    } catch (error) {
      console.error('Error updating alarm:', error.message);
      alert('Failed to update the alarm. Please try again.');
    }
  };

  const deleteAlarm = async (index) => {
    try {
      const alarmRef = ref(db, `alarms/${userId}/${times[index].id}`);
      await remove(alarmRef); // Remove alarm from the database
      setExpandedIndex(null); // Close expanded view if deleted
    } catch (error) {
      console.error('Error deleting alarm:', error.message);
      alert('Failed to delete the alarm. Please try again.');
    }
  };

  const toggleAlarm = async (index) => {
    const alarm = times[index];
    const updatedAlarm = { ...alarm, isEnabled: !alarm.isEnabled };

    try {
      const alarmRef = ref(db, `alarms/${userId}/${alarm.id}`);
      await update(alarmRef, updatedAlarm); // Update isEnabled state in the database
    } catch (error) {
      console.error('Error toggling alarm:', error.message);
      alert('Failed to toggle the alarm. Please try again.');
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    resetFields();
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    resetFields();
  };

  const resetFields = () => {
    setHour('');
    setMinute('');
    setSelectedPeriod('AM');
    setEditingIndex(null);
  };

  const handleHourChange = (text) => {
    if (/^([1-9]|1[0-2])?$/.test(text)) {
      setHour(text);
    }
  };
  
  const handleMinuteChange = (text) => {
    if (/^[0-5]?[0-9]$/.test(text)) {
      setMinute(text);
    }
  };

  const [fontsLoaded] = useFonts({
    MontserratBold: require('../assets/Fonts/Montserrat-Bold.ttf'),
  });

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.backIcon}
      >
        <Feather name="chevron-left" size={60} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {times.length === 0 ? (
          <Text style={styles.noAlarmText}>
            No alarms set. Add one using the "+" button below.
          </Text>
        ) : (
          times.map((alarm, index) => (
            <View
              key={index}
              style={[
                styles.time,
                { flexDirection: 'column' },
                expandedIndex === index && { height: 161 },
              ]}
            >
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <View style={styles.timeRow}>
                  <Text style={[styles.timetxt]}>{alarm.time}</Text>
                  <Switch
                    style={{ marginLeft: 280 }}
                    value={alarm.isEnabled}
                    onValueChange={() => toggleAlarm(index)}
                  />
                </View>
              </TouchableOpacity>
              {expandedIndex === index && (
                <View style={styles.expandedButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditModalVisible(true);
                      setHour(alarm.time.split(':')[0]);
                      setMinute(alarm.time.split(':')[1].split(' ')[0]);
                      setSelectedPeriod(alarm.time.split(' ')[1]);
                      setEditingIndex(index);
                    }}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteAlarm(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Alarm Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.timeTitle}>Set Time</Text>
            <View style={styles.timeSet}>
            <TextInput
                style={styles.hourInput}
                placeholder="- -"
                value={hour}
                onChangeText={handleHourChange}
                keyboardType="numeric"
                maxLength={2}
                />
                <Text style={styles.colon}>:</Text>
                <TextInput
                style={styles.minuteInput}
                placeholder="- -"
                value={minute}
                onChangeText={handleMinuteChange}
                keyboardType="numeric"
                maxLength={2}
              />
              <View style={styles.amPm}>
                <TouchableOpacity onPress={() => setSelectedPeriod('AM')}>
                  <Text
                    style={[
                      styles.amPmText,
                      selectedPeriod === 'AM' && styles.selected,
                    ]}
                  >
                    AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedPeriod('PM')}>
                  <Text
                    style={[
                      styles.amPmText,
                      selectedPeriod === 'PM' && styles.selected,
                    ]}
                  >
                    PM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
  visible={isEditModalVisible}
  animationType="slide"
  transparent={true}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.timeTitle}>Edit Time</Text>
      <View style={styles.timeSet}>
        <TextInput
          style={styles.hourInput}
          placeholder="- -"
          value={hour}
          onChangeText={handleHourChange}
          keyboardType="numeric"
          maxLength={2}
          required
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.minuteInput}
          placeholder="- -"
          value={minute}
          onChangeText={handleMinuteChange}
          keyboardType="numeric"
          maxLength={2}
          required
        />
        <View style={styles.amPm}>
          <TouchableOpacity onPress={() => setSelectedPeriod('AM')}>
            <Text
              style={[
                styles.amPmText,
                selectedPeriod === 'AM' && styles.selected,
              ]}
            >
              AM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPeriod('PM')}>
            <Text
              style={[
                styles.amPmText,
                selectedPeriod === 'PM' && styles.selected,
              ]}
            >
              PM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={handleEditSave}
          style={styles.saveButton}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={closeEditModal}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>;

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.icon}
        >
          <Ionicons name="home-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={[styles.icon, styles.plus]}
        >
          <Feather name="plus" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileUser')}
          style={[styles.icon]}
        >
          <Feather name="user" size={40} color="black" />
        </TouchableOpacity>
      </View>
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
  noAlarmText: {
    textAlign: 'center',
    marginTop: 350,
    fontSize: 18,
    color: '#555',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 10,

  },
  timetxt: {
    fontSize: 33,
    fontFamily: 'MontserratBold',
    position: 'absolute',
    width: 350,
    backgroundColor: '#D9D9D9',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FFF',
    width: 300,
    height: 300,
    borderRadius: 15,
    padding: 20,
  },
  timeTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 25,
    marginBottom: 20,
  },
  timeSet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  hourInput: {
    width: 90,
    height: 62,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  minuteInput: {
    width: 90,
    height: 62,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 10,
  },
  colon: {
    fontSize: 30,
    marginLeft: 10,
  },
  amPm: {
    marginLeft: 20,
  },
  amPmText: {
    width: 59,
    height: 25,
    textAlign: 'center',
    paddingTop: 2,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,
  },
  selected: {
    backgroundColor: '#3498db',
    color: 'white',
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  icon: {
    alignItems: 'center',
  },

  plus: {
    backgroundColor: '#6C87F6',
    borderRadius: 50,
    borderWidth: 2,
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },

  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 150,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#6C87F6',
    padding: 4,
    borderRadius: 8,
    width: 74,
    height: 33,
    alignItems: 'center',
    left: 240,
    top: 50,
  },
  cancelButton: {
    backgroundColor: '#D9534F', // Red for cancel
    padding: 4,
    borderRadius: 8,
    width: 74,
    height: 33,
    alignItems: 'center',
    left: -90,
    top: 50,
    color: 'white',
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -110,
    marginTop: 130,
  },

  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -110,
    marginTop: 130,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    paddingTop: 4,
    borderRadius: 8,
    width: 74,
    height: 33,
    top: -5,
    marginLeft: 250,
    alignItems: 'center',
    color: 'white',
  },

  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  editButton: {
    backgroundColor: '#6C87F6',
    paddingTop: 5,
    borderRadius: 8,
    width: 74,
    height: 33,
    top: 28,
    marginLeft: 160,
    alignItems: 'center',
    color: 'white',
  },
  expandedTimetxt: {
    fontSize: 35, // Example: increase the font size
    color: 'black', // Example: change the color to match the expanded state
    marginLeft: 15, // Adjust spacing if needed
    top: 20,
  },
  switch: {
    marginLeft: 290,
  },
}) 
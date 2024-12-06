import * as Notifications from 'expo-notifications';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const useAlarmTrigger = () => {
  const [alarms, setAlarms] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Firebase user ID

  useEffect(() => {
    if (!userId) return; // Ensure user is logged in

    // Fetch alarms from Firebase
    const alarmsRef = ref(db, `alarms/${userId}`);
    const unsubscribe = onValue(alarmsRef, (snapshot) => {
      const data = snapshot.val();
      const alarmsList = data
        ? Object.entries(data).map(([id, alarm]) => ({ id, ...alarm }))
        : [];
      setAlarms(alarmsList);
    });

    return () => unsubscribe();
  }, [userId, db]);

  // Function to trigger the notification
  const scheduleAlarmNotification = async (alarm) => {
    const now = new Date();
    const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`); // Combine today's date with the alarm time

    if (alarmTime < now) {
      alarmTime.setDate(alarmTime.getDate() + 1); // If alarm time has already passed, set for next day
    }

    const timeUntilAlarm = alarmTime.getTime() - now.getTime();

    if (timeUntilAlarm <= 0) return; // If the time is in the past, don't schedule

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm",
          body: "It's time for your alarm!",
          sound: true,
        },
        trigger: {
          seconds: timeUntilAlarm / 1000, // Convert milliseconds to seconds
          repeats: false, // Don't repeat the alarm
        },
      });

      console.log('Alarm scheduled!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  // Function to check and trigger alarms
  const checkAndTriggerAlarms = async () => {
    for (let alarm of alarms) {
      await scheduleAlarmNotification(alarm);
    }
  };

  return {
    checkAndTriggerAlarms, // Trigger this function manually or on a background task
  };
};

export default useAlarmTrigger;

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import * as Notifications from 'expo-notifications';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUcafB8ledJRyz2CSrP6dr8_C4FTW5AOE",
  authDomain: "smart-pet-feeder-337d1.firebaseapp.com",
  databaseURL: "https://smart-pet-feeder-337d1-default-rtdb.firebaseio.com",
  projectId: "smart-pet-feeder-337d1",
  storageBucket: "smart-pet-feeder-337d1.appspot.com",
  messagingSenderId: "410766952418",
  appId: "1:410766952418:web:374a978e64f1ce11f15bbb",
  measurementId: "G-YGBW4YB6YD",
};

const saveAlarmToFirebase = async (formattedTime) => {
    const db = getDatabase();
    const userId = "user123"; // Replace with actual user ID
    const alarmId = Date.now().toString(); // Unique ID for the alarm

    try {
      await set(ref(db, `alarms/${userId}/${alarmId}`), {
        time: formattedTime, // Example: "8:00 AM"
        active: true,
      });
      console.log("Alarm saved to Firebase");
    } catch (error) {
      console.error("Error saving alarm:", error);
    }
  };

  const deactivateAlarm = async (alarmId) => {
    const db = getDatabase();
    const userId = "user123"; // Replace with actual user ID

    try {
      await update(ref(db, `alarms/${userId}/${alarmId}`), { active: false });
      Notifications.cancelAllScheduledNotificationsAsync(); // Optional: Cancel all alarms
      console.log("Alarm deactivated");
    } catch (error) {
      console.error("Error deactivating alarm:", error);
    }
  };

// Initialize Firebase app only if no apps are already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth (with a check to prevent re-initialization)
const auth = getAuth(app); // Use getAuth if already initialized
if (!auth.app) {
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize other Firebase services
const db = getFirestore(app);
const rtdb = getDatabase(app);

export async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for notifications!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
      return token;
    } else {
      alert('Must use a physical device for Push Notifications');
    }
  }

// Export Firebase instances
export { app, auth, db, rtdb };
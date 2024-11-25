import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

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

// Export Firebase instances
export { app, auth, db, rtdb };

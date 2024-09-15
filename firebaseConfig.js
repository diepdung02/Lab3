// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBuJ0MUg0a3pv68JOrgEaw2os9Ei6-0_M",
  authDomain: "lab3-cea9f.firebaseapp.com",
  projectId: "lab3-cea9f",
  storageBucket: "lab3-cea9f.appspot.com",
  messagingSenderId: "37129094454",
  appId: "1:37129094454:android:0d6085935715002b3d1f97"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Sử dụng AsyncStorage để lưu trữ trạng thái xác thực
});

export { auth };

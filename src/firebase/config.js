// Konfigurasi Firebase untuk HydrocarbonEdu
// Menggunakan Firebase Auth & Cloud Firestore
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Ganti nilai konfigurasi berikut dengan kredensial dari Firebase Console proyek Anda:
// Firebase Console -> Project Settings -> General -> Your apps -> Web app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyHydrocarbEduPlaceholder",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hydrocarbedu-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hydrocarbedu-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hydrocarbedu-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Inisialisasi Firebase App secara aman (mencegah duplikasi instance)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

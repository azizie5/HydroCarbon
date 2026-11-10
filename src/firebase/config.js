// Konfigurasi Firebase untuk HydrocarbonEdu
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Kredensial Firebase Proyek Resmi Anda
const firebaseConfig = {
  apiKey: "AIzaSyAk0AkOQWSaZFWS8mQUixlkn7SNNAIb9ik",
  authDomain: "hydrocarbedu.firebaseapp.com",
  projectId: "hydrocarbedu",
  storageBucket: "hydrocarbedu.firebasestorage.app",
  messagingSenderId: "8645133759",
  appId: "1:8645133759:web:5d576767a2c8a65a9c4d0a",
  measurementId: "G-2N4SV174NQ"
};

// Inisialisasi Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Ekspor Layanan Auth & Firestore Database
export const auth = getAuth(app);
export const db = getFirestore(app);

// Inisialisasi Analytics secara aman (di lingkungan browser)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;

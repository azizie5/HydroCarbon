import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfigurasi resmi proyek Firebase HydrocarbonEdu
const firebaseConfig = {
  apiKey: "AIzaSyDHr0MQMJlAviA1sTvaYxCbHtVJ9-tULRs",
  authDomain: "hydrocarbon-ecbea.firebaseapp.com",
  projectId: "hydrocarbon-ecbea",
  storageBucket: "hydrocarbon-ecbea.firebasestorage.app",
  messagingSenderId: "703099278174",
  appId: "1:703099278174:web:f2327d726fbcba289635cf",
  measurementId: "G-9N1J7KZ9E6"
};

// Inisialisasi Firebase secara aman
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firebase Authentication
export const auth = getAuth(app);

export default app;

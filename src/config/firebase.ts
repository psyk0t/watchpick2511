import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Configuration des emails personnalisés
auth.config.emulator = {
  url: 'https://watchpick.fr'
};

// Personnalisation des URL d'action
auth.config.actionCodeSettings = {
  url: 'https://watchpick.fr/auth/action',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'fr.watchpick.ios'
  },
  android: {
    packageName: 'fr.watchpick.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'watchpick.page.link'
};
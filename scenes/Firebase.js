// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXFIiLE9eGg0-BZFFE5FA-k_Cwh4Qo8PI',
  authDomain: 'space-shooter-484f6.firebaseapp.com',
  projectId: 'space-shooter-484f6',
  storageBucket: 'space-shooter-484f6.appspot.com',
  messagingSenderId: '377931953588',
  appId: '1:377931953588:web:dd93d4a23ce0103e1aaee1',
  measurementId: 'G-NBGB0SN630',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseDB = getFirestore(app);

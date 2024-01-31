import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const UserService = {
  // Метод для входу через Google акаунт
  login() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },

  // Метод для виходу з системи
  logout() {
    return signOut(auth);
  },

  // Метод для отримання поточного токена
  async getToken() {
    return auth.currentUser ? await auth.currentUser.getIdToken(true) : null;
  }
};

export default UserService;
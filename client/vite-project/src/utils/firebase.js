import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authexamnotes-130fa.firebaseapp.com",
  projectId: "authexamnotes-130fa",
  storageBucket: "authexamnotes-130fa.firebasestorage.app",
  messagingSenderId: "190816022055",
  appId: "1:190816022055:web:a2babbd6fb8faec0156802",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };
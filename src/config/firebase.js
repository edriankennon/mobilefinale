// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB536Xk755H299z_wKeBmPYOF3GPD-2NNo",
  authDomain: "test-auth-da8cb.firebaseapp.com",
  projectId: "test-auth-da8cb",
  storageBucket: "test-auth-da8cb.firebasestorage.app",
  messagingSenderId: "70798891135",
  appId: "1:70798891135:web:2777735ef46b3134f6874a",
  measurementId: "G-DXNRW5WD3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the initialized Firebase app to be used in other components
export { app };

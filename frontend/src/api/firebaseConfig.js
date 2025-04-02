import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCrA5m8Om5Fa9pa-u7wbLjkCZ8FInLpoSQ',
  authDomain: 'microservice-video-platform.firebaseapp.com',
  projectId: 'microservice-video-platform',
  storageBucket: 'microservice-video-platform.firebasestorage.app',
  messagingSenderId: '900652424201',
  appId: '1:900652424201:web:abdadaca0a89e291bdecd8',
  measurementId: 'G-F7Y7DMDJ2H',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCrA5m8Om5Fa9pa-u7wbLjkCZ8FInLpoSQ",
//   authDomain: "microservice-video-platform.firebaseapp.com",
//   projectId: "microservice-video-platform",
//   storageBucket: "microservice-video-platform.firebasestorage.app",
//   messagingSenderId: "900652424201",
//   appId: "1:900652424201:web:abdadaca0a89e291bdecd8",
//   measurementId: "G-F7Y7DMDJ2H"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

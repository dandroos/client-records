// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlczXypcPIOcwfk6XbT8otyYknsnAqi-s",
  authDomain: "client-records-afeaf.firebaseapp.com",
  databaseURL:
    "https://client-records-afeaf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "client-records-afeaf",
  storageBucket: "client-records-afeaf.appspot.com",
  messagingSenderId: "1059605477286",
  appId: "1:1059605477286:web:6340991c132aaa825d4167",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
export const auth = getAuth(app)

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAO5SJZVprSqddjpC1RZcelMyGy2fFz3-0",
  authDomain: "kino-portal-b85b2.firebaseapp.com",
  projectId: "kino-portal-b85b2",
  storageBucket: "kino-portal-b85b2.appspot.com",
  messagingSenderId: "77379409057",
  appId: "1:77379409057:web:7a38108d92523b679a8ce0",
  measurementId: "G-1V7Z33YJ23"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
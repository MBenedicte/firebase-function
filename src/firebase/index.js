import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoXhMtlNp7ffnooqd5NXPAxzU-VXkDudY',
  authDomain: 'todo-app-e2443.firebaseapp.com',
  projectId: 'todo-app-e2443',
  storageBucket: 'todo-app-e2443.appspot.com',
  messagingSenderId: '926095580219',
  appId: '1:926095580219:web:ef53c73c29daffefe7d01e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

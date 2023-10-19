
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkDW-duSmC2Ozmo2yJzaFazKyTqdGnbo8",
  authDomain: "upload-teste-br.firebaseapp.com",
  projectId: "upload-teste-br",
  storageBucket: "upload-teste-br.appspot.com",
  messagingSenderId: "947172314902",
  appId: "1:947172314902:web:878b5d2b6917a59edbca37",
  measurementId: "G-0VT66M3E2K"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage()
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDheguL-JFAc4C9L6sHMIvDR9w9j3nCHzI",
  authDomain: "summarizer-app-b9e7d.firebaseapp.com",
  projectId: "summarizer-app-b9e7d",
  storageBucket: "summarizer-app-b9e7d.appspot.com",
  messagingSenderId: "366768579244",
  appId: "1:366768579244:web:0d5fb1c6f8c98d03cff509",
  measurementId: "G-TCEWTB0PLF"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
export {app ,auth}

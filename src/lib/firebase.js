// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyASHL2cHZ12MuV_4wpscvgYcAk87BsP40c",

  authDomain: "qutiti-53552.firebaseapp.com",

  projectId: "qutiti-53552",

  storageBucket: "qutiti-53552.appspot.com",

  messagingSenderId: "134861289660",

  appId: "1:134861289660:web:ca56ddc82a408c9a2938b9",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// I ought to ask if the user is in a trusted device
initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ {
      tabManager: persistentMultipleTabManager(),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED, //It'd be weird if some items are missing and some aren't... So I'll just set it to unlimited [FOR NOW]
    }
  ),
});
export default app;

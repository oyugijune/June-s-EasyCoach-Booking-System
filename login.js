import { initializeApp } from 'firebase/app';
import '@firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'createUserWithEmailAndPassword';
import 'signInWithEmailAndPassword';
import ' sendPasswordResetEmail';

// Firebase configuration object from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyDQVM5J1jLKY_umR8MPujhjQ7XE_6RpVlE",
    authDomain: "easycoach-booking-b343d.firebaseapp.com",
    projectId: "easycoach-booking-b343d",
    storageBucket: "easycoach-booking-b343d.firebasestorage.app",
    messagingSenderId: "281959253090",
    appId: "1:281959253090:web:7e161ea8a7085cd627fd3b",
    measurementId: "G-L7NHC31NER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Toggle

// Handle Registration
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    if (password.length < 6){
        alert("Password must be at least 6 characters long!");
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        firebase.firestore().collection('user').doc(user.uid).set({
            fullName: name,
            email: email
        })
        .then(() =>{
            console.log('user registered successfully!');
            window.location.href='login.html';
        })
        .catch((error) =>{
            console.error('Registration failed', error);
            alert("failed, please try again.");
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
    });
});

// Handle Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully logged in
      const user = userCredential.user;
      console.log('Logged in as: ', user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});


// Reset Password


// Firebase Auth State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.displayName);
    } else {
        console.log("User is logged out");
    }
});

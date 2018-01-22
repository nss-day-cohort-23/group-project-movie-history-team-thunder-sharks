"use strict";
let $ = require("jquery");
let interactions = require("./interactions");
let firebase = require("firebase");

// Initialize Firebase
window.onload=function() {
  const config = {
      apiKey: "AIzaSyCQirXTGX-g2_rTK179gUsRgV9lKsQ9ZXk",
      authDomain: "thunder-sharks-movies.firebaseapp.com",
      databaseURL: "https://thunder-sharks-movies.firebaseio.com",
      projectId: "thunder-sharks-movies",
      storageBucket: "",
      messagingSenderId: "1086787339908"
    };
    firebase.initializeApp(config);



  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  // Add login event

  btnLogin.addEventListener('click', e => {
    console.log('you clicked');
    
    // get email and password 
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

    // sign up
  btnSignup.addEventListener('click', e => {
    // get email and password 
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(user => console.log(user))
      .catch(e => console.log(e.message));
  });

  // add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log('user', firebaseUser);
    } else {
      console.log('not logged in');
    }
  });


}();
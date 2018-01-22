"use strict";
let $ = require("jquery");
let controller = require("./controller");

// get value from users search 
$('.search').on('keypress', function(event){
    if (event.keyCode === 13) {
        let input = $('.search').val();
        controller.MovieData(input);
    }
});


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





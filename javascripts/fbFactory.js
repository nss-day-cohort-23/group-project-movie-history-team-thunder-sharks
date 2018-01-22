"use strict";
let $ = require("jquery");
let controller = require("./controller");
let fbApi = require('./apiKey');

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
    console.log('user', firebaseUser);
    } else {
    console.log('not logged in');
    }
});
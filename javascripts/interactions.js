"use strict";
let $ = require("jquery");
let controller = require("./controller");
let firebase = require('firebase');
let auth = require('./userFactory.js');

// get value from users search 
$('.search').on('keypress', function(event){
    if (event.keyCode === 13) {
        let input = $('.search').val();
        controller.getMovieData(input);
    }
});

$('#btnLogin').click(()=>{
    auth
    .authUser()
    .then(function(result) {
      // The signed-in user info.
      let user = result.user;
      console.log('user', user);
      
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

$("#btnLogout").click( () => {
    auth.logout()
    .then( () => {
      console.log('logged out!', firebase.auth().currentUser);
  
    });
  });
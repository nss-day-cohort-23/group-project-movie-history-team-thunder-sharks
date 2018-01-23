"use strict";
let $ = require("jquery");
let controller = require("./controller");
let fbUser = require('./apiKey');
let fbUrl = "https://thunder-sharks-movies.firebaseio.com/";
let fbConfig = require("./config/fb-config");
let userId = "";

module.exports.listenToUserId = () => {
    fbConfig.auth().onAuthStateChanged(function(user) {
        if (user) {
          userId = user.uid;
        } else {

        }
      });
};

// Adds movie to firebase
module.exports.addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}/movies.json`,
            method: "POST",
            data: JSON.stringify(movie)
        }).done( () => {
            resolve();
        });
    });
};

// Gets movies from firebase
module.exports.getMovies = (term) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}/movies.json`,
        }).done( movies => {

            // Make object of objects an array
            let moviesArray = Object.keys(movies).map(movie => {
                movies[movie].id = movie;
                return movies[movie];
            });
            
            // Filter objects on search term
            let filteredMovies = moviesArray.filter(movie => {
                return movie.title.toLowerCase().indexOf(term.toLowerCase()) !== -1 && movie.uid === userId;
            });
            
            resolve(filteredMovies);
        });
    });
};

